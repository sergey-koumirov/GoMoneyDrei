package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"math"
	"strings"
)

const ACCOUNTS_PER_PAGE = 200

func AccountsData(page int) models.AccountsPage {
	result := []models.AccountRow{}

	var count int64
	base.Model(Account{}).Where("tag <> 'stocks'").Count(&count)

	rows, err := base.Raw(
		`select a.id, 
		        a.name, 
				a.tag, 
				a.visible,
				c.code,
				c.id,
				(select max(t.dt) 
				   from transactions t
				   where t.account_from_id = a.id or t.account_to_id = a.id
				) as last_used
			from accounts a
			       inner join currencies c on c.id = a.currency_id
			where a.tag <> 'stocks'
			order by a.tag, a.id
			limit ? offset ?`,
		ACCOUNTS_PER_PAGE,
		ACCOUNTS_PER_PAGE*(page-1),
	).Rows()

	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		item := models.AccountRow{}
		lastUsedDt := ""
		rows.Scan(&item.ID, &item.Name, &item.Tag, &item.Visible, &item.CurrencyCode, &item.CurrencyID, &lastUsedDt)

		item.SetLastUsedDays(lastUsedDt)

		result = append(result, item)
	}

	return models.AccountsPage{
		Records:  result,
		Index:    page,
		MaxIndex: int(math.Ceil(float64(count) / float64(ACCOUNTS_PER_PAGE))),
	}
}

func Accounts(tags []string) []models.AccountShort {
	rows, err := base.Raw(
		`select a.id, 
		        a.name, 
				c.code
			from accounts a
			       inner join currencies c on c.id = a.currency_id
			where a.tag in ?
			  and a.visible = 1
			order by a.tag, a.name, a.id`,
		tags,
	).Rows()

	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	result := []models.AccountShort{}
	for rows.Next() {
		item := models.AccountShort{}
		rows.Scan(&item.ID, &item.Name, &item.CurrencyCode)

		result = append(result, item)
	}

	return result
}

func AccountCreate(params map[string]interface{}) (Account, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Account{}

	accountParseValidate(params, &result, errors)

	if len(errors) == 0 {
		err := base.Create(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func AccountUpdate(id int64, params map[string]interface{}) (Account, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Account{ID: id}

	accountParseValidate(params, &result, errors)

	if len(errors) == 0 {
		err := base.Save(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func AccountDelete(id int64) models.RecordErrors {
	errors := make(models.RecordErrors)
	result := Account{ID: id}

	validateUsesAccountID("id", id, errors)

	if len(errors) == 0 {
		base.Delete(&result)
	}

	return errors
}

func AccountReport(id int64) models.AccountReport {
	dbRecord := Account{ID: id}
	base.Preload("Currency").Find(&dbRecord)

	record := models.AccountRow{
		ID:           dbRecord.ID,
		Name:         dbRecord.Name,
		Tag:          dbRecord.Tag,
		Visible:      dbRecord.Visible,
		CurrencyID:   dbRecord.CurrencyID,
		CurrencyCode: dbRecord.Currency.Code,
	}

	transaction := Transaction{}
	base.Where("account_from_id = ? or account_to_id = ?", id, id).Order("dt desc, id").Limit(1).Find(&transaction)

	record.SetLastUsedDays(transaction.Dt)

	expenseSums := []models.MonthSum{}

	irows, _ := base.Raw(
		`SELECT substr(dt,1,7) as ym, sum(amount_from) as s
			from transactions 
			where account_from_id = ?
			group by substr(dt,1,7)
			order by substr(dt,1,7) desc`,
		id,
	).Rows()

	for irows.Next() {
		item := models.MonthSum{}
		irows.Scan(&item.YearMonth, &item.Sum)
		expenseSums = append(expenseSums, item)
	}

	incomeSums := []models.MonthSum{}

	erows, _ := base.Raw(
		`SELECT substr(dt,1,7) as ym, sum(amount_to) as s
			from transactions 
			where account_to_id = ?
			group by substr(dt,1,7)
			order by substr(dt,1,7) desc`,
		id,
	).Rows()

	for erows.Next() {
		item := models.MonthSum{}
		erows.Scan(&item.YearMonth, &item.Sum)
		incomeSums = append(incomeSums, item)
	}

	return models.AccountReport{
		Record:      record,
		IncomeSums:  incomeSums,
		ExpenseSums: expenseSums,
	}
}

func accountParseValidate(params map[string]interface{}, result *Account, errors models.RecordErrors) {
	result.Name = strings.TrimSpace(params["Name"].(string))
	result.Tag = strings.TrimSpace(params["Tag"].(string))
	result.Visible = int64(params["Visible"].(float64))

	currencyValid := !validateIsEmpty("CurrencyID", params["CurrencyID"], errors)
	if currencyValid {
		result.CurrencyID = int64(params["CurrencyID"].(float64))
		validateCurrencyIDExists("CurrencyID", result.CurrencyID, errors)
	}

	validateIsBlank("Name", result.Name, errors)
	validateIsBlank("Tag", result.Tag, errors)
	validateInSet("Tag", result.Tag, []string{"expense", "income", "balance"}, errors)
	validateInSet("Visible", result.Visible, []int64{0, 1}, errors)
}

func validateCurrencyIDExists(f string, currencyID int64, errors models.RecordErrors) {
	var count int64
	base.Model(&Currency{}).Where("id = ?", currencyID).Count(&count)

	if count == 0 {
		errors[f] = append(errors[f], "currency not exists")
	}
}
