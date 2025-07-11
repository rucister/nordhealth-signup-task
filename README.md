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
