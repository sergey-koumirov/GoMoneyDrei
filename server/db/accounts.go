package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"strings"
	"time"
)

func Accounts() []models.AccountRow {
	result := []models.AccountRow{}

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
			order by a.tag, a.id`,
	).Rows()

	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		item := models.AccountRow{}
		lastUsedDt := ""
		rows.Scan(&item.ID, &item.Name, &item.Tag, &item.Visible, &item.CurrencyCode, &item.CurrencyID, &lastUsedDt)

		dt, dtErr := time.Parse(time.DateOnly, lastUsedDt)
		if dtErr != nil {
			item.LastUsedDays = 999999999
		} else {
			item.LastUsedDays = int64(time.Since(dt).Hours() / 24)
		}

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

func validateUsesAccountID(f string, accountID int64, errors models.RecordErrors) {
	var count int64
	base.Model(&Transaction{}).Where("account_from_id = ? or account_to_id = ?", accountID, accountID).Count(&count)

	if count > 0 {
		errors[f] = append(errors[f], "used in transactions")
	}
}
