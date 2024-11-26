package routes

import (
	"project/handlers"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/generate", handlers.GenerateTerraformFile).Methods("POST")
	r.HandleFunc("/test", handlers.TestCheck).Methods("GET")
	return r
}
