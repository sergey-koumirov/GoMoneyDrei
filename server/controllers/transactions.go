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

	c.JSON(
		http.StatusOK,
		gin.H{
			"info":         db.TransactionsData(page),
			"accountsFrom": db.Accounts([]string{"income", "balance", "stocks"}),
			"accountsTo":   db.Accounts([]string{"expense", "balance", "stocks"}),
		},
	)
}
