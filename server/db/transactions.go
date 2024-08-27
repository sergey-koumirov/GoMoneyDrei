package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"math"
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

			&item.AccountFromId,
			&item.AccountFromName,
			&item.AccountFromTag,
			&item.CurrencyFromCode,
			&item.AmountFrom,

			&item.AccountToId,
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
		Today:    time.Now().Format("2006-02-01"),
	}
}
