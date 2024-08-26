package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Accounts(c *gin.Context) {
	page, err1 := strconv.Atoi(c.Query("page"))
	if err1 != nil {
		page = 1
	}

	c.JSON(
		http.StatusOK,
		gin.H{
			"info":       db.AccountsData(page),
			"currencies": db.Currencies(),
		},
	)
}

func AccountCreate(c *gin.Context) {
	temp := make(map[string]interface{})
	c.Bind(&temp)

	account, errors := db.AccountCreate(temp)

	c.JSON(200, gin.H{"account": account, "errors": errors})
}

func AccountUpdate(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	temp := make(map[string]interface{})
	c.Bind(&temp)

	account, errors := db.AccountUpdate(id, temp)

	c.JSON(200, gin.H{"account": account, "errors": errors})
}

func AccountDelete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	errors := db.AccountDelete(id)

	c.JSON(200, gin.H{"errors": errors})
}

func AccountReport(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	data := db.AccountReport(id)

	c.JSON(200, data)
}
