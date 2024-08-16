package models

type Balance struct {
	ID     int64
	Name   string
	Amount int64
}

type BalancesInfo struct {
	Balances     []Balance
	CurrencyCode string
	Total        int64
}

type BalancesInfos []BalancesInfo

type BalancesInfoByCurr map[string]BalancesInfo

type FullReport struct {
	Balances BalancesInfos
	// Stocks
	// ExpensesCurrent
	// ExpensesPrev
	// Expenses12
}
