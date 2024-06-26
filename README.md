# Rental Cab Service

Welcome to the Rental Cab Service project! This repository contains the code for a complete car rental service, featuring a React frontend and a Node.js backend with a MySQL database.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

Rental Cab Service is a web application that allows users to search for cars near their location, book a ride, and schedule rides. The platform supports user and driver registrations, ensuring a seamless experience for both passengers and drivers.

## Features

- **User Registration**: Allows users to create an account and manage their bookings.
- **Driver Registration**: Enables drivers to register with their license number and car details.
- **Car Search**: Users can search for available cars near their location.
- **Booking and Scheduling**: Users can book immediate rides or schedule future rides.

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Database Setup

1. Install MySQL and start the MySQL server.
2. Create a new database:
    ```sql
    CREATE DATABASE rental_cab_service;
    ```
3. Create a user and grant all privileges on the database (replace `username` and `password` with your own):
    ```sql
    CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON rental_cab_service.* TO 'username'@'localhost';
    FLUSH PRIVILEGES;
    ```
4. Import the database schema (if you have a SQL file with the schema):
    ```bash
    mysql -u username -p rental_cab_service < path/to/schema.sql
    ```

5. Update the database configuration in the backend. Create a `.env` file in the `backend` directory and add the following:
    ```env
    DB_HOST=localhost
    DB_USER=username
    DB_PASSWORD=password
    DB_NAME=rental_cab_service
    ```

## Usage

### Starting the Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Start the development server:
    ```bash
    npm start
    ```
3. Open your browser and navigate to `http://localhost:3000`.

### Starting the Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Start the backend server with Nodemon for automatic restarts:
    ```bash
    nodemon index.js
    ```
3. The backend server should be running on `http://localhost:5000`.




## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using Rental Cab Service! If you have any questions or suggestions, feel free to open an issue or contact the project maintainers.

