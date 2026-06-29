# JobHireGround

## Vision
JobHireGround is a map-based job discovery SaaS.

It is NOT Google Maps.
It is NOT Pokémon GO.

Users discover jobs through a custom illustrated world map.

## UI Direction

Reference Image:
ChatGPT Image Jun 25, 2026, 11_43_15 AM.png

Design Requirements:
- Modern SaaS
- Purple accents
- Modern office buildings
- Circular user profile icons
- Interactive map
- Fast loading
- Mobile friendly

## Core Concepts

Jobs = Opportunities
Companies = Buildings
Users = Profile circles

## Current Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Zustand
- Prisma
- PostgreSQL

## File Structure

components/
  layout/
  map/
  ui/
  views/

## Current MVP

- Landing Page
- Dashboard
- Interactive Map
- Job Details
- Company Profiles
- User Profiles

## Do Not Build Yet

- Payments
- AI Features
- Chat
- Multiplayer
- Ad Rewards

## Database Schema

### User
- id, name, email, password, profileImage, city, points, level, createdAt, updatedAt
- Relationships: applications, savedJobs

### Company
- id, name, description, logo, city, website, createdAt, updatedAt
- Relationships: jobs

### Job
- id, title, description, salaryMin, salaryMax, jobType, city, requirements, companyId, createdAt, updatedAt
- Job Types: Remote, Hybrid, On-site
- Relationships: company, applications

### Application
- id, userId, jobId, status, appliedAt
- Status: Pending, Reviewing, Interview, Accepted, Rejected
- Relationships: user, job

### SavedJob
- id, userId, jobId, createdAt
- Relationships: user, job

## Important

Always read PROJECT_CONTEXT.md before making changes.
Maintain consistency with the reference image.