package models

type Resource struct {
	ResourceName   string   `json:"resource_name"`
	RequiredFields []string `json:"required_fields"`
}

type Resources struct {
	Resources []Resource `json:"resources"`
}
