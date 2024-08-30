package controllers

import (
	"GoMoneyDrei/server/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Templates(c *gin.Context) {
	c.JSON(
		http.StatusOK,
		gin.H{
			"info":         db.TemplatesData(),
			"accountsFrom": db.Accounts([]string{"income", "balance", "stocks"}),
			"accountsTo":   db.Accounts([]string{"expense", "balance", "stocks"}),
		},
	)
}

func TemplateCreate(c *gin.Context) {
	temp := make(map[string]interface{})
	c.Bind(&temp)

	template, errors := db.TemplateCreate(temp)

	c.JSON(200, gin.H{"template": template, "errors": errors})
}

func TemplateUpdate(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	temp := make(map[string]interface{})
	c.Bind(&temp)

	template, errors := db.TemplateUpdate(id, temp)

	c.JSON(200, gin.H{"template": template, "errors": errors})
}

func TemplateDelete(c *gin.Context) {
	id, _ := strconv.ParseInt(c.Param("id"), 10, 64)

	errors := db.TemplateDelete(id)

	c.JSON(200, gin.H{"errors": errors})
}
