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

	currencyParseValidate(params, &result, errors)

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

	currencyParseValidate(params, &result, errors)

	if len(errors) == 0 {
		result.Tag = "curr"
		err := base.Save(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func CurrencyDelete(id int64) models.RecordErrors {
	errors := make(models.RecordErrors)
	result := Currency{ID: id}

	validateUsesCurrencyID("id", id, errors)

	if len(errors) == 0 {
		base.Delete(&result)
	}

	return errors
}

func currencyParseValidate(params map[string]interface{}, result *Currency, errors models.RecordErrors) {
	result.Name = strings.TrimSpace(params["Name"].(string))
	result.Code = strings.TrimSpace(params["Code"].(string))

	validateIsBlank("Name", result.Name, errors)
	validateIsBlank("Code", result.Code, errors)
}

func validateUsesCurrencyID(f string, currencyID int64, errors models.RecordErrors) {
	var count int64
	base.Model(&Account{}).Where("currency_id = ?", currencyID).Count(&count)

	if count > 0 {
		errors[f] = append(errors[f], "used in accounts")
	}
}
