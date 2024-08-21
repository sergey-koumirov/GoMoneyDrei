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

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
