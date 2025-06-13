# Staymatic Test Plan

## 1. Architecture Overview
- **Frontend:** Next.js (React), shadcn/ui, TypeScript
- **Backend:** Node.js with Express.js, RESTful API
- **Database:** MongoDB (Dockerized)
- **AI Integration:** OpenAI/ChatGPT API

---

## 2. Test Types by Layer

### Frontend (Next.js)
- **Unit Tests:** Components, forms, validations
- **Integration Tests:** Component interactions, API calls
- **End-to-End Tests (E2E):** User flows (e.g., registration, booking, search)
- **UI/UX Tests:** Responsiveness, accessibility, usability

### Backend (Express.js)
- **Unit Tests:** Routes, controllers, services, validations
- **Integration Tests:** Route interactions, database, external APIs (e.g., AI)
- **API Tests:** REST endpoints (CRUD for apartments, bookings, users)
- **Security Tests:** Authentication, permissions, input validation

---

## 3. When are tests conducted?
- **Unit/Integration:** During development (local, CI)
- **E2E/UI:** Before release, after major changes (staging)
- **API/Security:** Before release, regularly automated (CI/CD)
- **Regression:** After each bugfix/feature update

---

## 4. Example: Functional Test Case

To create a functional test case, we consider the following:
*   **Which steps should be tested?** These are detailed in the "Test Steps" column.
*   **Which data should be entered?** This is specified in the "Test Data" column.
*   **What data is expected as output?** This is outlined in the "Expected Results" column.

### Frontend: User Registration
| Test Case ID | Test Case Description | Test Steps | Test Data | Expected Results | Actual Results | Pass/Fail |
|--------------|-----------------------|------------|-----------|------------------|----------------|-----------|
| TU01         | User Registration     | 1. Open registration<br>2. Fill fields<br>3. Submit form<br>4. Successful registration<br>5. Login with new data | Name: John Doe<br>Email: john@test.com<br>Password: Test123!<br>-<br>Email/password | Registration form is displayed<br>Fields are correctly filled<br>Loading indicator, API request is sent<br>Redirect to dashboard, welcome message<br>Login successful, user is logged in |                |           |

---

### Backend: Registration (API Test)
| Test Case ID | Test Case Description | Test Steps | Request | Expected Response | Actual Results | Pass/Fail |
|--------------|-----------------------|------------|---------|-------------------|----------------|-----------|
| TU02         | API Register Valid    | 1. POST /api/register | { name, email, password } | 201 Created, User object, Token |                |           |
| TU03         | API Login Valid       | 1. POST /api/login | { email, password } | 200 OK, Token, User object |                |           |
| TU04         | API User Data         | 1. GET /api/user/me (with Token) | - | 200 OK, User data |                |           |

---

### Additional Test Cases (Selection)
#### Frontend
- Apartment search (with AI)
- Apartment booking
- Display of recommendations
- Send/read messages

#### Backend
- AI recommendation: POST /api/recommendations
- Booking: POST /api/bookings
- Permission check: Access to admin endpoints

---

**Note:** All tests should also cover error cases (e.g., invalid inputs, duplicate registration, missing permissions).

## 4.1. External Review of Functional Test Cases
It is recommended to have another team run the functional test cases to ensure objectivity and discover any overlooked issues or assumptions.

---

## 5. Additional Important Test Types

### Performance Tests
- **Goal:** Ensure the application remains performant under high load.
- **Examples:**
  - Load Testing: Determine maximum users/requests
  - Stress Testing: Behavior under overload
  - Response Time Testing: Page and API response times

### Security Tests
- **Goal:** Protection against attacks and misuse.
- **Examples:**
  - Penetration Testing: Simulated attacks
  - Vulnerability Scanning: Automated vulnerability search
  - Input Validation: Protection against SQL Injection, XSS, CSRF
  - Authentication/Authorization tests

### Usability Tests
- **Goal:** Ensure the application is easy and understandable for users.
- **Examples:**
  - Accessibility
  - User Experience: User-friendliness

### Compatibility Tests
- **Goal:** Does the application work on different devices, browsers, and operating systems?
- **Examples:**
  - Cross-Browser Testing: Chrome, Firefox, Safari, Edge
  - Mobile/Tablet/Desktop tests

### Backup and Recovery Tests
- **Goal:** Ensure data loss is minimized and recovery works.
- **Examples:**
  - Test backup strategy
  - Recovery tests after failure

### Monitoring and Logging
- **Goal:** Early detection of errors and anomalies.
- **Examples:**
  - Error logging
  - Performance monitoring

---

## 6. Additional Organizational Aspects

### Test Data Management
- Test data is automatically generated before each test run and deleted after the test run.
- Special test databases are used for E2E and integration tests.

### Test Automation
- Frontend: e.g., Jest, React Testing Library, Cypress
- Backend: e.g., Jest, Supertest
- API: e.g., Postman/Newman
- Automated execution in CI/CD pipeline

### Test Coverage
- Goal: At least 80% unit test coverage in frontend and backend
- Regular checking of test coverage in the pipeline

### Rollback Strategies
- Automatic rollbacks to the last stable version are performed for failed deployments.
