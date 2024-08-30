package models

type TransactionRow struct {
	ID          int64
	Dt          string
	Description string

	AccountFromID    int64
	AccountFromName  string
	AccountFromTag   string
	CurrencyFromCode string
	AmountFrom       int64

	AccountToID    int64
	AccountToName  string
	AccountToTag   string
	CurrencyToCode string
	AmountTo       int64
}

type TransactionsPage struct {
	Records  []TransactionRow
	Index    int
	MaxIndex int
	Today    string
}
