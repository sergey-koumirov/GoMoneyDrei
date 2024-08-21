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
		err := base.Create(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func CurrencyUpdate(id int64, params map[string]interface{}) (Currency, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Currency{ID: id}

	result.Name = strings.TrimSpace(params["Name"].(string))
	result.Code = strings.TrimSpace(params["Code"].(string))

	validateIsBlank("Name", result.Name, errors)
	validateIsBlank("Code", result.Code, errors)

	if len(errors) == 0 {
		result.Tag = "curr"
		err := base.Save(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}
