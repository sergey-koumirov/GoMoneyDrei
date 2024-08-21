package db

import (
	"GoMoneyDrei/server/models"
	"strings"
)

func Currencies() []Currency {
	result := []Currency{}

	base.Order("id").Where("tag='curr'").Find(&result)

	return result
}

func CurrencyCreate(params map[string]interface{}) (Currency, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Currency{}

	result.Name = strings.TrimSpace(params["Name"].(string))
	result.Code = strings.TrimSpace(params["Code"].(string))

	validateIsBlank("Name", result.Name, errors)
	validateIsBlank("Code", result.Code, errors)

	if len(errors) == 0 {
		result.Tag = "curr"
		base.Create(&result)
	}

	return result, errors
}
