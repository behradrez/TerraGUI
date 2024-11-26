package services

import (
	"bytes"
	"html/template"
	"project/models"
)

func GenerateTerraformFile(req models.GenerateFileRequest) (*bytes.Buffer, error) {

	tmpl := `provider "{{.Provider}}" {}

{{range $key, $value := .Resources}}
resource "{{$value.ResourceType}}" "{{$value.ResourceName}}" {
	{{range $innerKey, $innerValue := $value.Config}}{{$innerKey}} = "{{$innerValue}}"
	{{end}}
}
{{end}}
`

	t, err := template.New("terraform").Parse(tmpl)
	if err != nil {
		return nil, err
	}

	var buffer bytes.Buffer
	err = t.Execute(&buffer, req)
	if err != nil {
		return nil, err
	}

	return &buffer, nil
}
