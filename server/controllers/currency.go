package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CurrencyController(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"records": db.GetCurrencies()})
}
