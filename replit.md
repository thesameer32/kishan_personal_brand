# Overview

This is a personal brand website for Kishan Kumar (Build With Kishan), a 20-year-old business coach and entrepreneur. The website serves as a premium coaching platform with a dark theme and electric blue accents, designed to build trust, showcase achievements, and funnel visitors into free workshops and resources. The site features modern animations, a clean layout, and focuses on business education content.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React-based frontend built with TypeScript and Vite for fast development and building. The UI is constructed using shadcn/ui components with Radix UI primitives, providing a consistent design system with accessibility built-in. The styling is handled through Tailwind CSS with a custom dark theme featuring electric blue accents and glass morphism effects.

**Key Frontend Decisions:**
- **React with TypeScript**: Provides type safety and modern component architecture
- **Vite**: Fast development server and optimized production builds
- **Wouter**: Lightweight client-side routing instead of React Router
- **TanStack Query**: Server state management and caching
- **shadcn/ui**: Pre-built, accessible component library with Radix UI primitives
- **Tailwind CSS**: Utility-first styling with custom CSS variables for theming

## Backend Architecture
The backend is a minimal Express.js server with TypeScript that serves the React application in production and provides API endpoints. The architecture follows a simple REST pattern with in-memory storage for development, designed to be easily extended with database integration.

**Key Backend Decisions:**
- **Express.js**: Lightweight Node.js web framework for API endpoints
- **TypeScript**: Type safety across the entire stack
- **Memory Storage**: Simple in-memory data store with interface for easy database migration
- **Vite Integration**: Development middleware for hot reloading and asset serving

## Database Design
The application is configured for PostgreSQL using Drizzle ORM but currently implements in-memory storage for development. The schema defines a basic user table with UUID primary keys and includes validation through Zod schemas.

**Schema Architecture:**
- **Users Table**: Basic user authentication with username/password
- **Drizzle ORM**: Type-safe database queries with schema migrations
- **Zod Validation**: Runtime type validation for API inputs

## Styling and Design System
The design system implements a premium dark theme with electric blue accents, custom CSS properties for consistent theming, and smooth animations throughout. The component system uses class-variance-authority for variant management and includes glass morphism effects.

**Design Decisions:**
- **Dark Theme**: Professional coaching platform aesthetic
- **Electric Blue Accents**: Brand color for CTAs and highlights
- **Glass Morphism**: Modern backdrop blur effects for cards
- **Custom Fonts**: Sora for headings, Inter for body text, Manrope for secondary text
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Component Architecture
The application follows a modular component structure with dedicated sections for different parts of the landing page. Components are organized by feature with shared UI components in a separate directory.

**Component Structure:**
- **Feature Components**: Hero, About, Workshop, Resources, etc.
- **UI Components**: Reusable shadcn/ui components
- **Layout Components**: Navigation, Footer
- **Page Components**: Home page composition

# External Dependencies

## UI and Styling
- **@radix-ui/react-***: Accessible component primitives for dropdowns, dialogs, forms, and other interactive elements
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant management for components
- **clsx**: Conditional className utility
- **lucide-react**: Icon library for UI elements

## Frontend Framework
- **react**: Core frontend library
- **@vitejs/plugin-react**: React support for Vite
- **wouter**: Lightweight routing library
- **@tanstack/react-query**: Server state management and data fetching

## Backend Infrastructure
- **express**: Node.js web application framework
- **@neondatabase/serverless**: PostgreSQL database adapter (configured but not active)
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management tools

## Development Tools
- **typescript**: Type checking and development experience
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production

## Form Handling
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and schema definition

## Date and Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **cmdk**: Command palette component library