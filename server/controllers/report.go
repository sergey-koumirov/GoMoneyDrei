package controllers

import (
	"GoMoneyDrei/server/db"
	"GoMoneyDrei/server/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ReportController(c *gin.Context) {
	c.JSON(http.StatusOK, models.FullReport{Balances: db.GetBalances("balance")})
}
