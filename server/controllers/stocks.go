package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Stocks(c *gin.Context) {
	c.JSON(
		http.StatusOK,
		gin.H{
			"info": db.StocksData(),
		},
	)
}

func StockCreate(c *gin.Context) {
	temp := make(map[string]interface{})
	c.Bind(&temp)

	stock, errors := db.StockCreate(temp)

	c.JSON(200, gin.H{"stock": stock, "errors": errors})
}

func StockUpdate(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	temp := make(map[string]interface{})
	c.Bind(&temp)

	stock, errors := db.StockUpdate(id, temp)

	c.JSON(200, gin.H{"stock": stock, "errors": errors})
}

func StockDelete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	errors := db.StockDelete(id)

	c.JSON(200, gin.H{"errors": errors})
}
