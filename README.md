# Inventory Management System

This is an **Inventory Management System** built using **Node.js, Express, TypeORM, and PostgreSQL**. It provides APIs for managing inventory, including adding, updating, listing, checking stock in/out, and generating reports.

## Features
- User authentication with JWT
- Add, update, and list inventory items
- Bulk inventory addition
- Stock check-in and check-out
- Inventory report generation with filtering and sorting

## Installation

### Prerequisites
- Node.js installed
- PostgreSQL installed and running
- `.env` file set up with the following variables:
  ```env
  PORT=8000
  JWT_SECRET=your_jwt_secret
  DATABASE_URL=your_postgres_connection_string
  ```

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/inventory-management.git
   cd inventory-management
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the server:
   ```sh
   npm run dev   # Starts the server with nodemon
   ```

## API Endpoints

### **Authentication APIs**

#### **User Signup**
- **Endpoint:** `POST /api/auth/signup`
- **Description:** Registers a new user.
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **User Login**
- **Endpoint:** `POST /api/auth/login`
- **Description:** Logs in a user and returns a JWT token.
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### **Inventory APIs**

#### **Add Inventory Item**
- **Endpoint:** `POST /api/inventory/addinventory`
- **Authentication:** Requires Bearer Token
- **Body:**
  ```json
  {
    "name": "Laptop",
    "description": "Gaming Laptop",
    "quantity": 10,
    "price": 1500
  }
  ```
- **Response:**
  ```json
  {
    "message": "Inventory added successfully",
    "inventory": { ... }
  }
  ```

#### **Add Bulk Inventory**
- **Endpoint:** `POST /api/inventory/addbulkinventory`
- **Authentication:** Requires Bearer Token
- **Body:**
  ```json
  {
    "items": [
      { "name": "Mouse", "description": "Wireless Mouse", "quantity": 50, "price": 20 },
      { "name": "Keyboard", "description": "Mechanical Keyboard", "quantity": 30, "price": 80 }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Bulk inventory added",
    "data": [ ... ]
  }
  ```

#### **List Inventory Items**
- **Endpoint:** `GET /api/inventory/list`
- **Query Parameters (Optional):**
  - `name`: Filter by name
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `minQuantity`: Minimum quantity filter
  - `maxQuantity`: Maximum quantity filter
- **Response:**
  ```json
  {
    "message": "Inventory list retrieved",
    "data": [ ... ]
  }
  ```

#### **Update Inventory Item**
- **Endpoint:** `PUT /api/inventory/update/:id`
- **Authentication:** Requires Bearer Token
- **Body:** (Any fields can be updated)
  ```json
  {
    "name": "Updated Laptop",
    "quantity": 5
  }
  ```
- **Response:**
  ```json
  {
    "message": "Inventory updated successfully",
    "data": { ... }
  }
  ```

#### **Stock Check-In**
- **Endpoint:** `PUT /api/inventory/stock-in/:id`
- **Authentication:** Requires Bearer Token
- **Body:**
  ```json
  {
    "quantity": 10
  }
  ```
- **Response:**
  ```json
  {
    "message": "Stock checked in",
    "data": { ... }
  }
  ```

#### **Stock Check-Out**
- **Endpoint:** `PUT /api/inventory/stock-out/:id`
- **Authentication:** Requires Bearer Token
- **Body:**
  ```json
  {
    "quantity": 5
  }
  ```
- **Response:**
  ```json
  {
    "message": "Stock checked out",
    "data": { ... }
  }
  ```

### **Report Generation API**
- **Endpoint:** `GET /api/inventory/report`
- **Authentication:** Requires Bearer Token
- **Query Parameters (Optional):**
  - `name`: Filter by name
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `minQuantity`: Minimum quantity filter
  - `maxQuantity`: Maximum quantity filter
  - `status`: `in-stock` or `out-of-stock`
  - `startDate`: Filter by creation date (start)
  - `endDate`: Filter by creation date (end)
  - `sortBy`: Field to sort (`name`, `price`, `quantity`, `created_at`)
  - `sortOrder`: `ASC` or `DESC`
- **Response:**
  ```json
  {
    "message": "Report generated",
    "data": [ ... ]
  }
  ```

## How to Test APIs in Postman
1. **Login** using `POST /api/auth/login` and get the JWT token.
2. **Use the token** in headers:
   - Key: `Authorization`
   - Value: `Bearer your_jwt_token`
3. **Call other APIs** while passing the token in the Authorization header.

## License
This project is licensed under the MIT License.



