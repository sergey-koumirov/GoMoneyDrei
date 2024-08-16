package db

import (
	"GoMoneyDrei/server/models"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var base *gorm.DB

func InitDB() error {
	var err error
	base, err = gorm.Open(sqlite.Open("./dist/gmd-dev.sqlite"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return err
}

func GetTransactions(page int, limit int) []Transaction {
	result := []Transaction{}

	base.Order("dt desc, id").Offset(page * limit).Limit(limit).Find(&result)

	return result
}

func GetCurrencies() []Currency {
	result := []Currency{}

	base.Order("id").Where("tag='cur'").Find(&result)

	return result
}

func GetBalances(tag string) models.BalancesInfos {
	rows, e1 := base.Raw(
		`select a.id as AccountID, 
                a.name as AccountName, 
	            c.code as CurrencyCode,
	            (
	              ifnull((select sum(t2.amount_to) from transactions t2 where t2.account_to_id = a.id), 0) -
	              ifnull((select sum(t1.amount_from) from transactions t1 where t1.account_from_id = a.id), 0)
				) as Amount
           from accounts a
                  left join currencies c on c.id = a.currency_id
           where a.tag = ?
             and a.visible = 1
		   order by c.code, a.name`,
		tag,
	).Rows()
	if e1 != nil {
		fmt.Println(e1)
	}
	defer rows.Close()

	temp := models.BalancesInfoByCurr{}

	for rows.Next() {
		item := models.Balance{}
		code := ""
		rows.Scan(&item.ID, &item.Name, &code, &item.Amount)

		forCurr, ex := temp[code]
		if !ex {
			forCurr = models.BalancesInfo{
				Balances:     []models.Balance{},
				CurrencyCode: code,
			}
		}

		forCurr.Balances = append(forCurr.Balances, item)
		forCurr.Total += item.Amount

		temp[code] = forCurr
	}

	currencies := []Currency{}
	base.Where("tag='cur'").Order("code").Find(&currencies)

	result := make(models.BalancesInfos, len(currencies))

	for index, currency := range currencies {
		result[index] = temp[currency.Code]
	}

	return result
}
