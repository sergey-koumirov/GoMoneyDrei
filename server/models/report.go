package models

type MoneyRecord struct {
	ID      int64
	Name    string
	Amount  int64
	Part    float64
	PartSum float64
}

type MoneyInfo struct {
	Records      []MoneyRecord
	CurrencyCode string
	Total        int64
}

type MoneyInfos []MoneyInfo

type MoneyInfoByCurr map[string]MoneyInfo

type FullReport struct {
	Balances MoneyInfos

	CurrentIncomes  MoneyInfos
	PreviousIncomes MoneyInfos
	YearIncomes     MoneyInfos

	CurrentExpenses  MoneyInfos
	PreviousExpenses MoneyInfos
	YearExpenses     MoneyInfos

	CurrentDate   string
	CurrentMonth  string
	PreviousMonth string
}
