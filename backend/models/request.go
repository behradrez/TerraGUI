package models

type TerraformRequest struct {
	ResourceType string            `json:"resource_type"`
	ResourceName string            `json:"resource_name"`
	Config       map[string]string `json:"config"`
}

type GenerateFileRequest struct {
	Provider  string             `json:"provider"`
	Resources []TerraformRequest `json:"resources"`
}
