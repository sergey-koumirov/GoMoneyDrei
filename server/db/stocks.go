package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"strings"
)

var MAIN_SQL = `
    select x.id, 
           x.name,
		   c.id,
		   c.code,
		   (
             ifnull((select sum(t2.amount_to) from transactions t2 where t2.account_to_id = x.id), 0) -
             ifnull((select sum(t1.amount_from) from transactions t1 where t1.account_from_id = x.id), 0)
           ) as rest,

           ifnull((select sum(t.amount_from) from transactions t where t.account_to_id = x.id), 0) as buy_sum,
                
           ifnull((select sum(t.amount_to) from transactions t where t.account_from_id = x.id and t.amount_from > 0 ), 0) as sell_sum,
                
           ifnull((select sum(t.amount_to) from transactions t where t.account_from_id = x.id and t.amount_from = 0), 0) as dividents,

           ifnull(sum (
             case 
               when x.base_sub > 0 then IIF(x.amount_to < x.base_sub, x.amount_to, x.base_sub)
               else 0 
             end * x.amount_from / x.amount_to 
            ),0) as sell_amount,        
            ifnull(sum(
              case 
                when x.base_sub > 0 then IIF(x.amount_to < x.base_sub, x.amount_to, x.base_sub)
                else 0 
              end 
            ),0) as sell_cnt
      from (
        select a.id, 
               a.name,
			   a.currency_id,
               t.amount_to,
               t.amount_from,
               sum(t.amount_to) over( 
                                  partition by t.account_to_id 
                                  order by t.dt, t.id desc 
                                  ROWS BETWEEN UNBOUNDED PRECEDING and CURRENT ROW
               ) as base,
               sum(t.amount_to) over( 
                                  partition by t.account_to_id 
                                  order by t.dt, t.id desc 
                                  ROWS BETWEEN UNBOUNDED PRECEDING and CURRENT ROW
               ) - 
               ifnull(
                 (select sum(t2.amount_from) 
                    from transactions t2 
                    where t2.account_from_id = t.account_to_id 
                      and t2.amount_from <> 0)
               ,0) as base_sub
          from accounts a 
                 left join transactions t on t.account_to_id = a.id
          where a.tag = 'stocks'
      ) as x
	    inner join currencies c on c.id = x.currency_id
    group by x.id
    order by rest=0, x.name
`

func StocksData() models.StocksPage {
	result := []models.StockRow{}

	var count int64
	base.Model(Account{}).Where("tag = 'stocks'").Count(&count)

	rows, err := base.Raw(MAIN_SQL).Rows()

	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		item := models.StockRow{}
		sellAmount := float64(0)
		sellCnt := float64(0)
		rows.Scan(
			&item.ID,
			&item.Name,
			&item.CurrencyID,
			&item.Code,
			&item.Rest,
			&item.BuySum,
			&item.SellSum,
			&item.Dividents,
			&sellAmount,
			&sellCnt,
		)

		if sellCnt > 0 {
			item.SellPrice = int64(100.0 * sellAmount / sellCnt)
		}

		result = append(result, item)
	}

	return models.StocksPage{
		Records: result,
	}
}

func StockCreate(params map[string]interface{}) (models.StockRow, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := models.StockRow{}

	stockParseValidate(params, &result, errors)

	if len(errors) == 0 {
		newCurrency := Currency{
			Name: "[A]" + result.Code,
			Code: result.Code,
			Tag:  "stock",
		}
		err := base.Create(&newCurrency).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		} else {
			result.CurrencyID = newCurrency.ID
		}
	}

	if len(errors) == 0 {
		newAccount := Account{
			Name:       result.Name,
			Tag:        "stocks",
			Visible:    1,
			CurrencyID: result.CurrencyID,
		}
		err := base.Create(&newAccount).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		} else {
			result.ID = newAccount.ID
		}
	}

	return result, errors
}

func StockUpdate(id int64, params map[string]interface{}) (models.StockRow, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := models.StockRow{ID: id}

	stockParseValidate(params, &result, errors)

	if len(errors) == 0 {
		account := Account{ID: id}
		base.Preload("Currency").Find(&account)

		account.Name = result.Name

		err1 := base.Save(&account).Error
		if err1 != nil {
			errors["base"] = append(errors["base"], err1.Error())
		}

		account.Currency.Code = "[A]" + result.Code
		err2 := base.Save(&account.Currency).Error
		if err2 != nil {
			errors["base"] = append(errors["base"], err2.Error())
		} else {
			result.CurrencyID = account.CurrencyID
		}
	}

	return result, errors
}

func StockDelete(id int64) models.RecordErrors {
	errors := make(models.RecordErrors)
	result := Account{ID: id}
	base.Preload("Currency").Find(&result)

	validateUsesAccountID("id", id, errors)

	if len(errors) == 0 {
		base.Delete(&result)
		base.Delete(&result.Currency)
	}

	return errors
}

func stockParseValidate(params map[string]interface{}, result *models.StockRow, errors models.RecordErrors) {
	result.Name = strings.TrimSpace(params["Name"].(string))
	validateIsBlank("Name", result.Name, errors)

	result.Code = strings.TrimSpace(params["Code"].(string))
	validateIsBlank("Code", result.Code, errors)
}
