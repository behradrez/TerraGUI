package services

import (
	"encoding/json"
	"log"
	"os"
	"project/models"
)

var SupportedResources models.Resources

func LoadResources(filePath string) error {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &SupportedResources)
	if err != nil {
		return err
	}

	log.Println("Loaded supported resources successfully")
	return nil
}
