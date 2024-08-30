package models

type TemplateRow struct {
	ID          int64
	Description string

	AccountFromID   int64
	AccountFromName string
	AmountFrom      int64

	AccountToID   int64
	AccountToName string
	AmountTo      int64
}

type TemplatesPage struct {
	Records []TemplateRow
}
