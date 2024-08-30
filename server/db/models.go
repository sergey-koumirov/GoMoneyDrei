package db

type Currency struct {
	ID   int64  `gorm:"column:id"`
	Name string `gorm:"column:name"`
	Code string `gorm:"column:code"`
	Tag  string `gorm:"column:tag"`
}

func (Currency) TableName() string {
	return "currencies"
}

type Account struct {
	ID         int64  `gorm:"column:id"`
	Name       string `gorm:"column:name"`
	Tag        string `gorm:"column:tag"`
	Visible    int64  `gorm:"column:visible"`
	CurrencyID int64  `gorm:"column:currency_id"`
	Currency   Currency
}

func (Account) TableName() string {
	return "accounts"
}

type Transaction struct {
	ID            int64  `gorm:"column:id"`
	Description   string `gorm:"column:description"`
	Dt            string `gorm:"column:dt"`
	AccountFromID int64  `gorm:"column:account_from_id"`
	AmountFrom    int64  `gorm:"column:amount_from"`
	AccountToID   int64  `gorm:"column:account_to_id"`
	AmountTo      int64  `gorm:"column:amount_to"`

	AccountFrom Account
	AccountTo   Account
}

func (Transaction) TableName() string {
	return "transactions"
}

// Template - model
type Template struct {
	ID            int64  `gorm:"column:id"`
	Description   string `gorm:"column:description"`
	AccountFromID int64  `gorm:"column:account_from_id"`
	AmountFrom    int64  `gorm:"column:amount_from"`
	AccountToID   int64  `gorm:"column:account_to_id"`
	AmountTo      int64  `gorm:"column:amount_to"`

	AccountFrom Account
	AccountTo   Account
}

// TableName - table name
func (Template) TableName() string {
	return "templates"
}
