# Technical View

## Technology Stack Decisions

### Deviations from Project Requirements

The following section documents where our technology choices deviate from the expected project requirements and provides justifications:

#### Frontend Framework

- **Expected:** Angular
- **Chosen:** Next.js (React-based)
- **Justification:** Next.js provides better performance with server-side rendering, built-in optimization, and simpler deployment. The React ecosystem offers more flexibility and modern development patterns.

#### UI Framework

- **Expected:** Bootstrap with SASS
- **Chosen:** Tailwind CSS
- **Justification:** Tailwind CSS provides utility-first styling with better maintainability and smaller bundle sizes. No custom component library is used - components are built directly with Tailwind.

#### Package Manager

- **Expected:** npm
- **Chosen:** Yarn workspaces
- **Justification:** Yarn workspaces provide better monorepo management and faster dependency resolution for multi-package projects.

#### Build Automation

- **Expected:** gulp
- **Chosen:** Next.js built-in build system + Docker
- **Justification:** Next.js provides modern build optimization out-of-the-box. Docker ensures consistent deployment across environments.

#### Testing Framework

- **Expected:** mocha/chai
- **Chosen:** Jest + React Testing Library
- **Justification:** Jest integrates better with React/Next.js ecosystem. React Testing Library promotes better testing practices.

#### Technology Alignment

The following technologies align with project requirements:

- ✅ **Node.js** - Backend runtime
- ✅ **Express.js** - Web server framework
- ✅ **MongoDB** - NoSQL database (via Mongoose)
- ✅ **TypeScript** - Enhanced JavaScript
- ✅ **ESLint** - Code quality checking
- ✅ **REST API** - Web services architecture

## How should the solution work?

### 1. How is the system structured and built?

- **Frontend:**

  - Next.js-based web application
  - Responsive design for desktop and mobile
  - Tailwind CSS for styling

- **Backend:**

  - Node.js with Express.js as API server
  - RESTful API for main functionalities
  - Mongoose for MongoDB integration

- **Database:**

  - MongoDB for flexible data storage

- **Recommendation System:**
  - Integration of OpenRouter API for enhanced recommendations
  - Simple API requests for personalization features

### 2. Additional Development Tools and Technologies

#### Code Quality & Formatting

- **ESLint** - Linting with TypeScript support and Airbnb config
- **Prettier** - Code formatting with Tailwind CSS plugin
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files only

#### Authentication & Validation

- **better-auth** - Modern authentication solution
- **Zod** - Schema validation for TypeScript

#### API Documentation

- **swagger-jsdoc** - Generate OpenAPI specs from JSDoc comments
- **swagger-ui-express** - Serve interactive API documentation

#### Build & Development

- **concurrently** - Run multiple development servers simultaneously
- **tsc-alias** - TypeScript path mapping resolution
- **nodemon** - Auto-restart backend during development

#### Monorepo Management

- **Yarn workspaces** - Multi-package project management
- **Shared configurations** - ESLint, Prettier, TypeScript configs

### 3. What interfaces and constraints exist?

- **External APIs:**
  - OpenRouter API for recommendation features

### 4. What applications and data are needed?

- **Applications:**

  - Web application
  - Admin dashboard
  - Host portal

- **Data:**
  - User profiles and preferences
  - Accommodation details and availability
  - Booking history
  - Ratings and reviews

### 5. What does the infrastructure look like?

- **Docker Containers:**
  - Frontend container (Next.js)
  - Backend container (Node.js/Express)
  - Database container (MongoDB)
  - Docker Compose for local development
- **Scalability:**
  - Horizontal and vertical scaling possible

### 6. What standards are set?

- **Code Standards:**
  - ESLint for JavaScript/TypeScript
  - Prettier for code formatting
- **API Documentation:**
  - Swagger/OpenAPI specification
- **Security Best Practices:**
  - HTTPS for all connections
  - Database encryption
  - Secure storage of secrets (.env, Vault)

### 7. How are quality requirements achieved?

- **Performance:**

  - Loading times < 2 seconds
  - 99.9% uptime
  - < 100ms API response time

- **Maintainability:**
  - Automated tests (Unit, Integration)
  - JSDoc/TSDoc documentation
