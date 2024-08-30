package db

import (
	"GoMoneyDrei/server/models"
	"fmt"
	"reflect"
	"time"
)

func validateIsDate(f string, v string, errors models.RecordErrors) bool {
	_, err := time.Parse("2006-1-2", v)

	if err != nil {
		errors[f] = append(errors[f], "is not date")
		return false
	}

	return true
}

func validateIsEmpty(f string, v interface{}, errors models.RecordErrors) bool {
	if v == nil || reflect.TypeOf(v).Name() == "string" && len(v.(string)) == 0 {
		errors[f] = append(errors[f], "is blank")
		return true
	}
	return false
}

func validateIsBlank(f string, v string, errors models.RecordErrors) {
	if len(v) == 0 {
		errors[f] = append(errors[f], "is blank")
	}
}

func validateInSet[C string | int64](f string, v C, enums []C, errors models.RecordErrors) {
	index := -1

	for i, e := range enums {
		if e == v {
			index = i
		}
	}

	if index == -1 {
		errors[f] = append(errors[f], fmt.Sprintf("is not in set %v", enums))
	}
}

func validateAccountIDExists(f string, accountID int64, errors models.RecordErrors) {
	var count int64
	base.Model(&Account{}).Where("id = ?", accountID).Count(&count)

	if count == 0 {
		errors[f] = append(errors[f], "account not exists")
	}
}
