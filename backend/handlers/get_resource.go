package handlers

import (
	"encoding/json"
	"net/http"
	"project/services"
)

func GetSpecificResource(w http.ResponseWriter, r *http.Request) {
	resourceName := r.URL.Query().Get("name")

	if resourceName == "" {
		http.Error(w, "Resource name is required", http.StatusBadRequest)
		return
	}

	for _, resource := range services.SupportedResources.Resources {
		if resource.ResourceName == resourceName {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(resource)
			return
		}
	}

	http.Error(w, "Resource not found", http.StatusNotFound)
}
