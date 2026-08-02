# API Documentation

## Overview

The Resource Capacity Planner exposes RESTful APIs for managing employees, projects, allocations, settings, reports, and AI-powered resource planning.

Base URL

```
http://localhost:5000/api
```

---

# Employees

## Get Employees

```
GET /employees
```

Returns all employees.

---

## Create Employee

```
POST /employees
```

Request

```json
{
  "name": "John Smith",
  "role": "Frontend Developer",
  "skill": "React",
  "capacity": 100,
  "status": "Available"
}
```

---

## Update Employee

```
PUT /employees/{id}
```

---

## Delete Employee

```
DELETE /employees/{id}
```

---

# Projects

## Get Projects

```
GET /projects
```

---

## Create Project

```
POST /projects
```

Example

```json
{
  "name": "Phoenix",
  "client": "ABC Ltd",
  "status": "Active"
}
```

---

## Update Project

```
PUT /projects/{id}
```

---

## Delete Project

```
DELETE /projects/{id}
```

---

# Allocations

## Get Allocations

```
GET /allocations
```

---

## Create Allocation

```
POST /allocations
```

Example

```json
{
  "employeeId": 1,
  "projectId": 2,
  "allocation": 40
}
```

---

## Update Allocation

```
PUT /allocations/{id}
```

---

## Delete Allocation

```
DELETE /allocations/{id}
```

---

# AI Assistant

## Ask AI

```
POST /ai/query
```

Example Request

```json
{
  "question": "Who has available capacity?"
}
```

Example Response

```json
{
  "success": true,
  "answer": "Jay has 90% available capacity..."
}
```

---

# Health Check

```
GET /health
```

Returns application status.

---

# Response Format

Successful requests

```json
{
  "success": true
}
```

Error response

```json
{
  "success": false,
  "message": "Something went wrong."
}
```
