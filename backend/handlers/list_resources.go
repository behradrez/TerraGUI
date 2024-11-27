package handlers

import (
	"encoding/json"
	"net/http"
	"project/services"
)

func ListResources(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(services.SupportedResources.Resources)
}
