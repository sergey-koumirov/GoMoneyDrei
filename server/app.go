package main

import (
	"GoMoneyDrei/server/controllers"
	"GoMoneyDrei/server/db"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	err := db.InitDB()
	if err != nil {
		fmt.Println("DB Error:", err)
		os.Exit(1)
	}

	r := gin.Default()

	r.StaticFile("/", "./dist/index.html")
	r.Static("/dist/", "./dist/")

	r.GET("/api/reports", controllers.ReportController)

	r.GET("/api/currencies", controllers.Currencies)
	r.POST("/api/currencies", controllers.CurrencyCreate)
	r.PUT("/api/currency/:id", controllers.CurrencyUpdate)
	r.DELETE("/api/currency/:id", controllers.CurrencyDelete)

	r.GET("/api/accounts", controllers.Accounts)
	r.POST("/api/accounts", controllers.AccountCreate)
	r.PUT("/api/account/:id", controllers.AccountUpdate)
	r.DELETE("/api/account/:id", controllers.AccountDelete)
	r.GET("/api/account/:id/report", controllers.AccountReport)

	r.GET("/api/transactions", controllers.Transactions)
	r.POST("/api/transactions", controllers.TransactionCreate)
	r.PUT("/api/transaction/:id", controllers.TransactionUpdate)
	r.DELETE("/api/transaction/:id", controllers.TransactionDelete)

	r.GET("/api/templates", controllers.Templates)
	r.POST("/api/templates", controllers.TemplateCreate)
	r.PUT("/api/template/:id", controllers.TemplateUpdate)
	r.DELETE("/api/template/:id", controllers.TemplateDelete)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
