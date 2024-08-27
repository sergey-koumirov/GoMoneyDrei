package models

type TransactionRow struct {
	ID          int64
	Dt          string
	Description string

	AccountFromId    int64
	AccountFromName  string
	AccountFromTag   string
	CurrencyFromCode string
	AmountFrom       int64

	AccountToId    int64
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
