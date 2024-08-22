package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
)

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
                  inner join currencies c on c.id = a.currency_id
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
	base.Where("tag='curr'").Order("code").Find(&currencies)

	result := make(models.BalancesInfos, 0)

	for _, currency := range currencies {
		test, ex := temp[currency.Code]
		if ex {
			result = append(result, test)
		}
	}

	return result
}
