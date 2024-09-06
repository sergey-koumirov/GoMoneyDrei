package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"strings"
)

func TemplatesData() models.TemplatesPage {
	result := []models.TemplateRow{}

	rows, err := base.Raw(
		`select t.id, 
				t.description,

				ifnull(af.id, 0) as account_from_id,
				ifnull(af.name, '') as account_from_name,
				ifnull(t.amount_from, 0) as amount_from,

				ifnull(at.id, 0) as account_to_id,
				ifnull(at.name, '') as account_to_name,
				ifnull(t.amount_to, 0) as amount_to
			from templates t
			       left join accounts af on af.id = t.account_from_id
				   left join accounts at on at.id = t.account_to_id
			order by t.description, t.id`,
	).Rows()

	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	for rows.Next() {
		item := models.TemplateRow{}
		rows.Scan(
			&item.ID,
			&item.Description,

			&item.AccountFromID,
			&item.AccountFromName,
			&item.AmountFrom,

			&item.AccountToID,
			&item.AccountToName,
			&item.AmountTo,
		)
		result = append(result, item)
	}

	return models.TemplatesPage{
		Records: result,
	}
}

func TemplateCreate(params map[string]interface{}) (Template, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Template{}

	templateParseValidate(params, &result, errors)

	if len(errors) == 0 {
		err := base.Create(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func TemplateUpdate(id int64, params map[string]interface{}) (Template, models.RecordErrors) {
	errors := make(models.RecordErrors)
	result := Template{ID: id}

	templateParseValidate(params, &result, errors)

	if len(errors) == 0 {
		err := base.Save(&result).Error
		if err != nil {
			errors["base"] = append(errors["base"], err.Error())
		}
	}

	return result, errors
}

func TemplateDelete(id int64) models.RecordErrors {
	errors := make(models.RecordErrors)
	result := Template{ID: id}

	if len(errors) == 0 {
		base.Delete(&result)
	}

	return errors
}

func templateParseValidate(params map[string]interface{}, result *Template, errors models.RecordErrors) {
	result.Description = strings.TrimSpace(params["Description"].(string))
	validateIsBlank("Description", result.Description, errors)

	accountFromIDValid := !validateIsEmpty("AccountFromID", params["AccountFromID"], errors)
	if accountFromIDValid {
		result.AccountFromID = int64(params["AccountFromID"].(float64))
		if result.AccountFromID != 0 {
			validateAccountIDExists("AccountFromID", result.AccountFromID, errors)
		}
	}

	accountToIDValid := !validateIsEmpty("AccountToID", params["AccountToID"], errors)
	if accountToIDValid {
		result.AccountToID = int64(params["AccountToID"].(float64))
		if result.AccountToID != 0 {
			validateAccountIDExists("AccountToID", result.AccountToID, errors)
		}
	}

	result.AmountFrom = int64(params["AmountFrom"].(float64))
	result.AmountTo = int64(params["AmountTo"].(float64))
}
