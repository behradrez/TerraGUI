package main

import (
	"fmt"
	"log"
	"net/http"
	"project/middleware"
	"project/routes"
	"project/services"
)

func main() {
	err := services.LoadResources("supported_resources.json")
	if err != nil {
		log.Fatalf("Failed to load resources: %v", err)
	}

	r := routes.SetupRoutes()

	loggedRouter := middleware.ReuqestLogger(r)

	corsRouter := middleware.EnableCORS(loggedRouter)

	fmt.Printf("Server is running on http://localhost:8080\n")

	if err := http.ListenAndServe(":8080", corsRouter); err != nil {
		log.Fatal(err)
	}
}
