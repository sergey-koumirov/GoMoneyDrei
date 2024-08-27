package models

import "time"

type AccountRow struct {
	ID           int64
	Name         string
	Tag          string
	Visible      int64
	LastUsedDays int64
	CurrencyCode string
	CurrencyID   int64
}

type AccountShort struct {
	ID           int64
	Name         string
	CurrencyCode string
}

func (item *AccountRow) SetLastUsedDays(lastUsedDt string) {
	dt, dtErr := time.Parse(time.DateOnly, lastUsedDt)
	if dtErr != nil {
		item.LastUsedDays = 999999999
	} else {
		item.LastUsedDays = int64(time.Since(dt).Hours() / 24)
	}
}

type AccountReport struct {
	Record      AccountRow
	IncomeSums  []MonthSum
	ExpenseSums []MonthSum
}

type AccountsPage struct {
	Records  []AccountRow
	Index    int
	MaxIndex int
}
