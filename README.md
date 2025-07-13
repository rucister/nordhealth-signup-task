# Nordhealth Authentication System

A modern, accessible authentication system built with Nuxt 3 and the Nordhealth Design System, featuring comprehensive form validation and real-time password strength indication.

## Features

### 🔐 Authentication Pages
- **Login Page** (`/login`) - Clean, accessible sign-in form
- **Signup Page** (`/signup`) - Registration with advanced validation
- **Forgot Password Page** (`/forgot-password`) - Password reset functionality
- **Dashboard Page** (`/`) - Protected dashboard with welcome flow
- **Responsive Design** - Works seamlessly across all devices

### 🔒 Authentication System
- **Authentication composable** (`useAuth`) - Centralized auth state management
- **Token management** with localStorage persistence
- **Login/Signup/Logout** functionality with automatic redirects
- **Password reset** capability via forgot password
- **Authentication state** with reactive `isLoggedIn` computed property
- **Route protection** with authentication middleware

### ✨ Form Validation System
- **Real-time validation** with debouncing (300ms)
- **Event-driven validation** on blur events
- **Centralized validation composable** (`useFormValidation`)
- **Reusable validation functions** (email, password, required fields)
- **Password confirmation matching** with dynamic validation
- **TypeScript-first** with full type safety

### 🛡️ Password Security
- **Password strength indicator** with 4-level visual feedback
- **Real-time strength calculation** based on complexity rules
- **Accessible design** with proper ARIA labels and color coding
- **Nord Design System integration** using official tokens

### 🎨 Design System
- **Nordhealth Design System** components throughout
- **Consistent styling** with Nord design tokens
- **Accessible components** meeting WCAG standards
- **Modern UI patterns** with proper spacing and typography

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3 + TypeScript)
- **Authentication**: Custom composable with token-based auth
- **API Integration**: Custom `$apiClient` with type safety
- **Design System**: Nordhealth Design System
- **Styling**: CSS with Nord design tokens
- **Validation**: Custom composable with reactive validation
- **State Management**: Vue 3 Composition API with `useState`
- **Mocking**: MSW (Mock Service Worker) for API simulation
- **Testing**: Vitest + @vue/test-utils + happy-dom (46 comprehensive tests with 80% coverage)

## Project Structure

```
├── components/
│   ├── DemoInfo.vue           # Demo credentials and information
│   ├── EmailInput.vue         # Email input component
│   ├── Logo.vue              # Application logo
│   ├── PasswordInput.vue      # Password input with toggle visibility
│   ├── PasswordStrength.vue   # Password strength indicator
│   └── ThemeSwitcher.vue      # Theme switching component
├── composables/
│   ├── useAuth.ts             # Authentication state management
│   ├── useFormValidation.ts   # Centralized form validation
│   └── useNordTheme.ts        # Theme management
├── layouts/
│   ├── default.vue            # Authenticated layout
│   └── unauthenticated.vue    # Layout for auth pages
├── pages/
│   ├── forgot-password.vue    # Password reset page
│   ├── index.vue              # Protected dashboard
│   ├── login.vue              # Login page
│   ├── signup.vue             # Signup page
│   └── success.vue            # Success page (placeholder)
├── middleware/
│   ├── auth.ts                # Authentication middleware
│   └── notauth.ts             # Redirect authenticated users
├── mocks/
│   ├── handlers.ts            # MSW API handlers
│   ├── login.ts               # Login API mocks
│   ├── signup.ts              # Signup API mocks
│   ├── logout.ts              # Logout API mocks
│   └── forgot.ts              # Password reset mocks
├── plugins/
│   ├── apiClient.client.ts    # API client configuration
│   ├── msw.client.ts          # MSW setup
│   └── nordhealth.client.ts   # Nordhealth components
├── types/
│   ├── auth.ts                # Authentication type definitions
│   ├── api.d.ts               # API type definitions
│   └── global.d.ts            # Global type definitions
└── utils/
    ├── error-utils.ts         # Error handling utilities
    ├── validation.ts          # Validation function library
    └── validation-utils.ts    # Additional validation helpers
```

## Validation Features

### Available Validation Functions
- `validateRequired` - Required field validation
- `validateEmail` - Email format validation with detailed error messages
- `validatePassword` - Password strength validation (8+ chars, mixed case, numbers, special chars)
- `validateMinLength` - Minimum length validation
- `validatePasswordConfirmation` - Password matching validation
- `getPasswordStrength` - Returns strength score (0-4)

### Form Validation Composable
```typescript
const { formData, errors, isValid, validateAll, handleFieldValidate } = useFormValidation(
  initialData,
  validationConfig,
  { debounce: 300 }
)
```

### Authentication Composable
```typescript
const { token, isLoggedIn, login, signup, logout, forgotPassword } = useAuth()

// Login user
await login({ email: 'user@example.com', password: 'password' })

// Register new user
await signup({ 
  email: 'user@example.com', 
  password: 'password',
  passwordConfirmation: 'password',
  subscribeToUpdates: false 
})

// Logout user
await logout()

// Reset password
await forgotPassword({ email: 'user@example.com' })
```

## API Integration

### Mock Service Worker (MSW)
- **API simulation** for development and testing
- **Realistic responses** with error scenarios
- **Demo credentials** for testing different flows
- **Random failures** to simulate real-world conditions

### Demo Credentials
- **Login**: `test@example.com` / `password123`
- **Existing user error**: `already@exists.com` / `any_password`
- **Forgot password**: `test@example.com`

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Testing

This project implements a comprehensive testing strategy with **46 tests** covering unit, component, and integration testing.

### Testing Stack & Tools

- **Test Runner**: Vitest (fast, modern alternative to Jest)
- **Component Testing**: @vue/test-utils with DOM simulation via happy-dom
- **Coverage Reporting**: @vitest/coverage-v8 with HTML, LCOV, and JSON output
- **Interactive UI**: @vitest/ui for real-time test visualization
- **Mocking**: Vitest's built-in mocking capabilities
- **TypeScript**: Full TypeScript support in tests
- **CI/CD**: GitHub Actions with multi-node testing

### Quick Commands

```bash
# Run all tests
pnpm test

# Run with coverage (80% threshold)
pnpm test:coverage

# Interactive UI interface
pnpm test:ui

# Watch mode for development
pnpm test:watch

# Targeted testing
pnpm test:unit          # Unit tests only
pnpm test:component     # Component tests only
pnpm test:integration   # Integration tests only

# CI mode with verbose output
pnpm test:ci
```

### Coverage Goals & Quality Gates

| Metric | Threshold | Status |
|--------|-----------|--------|
| Lines | 80% | ✅ |
| Functions | 80% | ✅ | 
| Branches | 80% | ✅ |
| Statements | 80% | ✅ |

### Test Structure

```
tests/
├── unit/                    # Unit tests (25 tests)
│   └── validation.test.ts   # Pure validation function tests
├── components/              # Component tests (10 tests)  
│   └── PasswordStrength.test.ts  # Component behavior tests
├── integration/             # Integration tests (11 tests)
│   └── useFormValidation.test.ts  # Composable integration tests
└── setup.ts                 # Global test configuration
```

### Test Coverage Details

#### Unit Tests (25 tests)
- **validateRequired**: Required field validation with custom field names
- **validateEmail**: Email format validation with edge cases
- **validatePassword**: Password strength validation (length, complexity)
- **validateMinLength**: Minimum length validation
- **validatePasswordConfirmation**: Password matching validation
- **getPasswordStrength**: Password strength scoring (0-4 scale)

#### Component Tests (10 tests)
- **PasswordStrength Component**: 
  - Visual strength indicators (4 bars)
  - Dynamic color coding based on strength
  - CSS custom properties integration
  - Reactive password updates
  - Nord Design System component mocking

#### Integration Tests (11 tests)
- **useFormValidation Composable**:
  - Form state management with reactive objects
  - Real-time validation with debouncing
  - Error handling and clearing
  - Individual field validation
  - Cross-field validation (password confirmation)
  - Edge cases and error states

### CI/CD Pipeline

- ✅ **Automated testing** on push/PR
- ✅ **Multi-node testing** (Node 18.x, 20.x)
- ✅ **Coverage reporting** with detailed metrics
- ✅ **Quality gates** with 80% coverage minimum
- ✅ **Build verification** after tests pass
- ✅ **PR coverage comments** with visual diffs

### Advanced Testing Features

- **📊 HTML Coverage Reports** with visual highlighting
- **🎨 Interactive Test UI** for development workflow
- **⚡ Real-time Testing** with file watching
- **🎯 Targeted Test Running** by category or pattern
- **📈 Coverage Thresholds** enforcing quality standards
- **🔧 Test Performance Metrics** and timing analysis

For detailed testing documentation, see [`docs/TESTING.md`](./docs/TESTING.md).

### Future Testing Phases

- **✅ Phase 1**: Unit, Component & Integration Tests (Complete)
- **✅ Phase 2**: Coverage Reporting & CI/CD Integration (Complete)
- **🎯 Phase 3**: End-to-end testing with Playwright (as mentioned in job requirements)
- **🎯 Phase 4**: Visual regression testing for design system components
