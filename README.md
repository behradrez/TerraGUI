# TerraGUI - A Friendly UI for Terraform
### _TerraGUI_ is a project that aims to provide a graphical, beginner-friendly interface to working with Terraform to automate the deployment of cloud infrastructure. 
#### Terraform, a service developed by Hashicorp, simplifies the design, deployment, and management of cloud infrastructure from various providers, such as AWS and Azure through definitions in various files. This consequently involves a learning curve, which is what _TerraGUI_ sets out to solve.
### _TerraGUI_ is a full-stack application developed using React & NextJS for the frontend and Go for the backend. 
1. **Frontend**: A React application built with Next.js, providing an intuitive interface for users to input Terraform resource configurations.
2. **Backend**: A Go-based server that processes requests from the frontend and dynamically generates Terraform files.

### Through its design page, the user may create instances of various cloud services from different providers, filling out their required information as requested. When the final design is complete, a request to the server is made to generate the corresponding Terraform file. 


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Documentation](#api-documentation)

---

## Features
- **User-Friendly Interface**: A clean, simple, and beginner-friendly GUI for defining Terraform resources
- **Dynamic Terraform Generation**: The backend processes user inputs and generates Terraform files on the fly.
- **Downloadable Output**: Users can simply download the generated ready-to-go Terraform configuration.
- **Scalable Architecture**: Modularized architecture in both the frontend and backend allow for easy updates and extensions.

---

## Technologies Used

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: React
- **Styling**: CSS, Tailwind CSS, Material UI 

### Backend
- **Language**: Go (Golang)
- **HTTP Routing**: `net/http` with `gorilla/mux`
- **Template Engine**: Go's `text/template`
- **API Communication**: JSON over HTTP

## Installation
### Prerequisites
- **Node.js** (version 16 or later): [Download Node.js](https://nodejs.org/)
- **Go** (version 1.16 or later): [Download Go](https://golang.org/dl/)

### Clone the Repository
```bash
git clone <https://github.com/behradrez/TerraGUI.git>
cd TerraGUI
```

### Frontend
#### Navigate to the Frontend Directory and Install Dependencies
```bash
cd frontend
npm install
```

#### Start the Development Server
```bash
npm run dev
```
The frontend will be accessible at http://localhost:3000

### Backend
#### Navigate to the Backend Directory and Install Dependencies
```bash
cd backend
go mod tidy
```

#### Run the Backend Server
```bash
go run main.go
```
The backend server will listen for requests on http://localhost:8080

