

---

# Employee Management System

A full-stack application for managing employees using **Angular** (frontend) and **Spring Boot** (backend). The system supports CRUD operations, role-based security, and interactive alerts.

## Frontend Features

- **Angular v14**: Updated UI for employee management.
- **Components**: Employee list, add, update, and delete.
- **SweetAlert**: User-friendly alerts for actions.
- **Technologies**: Angular Router, HttpClient, Bootstrap.

### Setup

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Siddhantthorat/employee-management-frontend.git
   cd employee-management-frontend
   npm install
   ng serve
   ```
2. Access the app at `http://localhost:4200`.

## Backend Features

- **Spring Boot with MySQL**: Secure employee data management.
- **Role-based Security**: Admin (full) & User (read-only) access.
- **Security Update**: Uses `SecurityFilterChain` (replaces deprecated `WebSecurityConfigurerAdapter`).
- **Custom Exception Handling**: Robust global error management.
- **Swagger**: API documentation and testing.

### Setup

1. Clone the backend repository:
   ```bash
   git clone https://github.com/Siddhantthorat/EmployeeManagementSystemProject.git
   ```
2. Configure `application.properties` for MySQL.
3. Run:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

- **GET /employees**: List all employees.
- **POST /employees**: Add a new employee.
- **Swagger**: `/swagger-ui.html` for documentation.

---
