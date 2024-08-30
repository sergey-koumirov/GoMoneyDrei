package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Transactions(c *gin.Context) {
	page, err1 := strconv.Atoi(c.Query("page"))
	if err1 != nil {
		page = 1
	}

	fromID, err2 := strconv.Atoi(c.Query("fromID"))
	if err2 != nil {
		fromID = 0
	}

	toID, err3 := strconv.Atoi(c.Query("toID"))
	if err3 != nil {
		toID = 0
	}

	c.JSON(
		http.StatusOK,
		gin.H{
			"info":         db.TransactionsData(page, fromID, toID),
			"accountsFrom": db.Accounts([]string{"income", "balance", "stocks"}),
			"accountsTo":   db.Accounts([]string{"expense", "balance", "stocks"}),
			"templates":    db.TemplatesData().Records,
			"balances":     db.GetBalances("balance"),
		},
	)
}

func TransactionCreate(c *gin.Context) {
	temp := make(map[string]interface{})
	c.Bind(&temp)

	transaction, errors := db.TransactionCreate(temp)

	c.JSON(200, gin.H{"transaction": transaction, "errors": errors})
}

func TransactionUpdate(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	temp := make(map[string]interface{})
	c.Bind(&temp)

	transaction, errors := db.TransactionUpdate(id, temp)

	c.JSON(200, gin.H{"transaction": transaction, "errors": errors})
}

func TransactionDelete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	errors := db.TransactionDelete(id)

	c.JSON(200, gin.H{"errors": errors})
}
