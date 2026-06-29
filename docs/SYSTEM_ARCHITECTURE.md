# JobHireGround System Architecture

## Overview

JobHireGround is a map-based job discovery SaaS built around a custom illustrated world map. The product combines a fast Next.js frontend, a typed API layer, a relational PostgreSQL database, and Prisma as the database access layer. The architecture is designed to support the current MVP in Bukidnon and scale later to the Philippines, Southeast Asia, and eventually a global deployment without changing the core application structure.

The system follows a layered design:

- Presentation layer: Next.js App Router pages and React components
- UI composition layer: reusable layout, map, and design-system components
- State layer: client-side Zustand for transient UI state
- Domain/data layer: services, API routes, validation, and Prisma access
- Persistence layer: PostgreSQL with normalized job marketplace entities

The project should preserve the current product direction: professional SaaS first, gamified experience second. The map is not a real GPS map; it is a stylized job discovery interface where companies are buildings, jobs are opportunities, and users are circular profile icons.

## 1. High-Level Architecture

### Frontend

The frontend is a Next.js 16 application using TypeScript and Tailwind CSS. It renders the landing page, dashboard, interactive map, job detail panel, company profiles, user profiles, and employer views.

Frontend responsibilities:

- Render the landing experience and authenticated dashboard
- Present the custom illustrated map and job discovery UI
- Handle lightweight client-side interactions such as tab switching, map filters, and selected job state
- Keep the interface responsive and performant on low-end devices
- Use reusable components for layout, map markers, badges, avatars, cards, and panels

The frontend should be organized to keep most data fetching in server components or route handlers, while using client components only where interactivity is required.

### Backend

The backend is provided by Next.js server capabilities and API routes. In the production architecture, backend responsibilities should include:

- Querying and mutating the database through service functions
- Validating all incoming request payloads
- Enforcing authentication and authorization rules
- Serving job, company, user, application, and notification data
- Supporting employer workflows such as posting jobs and managing applications

The backend should stay thin at the route level and delegate business logic to a service layer.

### Database

The database is PostgreSQL, accessed through Prisma.

It stores the core marketplace entities:

- Users
- Companies
- Jobs
- Applications
- SavedJobs
- Notifications
- Country, Region, and City reference data

The schema should remain normalized so the product can scale across regions and support search, filtering, and reporting without major restructuring.

### Authentication

Authentication should support both regular users and employers.

Expected authentication capabilities:

- Email and password sign-in
- User registration
- Session management
- Optional Google login later
- Role-aware access for employers and verified accounts

Authentication should be implemented so the frontend can render UI state, but the server always enforces access control.

### API Layer

The API layer exposes the application capabilities to the frontend and future clients.

Based on the current spec, the initial public routes are:

- GET /jobs
- GET /companies
- GET /users
- POST /jobs
- POST /applications
- PATCH /applications/:id

In production, these routes should be backed by validation, service logic, and Prisma queries rather than direct database access from UI code.

## 2. Frontend Structure

### app/

The app/ directory is the Next.js App Router entry point.

It should contain:

- Global layout and metadata
- Page routes and route groups
- Server-rendered shells for landing and dashboard experiences
- Route-level loading and error UI
- Any server actions or route-specific orchestration that belongs to a page boundary

In the current product, app/ should stay small and route-focused.

### components/

The components/ directory contains shared UI and feature components.

It is already aligned with the product structure and should remain split by concern:

- layout/ for shell components such as Sidebar, TopNav, and DashboardLayout
- map/ for InteractiveMap, MapLegend, ExploreByType, and QuestDetailsPanel
- ui/ for small reusable primitives such as Avatar and Badge
- views/ for full-screen feature views such as QuestBoard, MyApplications, SavedQuests, MyProfile, CompaniesView, and Leaderboard

This is the main composition layer of the application.

### lib/

The lib/ directory should hold shared application logic.

It is the correct place for:

- Zustand store definitions for client UI state
- Shared utilities and formatting helpers
- Mock data in the MVP phase
- Data access helpers and service wrappers
- Domain-specific constants

In production, lib/ should be split further into submodules such as lib/services, lib/validators, lib/auth, and lib/db if the codebase grows.

### hooks/

The hooks/ directory should contain reusable React hooks.

Use it for:

- Query hooks that combine fetching and local UI state
- Map interaction hooks
- Debounce and search helpers
- Media query and responsive behavior hooks
- Authorization-aware hooks for UI gating

Hooks should remain focused on UI behavior, not direct persistence logic.

### services/

The services/ directory should contain application business logic.

Use it for:

- Job service operations
- Company service operations
- User service operations
- Application workflow operations
- Notification creation and read-state handling
- Employer dashboard operations

Services should orchestrate validation, business rules, and database access.

### types/

The types/ directory should contain shared TypeScript contracts.

Use it for:

- Domain entity types
- API request and response types
- Filter and query parameter types
- View model types used across the frontend and backend

Shared types reduce duplication and make route contracts explicit.

### prisma/

The prisma/ directory should contain the database schema and related database assets.

Use it for:

- schema.prisma
- migrations
- seed scripts
- Prisma client initialization helpers if needed

This folder is the source of truth for relational data structure.

## 3. Application Flow

### Applicant Flow

The primary user journey should be:

Landing Page -> Login/Register -> Dashboard -> Interactive Map -> Job Details -> Apply -> Application Tracking

How this works:

1. Landing Page
   The user first sees the branded landing experience, product explanation, and entry points into authentication.

2. Login/Register
   The user authenticates and receives a session. New users are created with the core profile fields needed for discovery and applications.

3. Dashboard
   After login, the user lands on the dashboard shell with the sidebar, top navigation, and main content area.

4. Interactive Map
   The user explores a city-based illustrated map. Companies, jobs, and users appear as distinct visual markers.

5. Job Details
   Selecting a job opens the job details panel with role information, company information, requirements, and action buttons.

6. Apply
   Submitting an application creates an Application record and updates the UI immediately.

7. Application Tracking
   The user can review application status in My Applications, where the workflow should reflect server-side updates.

### Employer Flow

The employer journey should support the same architectural pattern while exposing employer-specific screens.

Expected flow:

Employer Login -> Employer Dashboard -> Company Profile -> Post Job -> Review Applications -> Update Status

How this works:

1. Employer Login
   An employer authenticates with a role-aware account.

2. Employer Dashboard
   The employer sees a business-facing dashboard rather than the applicant map-first view.

3. Company Profile
   The company profile describes the organization, logo, location, and visible jobs.

4. Post Job
   The employer creates a Job record through validated form input.

5. Review Applications
   The employer views applications per job and updates statuses such as Reviewing, Shortlisted, Interview Scheduled, Accepted, or Rejected.

6. Update Status
   Application changes are persisted to the database and reflected in applicant tracking views.

## 4. Map System

The map system is the product's primary differentiator and must remain lightweight, illustrated, and easy to understand.

### How cities are loaded

Cities should come from the database in production, with the city list containing coordinates, counts, and labels for the map.

For the MVP, city data may be mocked, but the contract should still match the production model:

- id
- name
- region
- coordinates
- counts for jobs, companies, and explorers

The map component should render city labels from this structured data rather than hardcoded visual assumptions.

### How companies are displayed

Companies should appear as modern office building markers.

Each company marker can include:

- Company logo or initials
- Building-style iconography
- Hover or tap tooltip for the company name
- Click action to open company details or associated jobs

The visual language should remain professional and avoid fantasy iconography.

### How jobs become markers

Jobs should appear as opportunity markers linked to job records.

Marker rendering should depend on:

- Job type
- Job location
- Job count in the area
- Whether the job is featured or epic

Markers should open job detail state when selected and should support filtering by Remote, Hybrid, and On-site.

### How users appear as circular profile icons

Users should be shown as circular profile markers.

These markers should:

- Use initials or avatar images
- Stay visually distinct from job and company markers
- Be small enough to avoid dominating the map
- Fit the product direction of trusted professional profiles

### How Remote, Hybrid, and On-site jobs are represented

Job type is represented with both color and badge treatment.

Recommended mapping:

- Remote: purple family colors
- Hybrid: amber family colors
- On-site: blue family colors

This color system should be used consistently in:

- Map markers
- Filter pills
- Badges in the job detail panel
- Lists and cards across the app

## 5. Backend Architecture

### API Routes

API routes should provide stable contracts for frontend data access.

Responsibilities:

- Read collection data for jobs, companies, and users
- Create new jobs and applications
- Patch application status updates
- Return sanitized response payloads for the frontend

Routes should not contain business rules directly.

### Service Layer

The service layer should contain the actual application logic.

Examples:

- Fetch jobs by city, type, or search term
- Create an application if the user has not already applied
- Update application status while preserving allowed transitions
- Create notifications when an application changes state
- Attach company and user context to job listings

### Validation Layer

Every inbound request should be validated before business logic runs.

Use validation to enforce:

- Required fields
- Expected types
- Allowed enums for job types and application statuses
- Safe string lengths
- Pagination and filter boundaries

Validation should exist at the API boundary, not inside React components.

### Database Layer

The database layer should be the only layer that talks to Prisma directly.

It should be responsible for:

- Prisma queries
- Transactions when multiple records must be updated together
- Referential integrity assumptions
- Seeding and migrations

### Authentication Layer

The authentication layer should control session identity and role-based access.

Responsibilities:

- Login and logout flows
- Session creation and session verification
- Role checks for employer-only actions
- User identity propagation into services and route handlers

## 6. Database Relationships

### User

A User can:

- Have many Applications
- Have many SavedJobs
- Have many Notifications
- Optionally belong to one Company as owner or employee

### Company

A Company:

- Belongs to one owner User
- Has many Jobs
- Can have employees
- Is represented on the map as a building marker

### Job

A Job:

- Belongs to one Company
- Has many Applications
- Can be saved by many Users through SavedJob entries
- Is rendered as a marker and listed in boards and panels

### Application

An Application:

- Belongs to one User
- Belongs to one Job
- Tracks application workflow status over time

### SavedJob

A SavedJob:

- Links one User to one Job
- Exists to support bookmarks and revisit flows

### Notification

A Notification:

- Belongs to one User
- Communicates application updates, new jobs, system events, or reward events

## 7. Folder Structure

This is the recommended production-ready structure:

```text
app/
	(marketing)/
		page.tsx
	(auth)/
		login/
			page.tsx
		register/
			page.tsx
	(dashboard)/
		layout.tsx
		page.tsx
		jobs/
			page.tsx
		companies/
			page.tsx
		profile/
			page.tsx
		applications/
			page.tsx
	api/
		jobs/
			route.ts
		companies/
			route.ts
		users/
			route.ts
		applications/
			route.ts
		applications/[id]/
			route.ts
	layout.tsx
	globals.css

components/
	layout/
	map/
	ui/
	views/
	forms/
	feedback/

hooks/
	useDebouncedValue.ts
	useMediaQuery.ts
	useMapInteractions.ts
	useAuth.ts

lib/
	auth/
	db/
	services/
	validators/
	utils.ts
	constants.ts
	store.ts

services/
	jobs.service.ts
	companies.service.ts
	users.service.ts
	applications.service.ts
	notifications.service.ts

types/
	api.ts
	jobs.ts
	companies.ts
	users.ts
	applications.ts
	map.ts

prisma/
	schema.prisma
	migrations/
	seed.ts

docs/
	PROJECT_CONTEXT.md
	ROADMAP.md
	DATABASE_SCHEMA.md
	UI_GUIDELINES.md
	SYSTEM_ARCHITECTURE.md
```

The current codebase is smaller than this target structure, but this is the organization the project should grow into.

## 8. State Management

### What should be stored in Zustand

Zustand should store ephemeral, UI-driven state that does not need to be persisted to the server immediately.

Good candidates:

- Active tab or page section
- Selected job
- Selected region or city filter
- Map zoom and map interaction state
- Open or closed UI panels
- Notification drawer state
- Temporary sort and filter state
- Locally optimistic UI state while waiting for server confirmation

### What should come directly from the database

Data that represents business truth should come from the database.

Examples:

- Users
- Companies
- Jobs
- Applications
- SavedJobs
- Notifications
- City and region reference records

As a rule, if losing browser state should not lose the data, it belongs in the database, not Zustand.

## 9. Performance Strategy

### Lazy loading

Use lazy loading for screens and heavy interactive modules that are not needed on first paint.

Examples:

- Secondary dashboard views
- Rich profile panels
- Large map overlays
- Non-critical employer views

### SVG map rendering

The map should rely on lightweight SVG or vector-style rendering where possible.

This keeps the map crisp at multiple sizes and reduces image weight.

### Image optimization

Use optimized images for:

- Company logos
- Avatars
- Hero and marketing imagery

Prefer responsive image sizes and avoid loading large raster assets for icons or map markers.

### Dynamic imports

Dynamic import large client-only components that do not need to block the initial view.

This is useful for:

- Optional panels
- Analytics views
- Heavy forms
- Employer tools

### Route splitting

Split the app by route so each major view only loads what it needs.

This keeps the dashboard responsive and reduces unnecessary bundle size.

### Query caching

Use caching for server data and repeated list queries.

Cache should be used for:

- Jobs
- Companies
- User profile data
- City lists
- Search and filter results where appropriate

The cache should be invalidated on writes such as application submission or job creation.

## 10. Security

### Authentication

All protected operations should require a valid session.

Examples:

- Applying to a job
- Saving a job
- Posting a job
- Updating application status
- Editing company data

### Authorization

Access must be role-aware.

Examples:

- Applicants can apply and save jobs
- Employers can manage their own company and jobs
- Users can only edit their own profile data
- Application status changes should only be allowed by authorized users

### Input validation

Validate all external input at the API boundary.

This includes:

- Form submissions
- Route parameters
- Query strings
- Search filters
- Uploaded content references

### SQL injection protection

Use Prisma parameterization and avoid string-built queries.

Do not concatenate untrusted input into raw SQL unless it is fully sanitized and unavoidable.

### XSS protection

Sanitize user-generated content before rendering.

Avoid rendering arbitrary HTML unless it has been cleaned and explicitly allowed.

### Rate limiting

Apply rate limits to sensitive endpoints such as:

- Login
- Register
- Job posting
- Application submission
- Search-heavy endpoints if needed

Rate limiting helps prevent abuse and protects backend resources.

## 11. Scalability

JobHireGround should scale geographically without changing the overall architecture.

### Bukidnon

The initial deployment can focus on a single-region dataset, illustrated city map, and limited company inventory.

### Philippines

The same model expands by adding more regions, cities, companies, and jobs.

### Southeast Asia

The architecture stays stable as new countries and regional clusters are added.

### Worldwide

Global expansion only requires more geographic records, localized content, and query scaling. The core layers remain the same:

- App Router frontend
- Component-based UI
- Service and validation layer
- Prisma-backed PostgreSQL data access

The map may become multi-region, but the application structure should not change.

## 12. Development Guidelines

Future contributors and AI coding agents should follow these rules:

- Preserve the existing product identity: professional SaaS with a map-first job discovery experience.
- Do not replace the illustrated map with a generic GPS or gaming map.
- Keep the UI consistent with the reference image and UI guidelines.
- Prefer small, composable components over large monolithic views.
- Keep transient UI state in Zustand and durable business data in the database.
- Put business rules in services, not in React components.
- Validate all inbound API data.
- Use typed contracts for routes and service boundaries.
- Do not introduce features that the roadmap explicitly says to avoid.
- Optimize for fast initial load and low-end device performance.
- When adding new models or screens, update the docs and shared types at the same time.
- Keep map markers visually distinct and readable at all supported screen sizes.
- Prefer server-driven data for persisted entities and client state only for interaction state.

## Closing Principle

The architecture should support a trusted hiring platform that feels modern, fast, and visually distinct. The map experience is a product feature, not decoration. Every layer should reinforce that goal while keeping the system maintainable for years.
