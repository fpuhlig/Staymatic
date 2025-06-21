# 🏠 Staymatic

A modern, full-stack accommodation platform built with Next.js and Express.js. Staymatic enables users to discover and book unique properties while providing hosts with comprehensive tools to manage their listings.

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** (includes Docker Engine and Docker Compose)
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/fpuhlig/Staymatic.git
cd Staymatic
```

### 2. Choose Your Setup

#### 🏗️ **Production Setup (Recommended)**

1. **Environment Configuration:**
   Create a `.env` file based on `.env.example`:

   ```bash
   # Generate a secure secret key
   openssl rand -base64 32
   ```

   ```env
   BETTER_AUTH_SECRET=your-generated-secret-from-openssl-command-above
   MONGODB_URI=mongodb://admin:password@mongodb:27017/staymatic?authSource=admin
   MONGO_USERNAME=admin
   MONGO_PASSWORD=password
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:3001
   NODE_ENV=production
   ```

2. **Build and deploy:**
   ```bash
   docker compose -f docker-compose.prod.yml up --build -d
   ```

#### 💻 **Development Setup**

1. **Start development environment:**
   For development with live reloading:

   ```bash
   docker compose -f docker-compose.dev.yml up --build -d
   ```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

### 4. Populate with Test Data (Optional)

To quickly populate your application with realistic test data, use the provided script:

```bash
# Make the script executable
chmod +x create_test_data.sh

# Run the script (requires the application to be running)
./create_test_data.sh
```

This script will create:

- **3 Test Users**: Maria Schmidt (Berlin), Hans Müller (Munich), Anna Weber (Hamburg)
- **6 Properties**: 2 properties per user across different German cities
- **Realistic Data**: Authentic descriptions, pricing, amenities, and high-quality images
- **Image Galleries**: Multiple images per property for carousel functionality

**Requirements:**

- Application must be running (frontend on port 3000, backend on port 3001)
- Script automatically handles user registration and authentication
- All test data uses working Unsplash images

### 5. Stop Services

```bash
# Production
docker compose -f docker-compose.prod.yml down

# Development
docker compose -f docker-compose.dev.yml down
```

## ✨ Features

### 🔐 **Authentication & User Management**

- Secure email/password authentication powered by [Better Auth](https://www.better-auth.com/)
- User registration, login, and profile management
- Protected routes and role-based access control
- Session management with configurable expiration

### 🏡 **Property Management**

- **Host Dashboard**: Comprehensive property management interface
- **CRUD Operations**: Create, read, update, and delete properties
- **Image Galleries**: Multi-image support with carousel functionality
- **Rich Property Data**: Location, pricing, amenities, availability periods
- **Search & Filtering**: Filter by location, price range, and host

### 🎨 **Modern User Experience**

- Responsive design with Tailwind CSS
- Dark/light mode support
- Image carousels and galleries
- Loading states and error handling
- Accessible UI components

### 🛠 **Developer Experience**

- **TypeScript**: Full-stack type safety
- **Monorepo Architecture**: Yarn workspaces for shared code
- **API Documentation**: Interactive Swagger/OpenAPI docs
- **Testing**: Jest unit tests across all modules
- **Code Quality**: ESLint, Prettier, and pre-commit hooks

## 📁 Project Structure

```
Staymatic/
├── app/                          # Application modules
│   ├── backend/                  # Express.js backend API
│   │   ├── src/
│   │   │   ├── __tests__/       # Backend tests
│   │   │   ├── controllers/     # API route controllers
│   │   │   ├── models/          # Database models
│   │   │   ├── utils/           # Backend utilities
│   │   │   ├── bin/             # Server startup scripts
│   │   │   ├── auth.ts          # Better Auth configuration
│   │   │   ├── app.ts           # Express app setup
│   │   │   └── swagger.ts       # API documentation setup
│   │   ├── api-specification.yaml # OpenAPI/Swagger spec
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── frontend/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── __tests__/       # Frontend tests
│   │   │   ├── app/             # Next.js app router pages
│   │   │   │   ├── host/        # Host dashboard & property management
│   │   │   │   ├── login/       # Authentication pages
│   │   │   │   ├── properties/  # Property browsing
│   │   │   │   └── ...          # Other app routes
│   │   │   ├── components/      # Reusable UI components
│   │   │   │   ├── forms/       # Form components
│   │   │   │   ├── Navigation/  # Navigation components
│   │   │   │   ├── PropertyDetails/ # Property detail components
│   │   │   │   └── common/      # Common UI components
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   └── lib/             # Utilities and API clients
│   │   ├── public/              # Static assets
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── tsconfig.json
│   ├── shared/                  # Shared types and utilities
│   │   ├── src/
│   │   │   ├── __tests__/       # Shared tests
│   │   │   ├── types/           # TypeScript type definitions
│   │   │   ├── schemas/         # Zod validation schemas
│   │   │   ├── constants/       # Application constants
│   │   │   └── utils/           # Shared utility functions
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config/                  # Shared configuration
│   │   ├── eslint/              # ESLint configurations
│   │   ├── prettier/            # Prettier configuration
│   │   └── typescript/          # TypeScript configurations
│   ├── docker/                  # Dockerfiles
│   │   ├── backend/             # Backend Docker configs
│   │   └── frontend/            # Frontend Docker configs
│   └── database/                # Database configurations/scripts
├── docs/                        # Project documentation
│   ├── assets/                  # Documentation assets
│   └── *.md                     # Documentation files
├── create_test_data.sh           # Test data generation script
├── docker-compose.dev.yml       # Development environment
├── docker-compose.prod.yml      # Production environment
├── package.json                 # Root workspace configuration
├── yarn.lock                    # Dependency lock file
├── LICENSE
├── README.md
└── Staymatic.postman_collection.json # API testing collection
```

## 🛠 Technology Stack

### Frontend

- **[Next.js](https://nextjs.org/)** - React framework with App Router
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Better Auth](https://www.better-auth.com/)** - Authentication client
- **[Zod](https://zod.dev/)** - Schema validation

### Backend

- **[Express.js](https://expressjs.com/)** - Web application framework
- **[Better Auth](https://www.better-auth.com/)** - Authentication server
- **[MongoDB](https://www.mongodb.com/)** - Document database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM
- **[Swagger](https://swagger.io/)** - API documentation

### Shared & DevOps

- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - Monorepo management
- **[Docker](https://www.docker.com/)** - Containerization
- **[Jest](https://jestjs.io/)** - Testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/sign-up/email` - User registration
- `POST /api/auth/sign-in/email` - User login
- `GET /api/auth/get-session` - Get current session
- `POST /api/auth/sign-out` - User logout
- **Note**: All auth routes are handled by Better Auth automatically

### Properties

- `GET /api/properties` - Get all properties
- `GET /api/properties/with-hosts` - Get properties with host data
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Users

- `GET /api/users` - Get all users
- `PUT /api/users/profile` - Update user profile

### Health & Documentation

- `GET /health` - Health check
- `GET /api-docs` - Interactive API documentation
- `GET /api-spec.json` - OpenAPI specification (JSON)
- `GET /api-spec.yaml` - OpenAPI specification (YAML)

## 🧪 Testing

Run tests for all modules:

```bash
yarn test
```

Run tests for specific module:

```bash
yarn workspace @staymatic/frontend test
yarn workspace @staymatic/backend test
yarn workspace @staymatic/shared test
```

## 📝 Development Scripts

```bash
# Install dependencies
yarn install

# Start development servers
yarn dev

# Build all modules
yarn build

# Run linting
yarn lint

# Format code
yarn format

# Run tests
yarn test
```

## 🌟 Key Features in Detail

### Host Dashboard

- View all listed properties with statistics
- Add new properties with comprehensive forms
- Edit existing property details
- Delete properties with confirmation
- Real-time property management

### Property Browsing

- Grid view of all available properties
- Detailed property pages with image galleries
- Host information and contact details
- Advanced filtering and search capabilities

### User Authentication

- Secure registration and login flows
- Profile management with image uploads
- Session-based authentication
- Protected routes and access control

## 📖 Documentation

Comprehensive project documentation is available in the `/docs` directory:

- [Project Overview](docs/01_Short%20Overview%20on%20the%20specific%20Software%20Project.md)
- [Business View](docs/02_Business%20View.md)
- [Technical Architecture](docs/04_Technical%20View.md)
- [Security Considerations](docs/08_Security%20View.md)
- [Testing Strategy](docs/09_Testing%20View.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Getting Started with Development

1. **Environment Setup**: Follow the Quick Start guide above
2. **Database**: MongoDB will be automatically set up via Docker
3. **API Testing**: Use the built-in Swagger UI at `/api-docs`
4. **Code Quality**: Pre-commit hooks ensure code quality
5. **Testing**: Run tests before committing changes
