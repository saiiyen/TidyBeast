# Development Guide

This file provides guidance when working with code in this repository.

## Project Overview

This is a React-based landing page for "TidyBeast", a cleaning service platform in India. The project is built with modern web technologies and is integrated with Lovable for AI-assisted development.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with shadcn/ui component library
- **Backend**: Supabase (configured but minimal setup)
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React
- **Animations**: Custom Tailwind animations

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

### Component Structure
- **Layout Components**: Header, Footer
- **Page Sections**: Hero, Services, Pricing, About, Testimonials, Contact
- **Forms**: CustomQuoteForm (for quote requests)
- **UI Components**: Located in `src/components/ui/` - extensive shadcn/ui library

### Key Features
- Single-page application with smooth scrolling navigation
- Responsive design with mobile-first approach
- Custom animations using Tailwind CSS
- Form handling with React Hook Form and Zod validation
- Image assets stored in `src/assets/`

### Routing
- Simple React Router setup with catch-all 404 handling
- Main landing page at `/` (Index component)
- All content sections are on the single page with anchor-based navigation

### Styling System
- Custom color palette defined in Tailwind config with CSS variables
- Extensive custom animations (fade-in, slide-in, float, bounce-gentle, etc.)
- shadcn/ui theming system with dark mode support via next-themes
- Component variants using class-variance-authority

### State Management
- TanStack Query for any server state (minimal usage currently)
- React Hook Form for form state management
- Context providers for theming and UI notifications (Toaster, Sonner)

## Important File Paths

- **Main App**: `src/App.tsx` - Application shell with providers
- **Landing Page**: `src/pages/Index.tsx` - Main page with all sections
- **Components**: `src/components/` - All React components
- **Utilities**: `src/lib/utils.ts` - Utility functions (mainly `cn` for class merging)
- **Styles**: `src/index.css` - Global styles and CSS variables
- **Assets**: `src/assets/` - Images and static assets
- **Supabase**: `src/integrations/supabase/` - Database integration (currently minimal)

## Component Development Guidelines

- Components follow a functional, props-based pattern
- Use TypeScript interfaces for prop definitions
- Follow shadcn/ui patterns for UI components
- Utilize the `cn` utility from `@/lib/utils` for conditional classes
- Import paths use `@/` alias for src directory

## Build and Deployment

- The project is configured for Lovable deployment
- Vite handles bundling and optimization
- Development uses component tagging via lovable-tagger
- Build outputs to `dist/` directory

## External Integrations

- **Lovable Platform**: AI-assisted development and deployment
- **Supabase**: Database backend (configured but not actively used)
- **shadcn/ui**: Component library with extensive UI components

## Development Notes

- TypeScript configuration is lenient (no strict null checks, unused parameters allowed)
- ESLint configured with React and TypeScript rules
- No testing framework currently configured
- Uses SWC for fast compilation via Vite plugin
