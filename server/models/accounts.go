package models

type AccountRow struct {
	ID           int64
	Name         string
	Tag          string
	Visible      int64
	LastUsedDays int64
	CurrencyCode string
	CurrencyID   int64
}
