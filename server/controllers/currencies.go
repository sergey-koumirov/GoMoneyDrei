package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"

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
