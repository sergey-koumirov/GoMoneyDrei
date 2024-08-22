package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var base *gorm.DB

func InitDB() error {
	var err error
	base, err = gorm.Open(sqlite.Open("./dist/gmd-dev.sqlite"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic("failed to connect database")
	}
	return err
}

func GetTransactions(page int, limit int) []Transaction {
	result := []Transaction{}

	base.Order("dt desc, id").Offset(page * limit).Limit(limit).Find(&result)

	return result
}
