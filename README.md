# Products API

This is a backend application that provides a CRUD (Create, Read, Update, Delete) API for managing products. The application is built using NestJS and runs in a Dockerized environment.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Installation

1. Clone the repository

2. Configure environment variables:
   - Create a `.env` file in the root directory.
   - You can copy the default configuration from `.env.dist` and modify it as needed.

3. Start the application using Docker Compose:
   ```sh
   docker-compose up -d
   ```

### Usage

Once the application is running, the API will be available at localhost

#### Available Endpoints

- **GET** `/products` - Retrieve all products.
- **GET** `/products/:id` - Retrieve a product by ID.
- **POST** `/products` - Create a new product.
- **PUT** `/products/:id` - Update an existing product.
- **DELETE** `/products/:id` - Delete a product.

### Stopping the Application

To stop the running containers, use:
```sh
docker-compose down
```