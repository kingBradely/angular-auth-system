# Angular Authentication Project

A robust authentication system built with Angular, featuring user registration, login functionality, and route protection. This project demonstrates modern authentication practices and Angular's powerful features for building secure web applications.

## Features

- User Registration
- User Login
- Protected Routes with Auth Guards
- Reactive Forms with Validation
- HTTP Interceptors for Token Management
- Comprehensive Error Handling
- Unit Tests for Components

## Tech Stack

- Angular 19.2.0
- TypeScript
- RxJS
- Angular Forms
- Angular Router
- Jasmine/Karma for Testing

## Environment Setup

### Required Software

1. **Node.js**:
   - Version: 18.x LTS or higher
   - Download from: https://nodejs.org
   - Verify installation: `node --version`

2. **npm (Node Package Manager)**:
   - Version: 9.x or higher (comes with Node.js)
   - Verify installation: `npm --version`

3. **Angular CLI**:
   - Version: 19.2.x
   - Install globally: `npm install -g @angular/cli`
   - Verify installation: `ng version`

### Development Tools

1. **Visual Studio Code (Recommended)**:
   - Download from: https://code.visualstudio.com
   - Recommended Extensions:
     - Angular Language Service
     - Angular Snippets
     - ESLint
     - Prettier

2. **Git**:
   - Download from: 2. **Git**:
   - Download from: https://git-scm.com/downloads
   - Verify installation: `git --version`
## Project Structure

```
src/app/
├── components/
│   ├── login/          # Login component with form validation
│   └── register/       # Registration component with form validation
├── services/
│   └── auth.service.ts # Authentication service for API communication
├── guards/
│   └── auth.guard.ts   # Route protection implementation
├── interceptors/       # HTTP interceptors for token management
```

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm (Node Package Manager)
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kingBradely/angular-auth-system.git
cd angular-auth-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Authentication Flow

1. **Registration**:
   - User submits email and password
   - Form validation ensures data integrity
   - Successful registration redirects to login

2. **Login**:
   - User provides credentials
   - JWT token received upon successful authentication
   - Token stored securely for subsequent requests

3. **Route Protection**:
   - AuthGuard prevents unauthorized access
   - Automatic redirection to login page
   - Token validation on protected routes

## Development Guidelines

### Creating New Components

```bash
ng generate component components/your-component
```

### Running Tests

- Unit Tests:
```bash
ng test
```

- Coverage Report:
```bash
ng test --code-coverage
```

### Best Practices

1. **Form Validation**:
   - Use Reactive Forms for complex validations
   - Implement custom validators when needed
   - Provide clear error messages

2. **Authentication**:
   - Never store sensitive data in localStorage
   - Implement token refresh mechanism
   - Handle session expiration gracefully

3. **Error Handling**:
   - Implement global error handling
   - Provide user-friendly error messages
   - Log errors for debugging

## Security Considerations

- HTTPS enforced for all API communications
- JWT tokens used for stateless authentication
- XSS protection through Angular's built-in sanitization
- CSRF protection implementation
- Secure password handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular Documentation
- Angular CLI team
- Authentication best practices community

## Contact

Oussema Hedhlie - ossamahedli@gmail.com

Project Link: https://github.com/kingBradely/angular-auth-system.git

