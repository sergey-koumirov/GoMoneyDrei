package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Currencies(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"records": db.Currencies()})
}

func CurrencyCreate(c *gin.Context) {
	temp := make(map[string]interface{})
	c.Bind(&temp)

	currency, errors := db.CurrencyCreate(temp)

	c.JSON(200, gin.H{"currency": currency, "errors": errors})
}

func CurrencyUpdate(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	temp := make(map[string]interface{})
	c.Bind(&temp)

	currency, errors := db.CurrencyUpdate(id, temp)

	c.JSON(200, gin.H{"currency": currency, "errors": errors})
}

// CurrenciesDelete - delete
func CurrencyDelete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	errors := db.CurrencyDelete(id)

	c.JSON(200, gin.H{"errors": errors})
}
