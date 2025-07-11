# Nordhealth Authentication System

A modern, accessible authentication system built with Nuxt 3 and the Nordhealth Design System, featuring comprehensive form validation and real-time password strength indication.

## Features

### 🔐 Authentication Pages
- **Login Page** (`/login`) - Clean, accessible sign-in form
- **Signup Page** (`/signup`) - Registration with advanced validation
- **Responsive Design** - Works seamlessly across all devices

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
- **Design System**: Nordhealth Design System
- **Styling**: CSS with Nord design tokens
- **Validation**: Custom composable with reactive validation
- **State Management**: Vue 3 Composition API
- **Testing**: Vitest + @vue/test-utils + happy-dom (46 comprehensive tests)

## Project Structure

```
├── components/
│   ├── PasswordInput.vue      # Password input with toggle visibility
│   └── PasswordStrength.vue   # Password strength indicator
├── composables/
│   └── useFormValidation.ts   # Centralized form validation
├── layouts/
│   └── unauthenticated.vue    # Layout for auth pages
├── pages/
│   ├── login.vue              # Login page
│   └── signup.vue             # Signup page
├── utils/
│   └── validation.ts          # Validation function library
└── middleware/
    └── auth.ts                # Authentication middleware
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

### Testing Stack

- **Test Runner**: Vitest (fast, modern alternative to Jest)
- **Component Testing**: @vue/test-utils with DOM simulation via happy-dom
- **Mocking**: Vitest's built-in mocking capabilities
- **TypeScript**: Full TypeScript support in tests

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

### Running Tests

```bash
# Run all tests once
pnpm test:run

# Run tests in watch mode (during development)
pnpm test

# Run with coverage report
pnpm test:coverage

# Run with UI (coming in Phase 2)
pnpm test:ui
```

### Test Coverage

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

### Future Testing Phases

- **Phase 2**: Add test coverage reporting and UI
- **Phase 3**: End-to-end testing with Playwright (as mentioned in job requirements)
- **Phase 4**: Visual regression testing for design system components
