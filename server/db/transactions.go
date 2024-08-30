package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"math"
	"strings"
	"time"
)

const TRANSACTIONS_PER_PAGE = 30

func TransactionsData(page int) models.TransactionsPage {
	result := []models.TransactionRow{}

	var count int64
	base.Model(Transaction{}).Count(&count)

	rows, err := base.Raw(
		`select t.id, 
		        t.dt, 
				t.description,

				af.id as account_from_id,
				af.name as account_from_name,
				af.tag as account_from_tag,
				cf.code as currency_from_code,
				t.amount_from,

				at.id as account_to_id,
				at.name as account_to_name,
				at.tag as account_to_tag,
				ct.code as currency_to_code,
				t.amount_to
			from transactions t
			       inner join accounts af on af.id = t.account_from_id
				   inner join currencies cf on cf.id = af.currency_id
				   inner join accounts at on at.id = t.account_to_id
				   inner join currencies ct on ct.id = at.currency_id
			order by t.dt desc, t.id
			limit ? offset ?`,
		TRANSACTIONS_PER_PAGE,
		TRANSACTIONS_PER_PAGE*(page-1),
	).Rows()

	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		item := models.TransactionRow{}
		rows.Scan(
			&item.ID,
			&item.Dt,
			&item.Description,

			&item.AccountFromID,
			&item.AccountFromName,
			&item.AccountFromTag,
			&item.CurrencyFromCode,
			&item.AmountFrom,

			&item.AccountToID,
			&item.AccountToName,
			&item.AccountToTag,
			&item.CurrencyToCode,
			&item.AmountTo,
		)
		result = append(result, item)
	}

	return models.TransactionsPage{
		Records:  result,
		Index:    page,
		MaxIndex: int(math.Ceil(float64(count) / float64(TRANSACTIONS_PER_PAGE))),
		Today:    time.Now().Format("2006-01-02"),
	}
}

func TransactionCreate(params map[string]interface{}) (Transaction, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Transaction{}

	transactionParseValidate(params, &result, errors)

	if len(errors) == 0 {
		equalize(&result)
		err := base.Create(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func TransactionUpdate(id int64, params map[string]interface{}) (Transaction, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Transaction{ID: id}

	transactionParseValidate(params, &result, errors)

	if len(errors) == 0 {
		equalize(&result)
		err := base.Save(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func TransactionDelete(id int64) models.RecordErrors {
	errors := make(models.RecordErrors)
	result := Transaction{ID: id}

	if len(errors) == 0 {
		base.Delete(&result)
	}

	return errors
}

func transactionParseValidate(params map[string]interface{}, result *Transaction, errors models.RecordErrors) {
	result.Description = strings.TrimSpace(params["Description"].(string))
	result.Dt = strings.TrimSpace(params["Dt"].(string))

	accountFromIDValid := !validateIsEmpty("AccountFromID", params["AccountFromID"], errors)
	if accountFromIDValid {
		result.AccountFromID = int64(params["AccountFromID"].(float64))
		validateAccountIDExists("AccountFromID", result.AccountFromID, errors)
	}

	accountToIDValid := !validateIsEmpty("AccountToID", params["AccountToID"], errors)
	if accountToIDValid {
		result.AccountToID = int64(params["AccountToID"].(float64))
		validateAccountIDExists("AccountToID", result.AccountToID, errors)
	}

	result.AmountFrom = int64(params["AmountFrom"].(float64))
	result.AmountTo = int64(params["AmountTo"].(float64))
}

func validateAccountIDExists(f string, accountID int64, errors models.RecordErrors) {
	var count int64
	base.Model(&Account{}).Where("id = ?", accountID).Count(&count)

	if count == 0 {
		errors[f] = append(errors[f], "account not exists")
	}
}

func equalize(result *Transaction) {
	accountFrom := Account{ID: result.AccountFromID}
	base.Preload("Currency").Find(&accountFrom)

	accountTo := Account{ID: result.AccountToID}
	base.Preload("Currency").Find(&accountTo)

	if accountFrom.Currency.Code == accountTo.Currency.Code {
		result.AmountTo = result.AmountFrom
	}
}
