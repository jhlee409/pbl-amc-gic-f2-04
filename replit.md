# PBL Medical Education Application

## Overview

This is a React-based medical education web application designed for problem-based learning (PBL) scenarios. The application presents an interactive case study about gastric cancer treatment decisions, specifically focusing on post-ESD (Endoscopic Submucosal Dissection) surgical decision-making. The application guides users through a structured conversation with an AI assistant, displaying medical images and multiple-choice questions to enhance learning.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and Google Material Design principles
- **State Management**: React hooks with local component state
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Session Management**: Express sessions with PostgreSQL session store
- **Database**: PostgreSQL with Drizzle ORM
- **Static Assets**: Vite-powered static file serving in development, Express static in production

### Key Components

#### Medical Case Flow System
- **Sequential Conversation**: Step-by-step progression through medical case scenarios
- **Interactive Questions**: Multiple-choice questions with validation and error handling
- **Auto-scroll Behavior**: Automatic scrolling to new content for better user experience
- **Medical Image Display**: Integration with Supabase storage for displaying medical images (EGD, ESD pathology reports)

#### UI Component System
- **Design System**: Comprehensive component library based on shadcn/ui
- **Responsive Design**: Mobile-first approach with Material Design principles
- **Accessibility**: Built-in accessibility features through Radix UI primitives
- **Custom Theming**: CSS custom properties for consistent color scheme and spacing

## Data Flow

1. **Application Initialization**: React app loads with routing configuration
2. **Case Progression**: User interactions trigger state updates that advance through predefined conversation steps
3. **Image Loading**: Medical images are fetched from Supabase storage when needed
4. **Question Validation**: User answers are validated against expected responses with feedback loops
5. **Auto-scroll**: New content triggers automatic scrolling to maintain user focus

## External Dependencies

### Core Dependencies
- **@supabase/supabase-js**: Cloud storage integration for medical images
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-\***: Headless UI components for accessibility
- **drizzle-orm**: Type-safe database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR (Hot Module Replacement)
- **Database**: PostgreSQL with Drizzle migrations
- **Session Storage**: In-memory sessions for development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL with connection pooling via Neon serverless
- **Static Serving**: Express serves built frontend assets

### Key Architectural Decisions

1. **Monorepo Structure**: Client, server, and shared code in single repository for easier development and deployment
2. **TypeScript Throughout**: End-to-end type safety from frontend to database
3. **Component-First UI**: Reusable component system with consistent design patterns
4. **Medical Image Storage**: External Supabase storage for scalable image hosting
5. **Session-Based State**: Server-side sessions for user progress tracking
6. **Progressive Enhancement**: Works without JavaScript for basic functionality

The application follows modern web development best practices with emphasis on type safety, accessibility, and maintainable code structure. The medical education focus requires careful attention to content presentation and user interaction flows.