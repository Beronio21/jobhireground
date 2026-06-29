# JobHireGround Database Schema

## User

Fields:

- id
- firstName
- lastName
- username
- email
- passwordHash
- profileImage
- headline
- bio
- phone
- country
- region
- city
- jobTitle
- experienceLevel
- skills
- resumeUrl
- portfolioUrl
- linkedinUrl
- isEmployer
- isVerified
- points
- level
- lastActiveAt
- createdAt
- updatedAt

Relationships:

- applications
- savedJobs
- notifications
- company (optional)

---

## Company

Fields:

- id
- ownerId
- name
- logo
- coverImage
- description
- industry
- companySize
- website
- email
- phone
- country
- region
- city
- address
- latitude
- longitude
- verified
- createdAt
- updatedAt

Relationships:

- owner
- jobs
- employees

---

## Job

Fields:

- id
- companyId
- title
- description
- employmentType
- jobType
- experienceLevel
- salaryMin
- salaryMax
- currency
- country
- region
- city
- latitude
- longitude
- isRemote
- isHybrid
- vacancies
- requirements
- responsibilities
- benefits
- applicationDeadline
- status
- createdAt
- updatedAt

Employment Types:

- Full-time
- Part-time
- Contract
- Internship
- Freelance

Job Types:

- Remote
- Hybrid
- On-site

Status:

- Draft
- Open
- Closed
- Filled

Relationships:

- company
- applications
- savedByUsers

---

## Application

Fields:

- id
- userId
- jobId
- resumeVersion
- coverLetter
- status
- notes
- interviewDate
- appliedAt
- updatedAt

Status:

- Pending
- Reviewing
- Shortlisted
- Interview Scheduled
- Interviewed
- Accepted
- Rejected
- Withdrawn

Relationships:

- user
- job

---

## SavedJob

Fields:

- id
- userId
- jobId
- createdAt

Relationships:

- user
- job

---

## Notification

Fields:

- id
- userId
- title
- message
- type
- isRead
- createdAt

Types:

- Application Update
- New Job
- Company Message
- System
- Reward

Relationships:

- user

---

## Country

Fields:

- id
- name
- code
- createdAt

Relationships:

- regions

---

## Region

Fields:

- id
- countryId
- name
- createdAt

Relationships:

- country
- cities

---

## City

Fields:

- id
- regionId
- name
- latitude
- longitude
- createdAt

Relationships:

- region
- companies
- users
- jobs

---

## Achievement (Future)

Fields:

- id
- name
- description
- icon
- pointsRequired

Relationships:

- users

---

## UserAchievement (Future)

Fields:

- id
- userId
- achievementId
- unlockedAt

Relationships:

- user
- achievement

---

# Entity Relationships

User

- Has many Applications
- Has many Saved Jobs
- Has many Notifications
- May own one Company

Company

- Owned by one User
- Has many Jobs

Job

- Belongs to one Company
- Has many Applications
- Can be saved by many Users

Application

- Belongs to one User
- Belongs to one Job

Country

- Has many Regions

Region

- Belongs to one Country
- Has many Cities

City

- Belongs to one Region
- Has many Users
- Has many Companies
- Has many Jobs
