# TerraGUI - Go Backend

## Prerequisites
- **Go**: [Download Go](https://golang.org/dl)

## Project Structure
- main.go: Entry point of application
- handlers/: Contains HTTP request handlers
- models/: Defines request, response, and other necessary models for generation
- routes/: Sets up different routes connecting to business logic
- services/: Contains business logic including file generation

## Setting up and Running Backend

1. Clone repository
- ```git clone https://github.com/behradrez/TerraGUI.git```
- ```cd backend```

2. Install Dependencies
- ```go mod tidy```

3. Run the Backend
- ```go run main.go ```

4. Test the API
- Make the following POST request to generate a sample file
```
curl -X POST http://localhost:8080/generate \
-H "Content-Type: application/json" \
-d '{
  "provider": "aws",
  "resources": {
    "resource1": {
      "resource_type": "aws_instance",
      "resource_name": "example1",
      "config": {
        "ami": "ami-12345",
        "instance_type": "t2.micro"
      }
    },
    "resource2": {
      "resource_type": "aws_s3_bucket",
      "resource_name": "example_bucket",
      "config": {
        "bucket": "my-example-bucket",
        "acl": "private"
      }
    }
  }
}'```


