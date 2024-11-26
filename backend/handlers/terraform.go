package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"project/models"
	"project/services"
)

func GenerateTerraformFile(w http.ResponseWriter, r *http.Request) {
	var req models.GenerateFileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload: "+err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Parsed request: %+v", req)

	buffer, err := services.GenerateTerraformFile(req)
	if err != nil {
		http.Error(w, "Error generating Terraform file: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Disposition", "attachment; filename=terraform.tf")
	w.Header().Set("Content-Type", "text/plain")
	w.Write(buffer.Bytes())
}
