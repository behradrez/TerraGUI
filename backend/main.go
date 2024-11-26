package main

import (
	"fmt"
	"log"
	"net/http"
	"project/routes"
)

func main() {
	port := 8080
	r := routes.SetupRoutes()

	fmt.Printf("Server is running on http://localhost:%d\n", port)

	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), r); err != nil {
		log.Fatal(err)
	}
}
