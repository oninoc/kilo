# Awards Management System

A modern React application for managing and viewing awards, applications, and zones with infinite scroll and real-time filtering capabilities.

## 🎯 Project Overview

This application provides a comprehensive interface for browsing awards data with advanced filtering and infinite scroll functionality. Built with modern React patterns and best practices.

### ✨ Key Features

- **🏆 Awards Management** - Browse and filter awards with infinite scroll
- **📋 Applications Modal** - View detailed application information in an elegant modal
- **🌍 Zone Selection** - Filter data by geographic zones
- **📅 Date Filtering** - Filter by specific dates with validation
- **🔄 Infinite Scroll** - Smooth, performant data loading
- **🎨 Modern UI** - Built with Radix UI and Tailwind CSS
- **📱 Responsive Design** - Works perfectly on all devices
- **🔔 Toast Notifications** - User feedback for actions and validation

### 🏗️ Architecture

- **-Based Structure** - Organized by business s (awards, applications, zones)
- **Global State Management** - React Context for filter state
- **Type Safety** - Full TypeScript implementation with Zod validation
- **API Integration** - RESTful API consumption with React Query
- **Component Reusability** - Shared components and utilities

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Start development environment
make up

# Stop development environment
make down

# Rebuild containers
make build
```

### Manual Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/ui/          # Shadcn/UI components
├── pages/               # Pages
│   ├── application/       # Applications 
│   ├── award/            # Awards 
│   └── zone/             # Zones 
├── hooks/                # Global React hooks
├── shared/               # Shared utilities
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts
│   ├── providers/        # App providers
│   ├── types/           # Shared TypeScript types
│   └── utils/           # Utility functions
└── App.tsx              # Main application
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components

### Data Management
- **TanStack Query** - Server state management
- **React Context** - Global client state
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Docker** - Containerization
- **Make** - Build automation

## 📊 API Integration

The application consumes a RESTful API with the following endpoints:

- **GET /api/zones** - Fetch available zones
- **GET /api/awards** - Fetch awards with pagination
- **GET /api/applications** - Fetch applications with filtering

### API Features
- **Pagination** - Efficient data loading
- **Filtering** - By zone and date
- **Validation** - Zod schema validation
- **Error Handling** - Comprehensive error management

## 🎨 UI Components

### Core Components
- **InfiniteScroll** - Reusable infinite scrolling
- **ApplicationsModal** - Modal for application details
- **ZoneSelect** - Zone selection dropdown
- **Toast System** - User notifications

### Design System
- **Consistent Styling** - Unified design language
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Dark Mode Ready** - Theme support

## 🔧 Development Commands

```bash
make up        # Start development environment with Docker
make down      # Stop development environment
make build     # Build Docker containers
```

### Manual Commands

```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run linter
```

## 🌐 Environment Variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=https://data.javin.io/api
```

## 📝 Contributing

1. Clone the repository
2. Start development with `make up`
3. Make your changes
4. Run `npm run lint` to check code quality
5. Build with `npm run build` to test production build
6. Stop environment with `make down`

## 📄 License

This project is licensed under the MIT License.