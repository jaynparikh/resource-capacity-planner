# Architecture

## Overview

The Resource Capacity Planner follows a modern three-tier architecture consisting of a React frontend, an Express.js backend, and a PostgreSQL database accessed through Prisma ORM. The application also integrates Google Gemini AI to provide intelligent resource planning recommendations.

---

# High-Level Architecture

```
+-----------------------------+
|       React Frontend        |
|-----------------------------|
| Dashboard                   |
| Employees                   |
| Projects                    |
| Allocation                  |
| Capacity                    |
| Reports                     |
| Settings                    |
| AI Assistant                |
+-------------+---------------+
              |
              | REST API
              |
+-------------v---------------+
|      Express Backend        |
|-----------------------------|
| Employee API                |
| Project API                 |
| Allocation API              |
| AI API                      |
+-------------+---------------+
              |
              | Prisma ORM
              |
+-------------v---------------+
|       PostgreSQL Database   |
+-------------+---------------+
              |
              | Business Context
              |
+-------------v---------------+
|      Google Gemini AI       |
+-----------------------------+
```

---

# Frontend Architecture

The frontend is built using React with a modular structure.

## Modules

- Dashboard
- Employees
- Projects
- Allocation
- Capacity
- Reports
- Settings
- AI Assistant

Each module is responsible for a single business capability and communicates with the backend using Axios.

---

# Backend Architecture

The backend follows a layered architecture.

```
Routes
   ↓
Controllers
   ↓
Prisma ORM
   ↓
PostgreSQL
```

### Responsibilities

**Routes**
- Define REST API endpoints.

**Controllers**
- Validate requests.
- Execute business logic.
- Return API responses.

**Prisma ORM**
- Handles database interactions.
- Maps database records to JavaScript objects.

---

# Database Design

The application uses PostgreSQL with Prisma ORM.

## Entities

### Employee

Stores employee information.

Fields include:

- Name
- Role
- Skill
- Capacity
- Status

---

### Project

Stores project information.

Fields include:

- Project Name
- Client
- Status

---

### Allocation

Represents the assignment of employees to projects.

Fields include:

- Employee
- Project
- Allocation Percentage

---

### Setting

Stores application-wide configuration.

Examples:

- Company Name
- Working Hours
- Default Capacity

---

# AI Assistant Workflow

The AI Assistant is powered by Google Gemini.

Workflow:

```
User Question

↓

React Frontend

↓

POST /api/ai/query

↓

Express Controller

↓

Fetch Employee Data

↓

Fetch Project Data

↓

Fetch Allocation Data

↓

Build Business Summary

↓

Generate Prompt

↓

Google Gemini API

↓

AI Response

↓

React UI
```

The backend sends a structured business summary instead of raw database records. This reduces prompt size and improves the quality of AI-generated recommendations.

---

# API Communication

Frontend and backend communicate using REST APIs.

Example:

```
GET    /api/employees

POST   /api/projects

PUT    /api/allocations/{id}

POST   /api/ai/query
```

All communication uses JSON.

---

# Design Principles

The project was designed using the following principles:

- Modular architecture
- Separation of concerns
- Reusable UI components
- RESTful APIs
- Scalable folder structure
- Clean code practices
- AI-assisted decision support

---

# Future Improvements

Potential enhancements include:

- Authentication and authorization
- Role-based access control
- Forecast-based capacity planning
- Leave management
- Skill matrix
- Email notifications
- Export reports to PDF and Excel
- Predictive AI recommendations

---

# Conclusion

The Resource Capacity Planner demonstrates a complete full-stack application with modern frontend development, RESTful backend services, relational database design, and practical AI integration. The project showcases real-world enterprise application architecture and can serve as a foundation for more advanced workforce planning solutions.
