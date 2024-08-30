package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
)

func GetBalances(tag string) models.MoneyInfos {
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

	temp := models.MoneyInfoByCurr{}

	for rows.Next() {
		item := models.MoneyRecord{}
		code := ""
		rows.Scan(&item.ID, &item.Name, &code, &item.Amount)

		forCurr, ex := temp[code]
		if !ex {
			forCurr = models.MoneyInfo{
				Records:      []models.MoneyRecord{},
				CurrencyCode: code,
			}
		}

		forCurr.Records = append(forCurr.Records, item)
		forCurr.Total += item.Amount

		temp[code] = forCurr
	}

	currencies := []Currency{}
	base.Where("tag='curr'").Order("code").Find(&currencies)

	result := make(models.MoneyInfos, 0)

	for _, currency := range currencies {
		test, ex := temp[currency.Code]
		if ex {
			result = append(result, test)
		}
	}

	return result
}

func GetExpenses(fromDate string, toDate string) models.MoneyInfos {
	sql := `select a.id as AccountID,
	               a.name as AccountName,
		           c.code as CurrencyCode,
		           ifnull( (select sum(t.amount_to) from transactions t where t.account_to_id = a.id and t.dt >= ? and t.dt <= ?), 0) as Amount
		      from accounts a
		             left join currencies c on c.id = a.currency_id
		           where a.tag = "expense" and visible=1 
		    and Amount > 0
		  order by Amount desc`

	rows, e1 := base.Raw(sql, fromDate, toDate).Rows()
	if e1 != nil {
		fmt.Println(e1)
	}
	defer rows.Close()

	temp := models.MoneyInfoByCurr{}

	for rows.Next() {
		item := models.MoneyRecord{}
		code := ""
		rows.Scan(&item.ID, &item.Name, &code, &item.Amount)

		forCurr, ex := temp[code]
		if !ex {
			forCurr = models.MoneyInfo{
				Records:      []models.MoneyRecord{},
				CurrencyCode: code,
			}
		}

		forCurr.Records = append(forCurr.Records, item)
		forCurr.Total += item.Amount

		temp[code] = forCurr
	}

	currencies := []Currency{}
	base.Where("tag='curr'").Order("code").Find(&currencies)

	result := make(models.MoneyInfos, 0)

	for _, currency := range currencies {
		test, ex := temp[currency.Code]

		partSum := float64(0)
		for index, rec := range test.Records {
			test.Records[index].Part = float64(rec.Amount) / float64(test.Total)
			test.Records[index].PartSum = partSum + test.Records[index].Part
			partSum = test.Records[index].PartSum
		}

		if ex {
			result = append(result, test)
		}
	}

	return result
}

func GetIncomes(fromDate string, toDate string) models.MoneyInfos {
	sql := `select a.id as AccountID,
	               a.name as AccountName,
		           c.code as CurrencyCode,
		           ifnull( (select sum(t.amount_from) from transactions t where t.account_from_id = a.id and t.dt >= ? and t.dt <= ?), 0) as Amount
		      from accounts a
		             left join currencies c on c.id = a.currency_id
		      where a.tag = "income" and visible = 1
		        and Amount > 0 
		      order by Amount desc`

	rows, e1 := base.Raw(sql, fromDate, toDate).Rows()
	if e1 != nil {
		fmt.Println(e1)
	}
	defer rows.Close()

	temp := models.MoneyInfoByCurr{}

	for rows.Next() {
		item := models.MoneyRecord{}
		code := ""
		rows.Scan(&item.ID, &item.Name, &code, &item.Amount)

		forCurr, ex := temp[code]
		if !ex {
			forCurr = models.MoneyInfo{
				Records:      []models.MoneyRecord{},
				CurrencyCode: code,
			}
		}

		forCurr.Records = append(forCurr.Records, item)
		forCurr.Total += item.Amount

		temp[code] = forCurr
	}

	currencies := []Currency{}
	base.Where("tag='curr'").Order("code").Find(&currencies)

	result := make(models.MoneyInfos, 0)

	for _, currency := range currencies {
		test, ex := temp[currency.Code]

		partSum := float64(0)
		for index, rec := range test.Records {
			test.Records[index].Part = float64(rec.Amount) / float64(test.Total)
			test.Records[index].PartSum = partSum + test.Records[index].Part
			partSum = test.Records[index].PartSum
		}

		if ex {
			result = append(result, test)
		}
	}

	return result
}
