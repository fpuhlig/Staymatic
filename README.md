# Staymatic

Staymatic is an AI-enhanced Airbnb clone that provides personalized accommodation recommendations based on users' past stays and preferences.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Local Development](#local-development)
  - [Production Deployment](#production-deployment)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Quick Start

To get the project up and running for local development, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/fpuhlig/Staymatic.git
    cd Staymatic
    ```

2.  **Start the development services:**
    This command will build the Docker images and start the frontend and backend services.

    ```bash
    docker compose -f docker-compose.dev.yml up --build -d
    ```

3.  **Access the applications:**
    - **Frontend (Next.js):** Open your browser and navigate to `http://localhost:3000`
    - **Backend (Express.js):** The API will be available at `http://localhost:3001`

For more detailed instructions, refer to the [Local Development](#local-development) section.

## Features

- Personalized accommodation recommendations using AI.
- Full-stack application with separate frontend and backend services.
- Containerized development and production environments with Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git**: For cloning the repository.
- **Docker Desktop**: Includes Docker Engine and Docker Compose.
  - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Local Development

This setup is optimized for a smooth development workflow, featuring live code reloading.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/fpuhlig/Staymatic.git
    cd Staymatic
    ```

2.  **Start the services in development mode:**
    This command will build the Docker images and start the frontend and backend services.

    ```bash
    docker compose -f docker-compose.dev.yml up --build -d
    ```

    - The first build might take some time as it installs dependencies and builds images.
    - `--build`: Ensures the images are built (or rebuilt if changes are detected).
    - `-d`: Runs the containers in detached mode (in the background).

3.  **Access the applications:**

    - **Frontend (Next.js):** Open your browser and navigate to `http://localhost:3000`
    - **Backend (Express.js):** The API will be available at `http://localhost:3001`

4.  **Live Reloading:**

    - Any changes you make to the source code (`app/frontend` or `app/backend`) on your host machine will automatically trigger a rebuild/reload within the respective Docker container, allowing for a rapid development cycle.

5.  **Stop the development services:**
    ```bash
    docker compose -f docker-compose.dev.yml down
    ```

### Production Deployment

This setup is optimized for production, building highly optimized images. The build process will include a `yarn build` step inside the Docker container.

1.  **Navigate to the project root:**

    ```bash
    cd Staymatic # Ensure you are in the root directory where docker-compose.prod.yml is located
    ```

2.  **Build the production Docker images:**
    This command compiles the application code inside the Docker images.

    ```bash
    docker compose -f docker-compose.prod.yml build
    ```

3.  **Start the services in production mode:**

    ```bash
    docker compose -f docker-compose.prod.yml up -d
    ```

4.  **Access the applications:**

    - **Frontend (Next.js):** `http://localhost:3000`
    - **Backend (Express.js):** `http://localhost:3001`

5.  **Stop the production services:**
    ```bash
    docker compose -f docker-compose.prod.yml down
    ```

## Project Structure

The project follows a monorepo structure, containing multiple services:

```
.
├── app/
│   ├── backend/        # Express.js backend service (TypeScript)
│   ├── docker/         # Dockerfiles for each service
│   │   ├── backend/
│   │   └── frontend/
│   ├── frontend/       # Next.js frontend application
│   ├── database/       # Placeholder for database-related configurations/scripts
│   ├── node_modules/   # Root node_modules for Yarn Workspaces
│   ├── package.json    # Root package.json for Yarn Workspaces
│   └── yarn.lock
├── docker-compose.dev.yml  # Docker Compose configuration for local development
├── docker-compose.prod.yml # Docker Compose configuration for production deployment
├── docs/               # Project documentation
├── .gitignore
├── LICENSE
└── README.md           # This file
```

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) (React Framework)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Backend:**
  - [Express.js](https://expressjs.com/) (Node.js web application framework)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Mongoose](https://mongoosejs.com/) (MongoDB object modeling for Node.js)
  - [Zod](https://zod.dev/) (TypeScript-first schema declaration and validation)
- **Containerization:**
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)
- **Package Management:**
  - [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
