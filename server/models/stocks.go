package models

type StockRow struct {
	ID         int64
	Name       string
	Code       string
	CurrencyID int64
	Rest       int64
	BuySum     int64
	SellSum    int64
	Dividents  int64
	SellPrice  int64
}

type StocksPage struct {
	Records []StockRow
}
