# E-Commerce Frontend

React-based frontend application for the E-Commerce platform.

## Features

- Modern React with Hooks
- Bootstrap 5 UI framework
- React Router for navigation
- Context API for state management
- Form validation with React Hook Form
- HTTP client with Axios
- Toast notifications
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── services/      # API services
├── utils/         # Utility functions
├── styles/        # Global styles
└── guards/        # Route guards
```

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_APP_NAME` - Application name

## Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.
