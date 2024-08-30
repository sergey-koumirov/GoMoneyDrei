package controllers

import (
	"GoMoneyDrei/server/db"
	"GoMoneyDrei/server/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/now"
)

func ReportController(c *gin.Context) {
	prevD := 1
	prevM := time.Now().Month()
	prevY := time.Now().Year()

	sYear := now.New(time.Date(prevY-1, prevM, prevD, 0, 0, 0, 0, time.UTC))

	if prevM == 1 {
		prevM = 12
		prevY = prevY - 1
	} else {
		prevM = prevM - 1
	}

	pt := now.New(time.Date(prevY, prevM, prevD, 0, 0, 0, 0, time.UTC))

	var prevMonth time.Month
	if time.Now().Month() == 1 {
		prevMonth = time.December
	} else {
		prevMonth = time.Now().Month() - 1
	}

	c.JSON(
		http.StatusOK,
		models.FullReport{
			Balances: db.GetBalances("balance"),

			CurrentIncomes:  db.GetIncomes(now.BeginningOfMonth().Format("2006-01-02"), now.EndOfMonth().Format("2006-01-02")),
			PreviousIncomes: db.GetIncomes(pt.BeginningOfMonth().Format("2006-01-02"), pt.EndOfMonth().Format("2006-01-02")),
			YearIncomes:     db.GetIncomes(sYear.BeginningOfMonth().Format("2006-01-02"), now.EndOfMonth().Format("2006-01-02")),

			CurrentExpenses:  db.GetExpenses(now.BeginningOfMonth().Format("2006-01-02"), now.EndOfMonth().Format("2006-01-02")),
			PreviousExpenses: db.GetExpenses(pt.BeginningOfMonth().Format("2006-01-02"), pt.EndOfMonth().Format("2006-01-02")),
			YearExpenses:     db.GetExpenses(sYear.BeginningOfMonth().Format("2006-01-02"), now.EndOfMonth().Format("2006-01-02")),

			CurrentDate:   time.Now().Format("2006-01-02"),
			CurrentMonth:  time.Now().Month().String(),
			PreviousMonth: prevMonth.String(),
		},
	)
}
