package models

type RecordErrors map[string][]string

type MonthSum struct {
	YearMonth string
	Sum       int64
}
