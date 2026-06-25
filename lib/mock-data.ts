export type JobType = "Remote" | "Hybrid" | "On-site";
export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface User {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    city: string;
    level: number;
    points: number;
    xp: number;
    maxXp: number;
}

export interface Company {
    id: string;
    name: string;
    description: string;
    city: string;
    logo: string;
    industry: string;
    size: string;
    website: string;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    salaryMin: number;
    salaryMax: number;
    type: JobType;
    city: string;
    companyId: string;
    requirements: string[];
    postedAt: string;
    isEpic?: boolean;
}

export interface Application {
    id: string;
    userId: string;
    jobId: string;
    status: ApplicationStatus;
    appliedAt: string;
}

export interface CityData {
    id: string;
    name: string;
    jobCount: number;
    companyCount: number;
    explorerCount: number;
    x: number;
    y: number;
}

// ─── MOCK USERS ─────────────────────────────────────────────────────────────
export const currentUser: User = {
    id: "user-1",
    name: "Bebot Bengil",
    email: "bebot@example.com",
    profileImage: "",
    city: "Valencia City",
    level: 7,
    points: 250,
    xp: 620,
    maxXp: 1000,
};

export const mockUsers: User[] = [
    currentUser,
    {
        id: "user-2",
        name: "Maria Santos",
        email: "maria@example.com",
        profileImage: "",
        city: "Malaybalay City",
        level: 5,
        points: 180,
        xp: 420,
        maxXp: 800,
    },
    {
        id: "user-3",
        name: "Juan Dela Cruz",
        email: "juan@example.com",
        profileImage: "",
        city: "Maramag",
        level: 3,
        points: 90,
        xp: 210,
        maxXp: 500,
    },
    {
        id: "user-4",
        name: "Ana Reyes",
        email: "ana@example.com",
        profileImage: "",
        city: "Don Carlos",
        level: 9,
        points: 450,
        xp: 880,
        maxXp: 1200,
    },
];

// ─── MOCK COMPANIES ──────────────────────────────────────────────────────────
export const mockCompanies: Company[] = [
    {
        id: "comp-1",
        name: "TechNova Solutions",
        description: "Leading IT solutions provider in Mindanao, specializing in enterprise software and cloud services.",
        city: "Valencia City",
        logo: "TN",
        industry: "Information Technology",
        size: "51-200 employees",
        website: "technova.ph",
    },
    {
        id: "comp-2",
        name: "MindaAgri Corp",
        description: "Agricultural technology company transforming farming in Bukidnon through innovation.",
        city: "Malaybalay City",
        logo: "MA",
        industry: "Agriculture Technology",
        size: "201-500 employees",
        website: "mindaagri.ph",
    },
    {
        id: "comp-3",
        name: "BukTrade Hub",
        description: "E-commerce and logistics platform connecting Bukidnon businesses to global markets.",
        city: "Maramag",
        logo: "BT",
        industry: "E-Commerce",
        size: "11-50 employees",
        website: "buktrade.ph",
    },
    {
        id: "comp-4",
        name: "GreenPower Bukidnon",
        description: "Renewable energy solutions for homes and businesses across Mindanao.",
        city: "Don Carlos",
        logo: "GP",
        industry: "Energy",
        size: "101-200 employees",
        website: "greenpower.ph",
    },
    {
        id: "comp-5",
        name: "HealthFirst Quezon",
        description: "Modern healthcare services and telemedicine platform serving Northern Bukidnon.",
        city: "Quezon",
        logo: "HF",
        industry: "Healthcare",
        size: "51-100 employees",
        website: "healthfirst.ph",
    },
    {
        id: "comp-6",
        name: "EduBridge Academy",
        description: "Online and hybrid education platform focused on vocational and tech skills.",
        city: "Malaybalay City",
        logo: "EB",
        industry: "Education",
        size: "21-50 employees",
        website: "edubridge.ph",
    },
    {
        id: "comp-7",
        name: "CedarBuild Construction",
        description: "Infrastructure and construction company specializing in commercial and residential projects.",
        city: "Valencia City",
        logo: "CB",
        industry: "Construction",
        size: "201-500 employees",
        website: "cedarbuild.ph",
    },
    {
        id: "comp-8",
        name: "DataMind Analytics",
        description: "Data analytics and business intelligence consultancy for mid-to-large enterprises.",
        city: "Malaybalay City",
        logo: "DM",
        industry: "Data & Analytics",
        size: "11-30 employees",
        website: "datamind.ph",
    },
];

// ─── MOCK JOBS ────────────────────────────────────────────────────────────────
export const mockJobs: Job[] = [
    {
        id: "job-1",
        title: "IT Support Specialist",
        description: "We are looking for a skilled IT Support Specialist to join our growing team at TechNova Solutions. You will provide technical assistance to our clients and internal staff, troubleshoot hardware/software issues, and maintain our network infrastructure.",
        salaryMin: 25000,
        salaryMax: 35000,
        type: "Hybrid",
        city: "Valencia City",
        companyId: "comp-1",
        requirements: [
            "At least 1-2 years experience in IT Support",
            "Knowledge in troubleshooting",
            "Basic networking skills",
            "Good communication",
        ],
        postedAt: "2026-06-20",
        isEpic: true,
    },
    {
        id: "job-2",
        title: "Full Stack Developer",
        description: "Join our dynamic team to build and maintain web applications using modern JavaScript frameworks. Work on exciting products that impact thousands of users across Mindanao.",
        salaryMin: 40000,
        salaryMax: 65000,
        type: "Remote",
        city: "Valencia City",
        companyId: "comp-1",
        requirements: [
            "3+ years experience in React and Node.js",
            "Experience with PostgreSQL or MySQL",
            "Understanding of REST APIs",
            "Version control with Git",
        ],
        postedAt: "2026-06-22",
        isEpic: true,
    },
    {
        id: "job-3",
        title: "Agricultural Data Analyst",
        description: "Analyze crop yield data, weather patterns, and market trends to help farmers make better decisions through our precision agriculture platform.",
        salaryMin: 30000,
        salaryMax: 45000,
        type: "On-site",
        city: "Malaybalay City",
        companyId: "comp-2",
        requirements: [
            "Degree in Agriculture, Statistics, or related field",
            "Proficiency in Excel and data visualization tools",
            "Knowledge of agricultural practices in Mindanao",
            "Strong analytical skills",
        ],
        postedAt: "2026-06-18",
    },
    {
        id: "job-4",
        title: "E-Commerce Manager",
        description: "Lead our e-commerce operations, manage product listings, coordinate with sellers, and drive sales growth on our platform connecting Bukidnon products to national markets.",
        salaryMin: 28000,
        salaryMax: 40000,
        type: "Hybrid",
        city: "Maramag",
        companyId: "comp-3",
        requirements: [
            "2+ years in e-commerce management",
            "Experience with Shopee, Lazada, or similar platforms",
            "Marketing and SEO knowledge",
            "Strong organizational skills",
        ],
        postedAt: "2026-06-21",
    },
    {
        id: "job-5",
        title: "Solar Installation Technician",
        description: "Install and maintain solar panel systems for residential and commercial clients across Bukidnon. Travel may be required to project sites.",
        salaryMin: 20000,
        salaryMax: 30000,
        type: "On-site",
        city: "Don Carlos",
        companyId: "comp-4",
        requirements: [
            "Technical/Vocational training in Electrical or related field",
            "Willingness to work at heights and outdoor environments",
            "Basic electrical knowledge",
            "Physical fitness required",
        ],
        postedAt: "2026-06-19",
    },
    {
        id: "job-6",
        title: "Registered Nurse",
        description: "Provide quality patient care in our modern healthcare facility. Work with a team of dedicated medical professionals to serve the Quezon community and surrounding areas.",
        salaryMin: 22000,
        salaryMax: 32000,
        type: "On-site",
        city: "Quezon",
        companyId: "comp-5",
        requirements: [
            "Licensed Registered Nurse (PRC)",
            "BLS/ACLS certification preferred",
            "Strong patient care skills",
            "Willingness to work shifting schedules",
        ],
        postedAt: "2026-06-23",
    },
    {
        id: "job-7",
        title: "Online English Tutor",
        description: "Teach English language skills to students of all ages through our online platform. Flexible scheduling with competitive rates per hour.",
        salaryMin: 15000,
        salaryMax: 25000,
        type: "Remote",
        city: "Malaybalay City",
        companyId: "comp-6",
        requirements: [
            "Fluent in English (written and spoken)",
            "Teaching experience is a plus",
            "Reliable internet connection",
            "Patient and engaging personality",
        ],
        postedAt: "2026-06-24",
    },
    {
        id: "job-8",
        title: "Civil Engineer",
        description: "Lead and supervise construction projects ranging from residential buildings to commercial infrastructure across Bukidnon. Ensure quality, safety, and on-time delivery.",
        salaryMin: 45000,
        salaryMax: 70000,
        type: "On-site",
        city: "Valencia City",
        companyId: "comp-7",
        requirements: [
            "Licensed Civil Engineer (PRC)",
            "3+ years in construction management",
            "AutoCAD and project management skills",
            "Excellent leadership ability",
        ],
        postedAt: "2026-06-17",
        isEpic: true,
    },
    {
        id: "job-9",
        title: "Data Engineer",
        description: "Build and maintain data pipelines, ETL processes, and analytics infrastructure to support business intelligence initiatives for our enterprise clients.",
        salaryMin: 50000,
        salaryMax: 80000,
        type: "Remote",
        city: "Malaybalay City",
        companyId: "comp-8",
        requirements: [
            "3+ years experience in data engineering",
            "Proficiency in Python, SQL, and Spark",
            "Experience with cloud platforms (AWS/GCP)",
            "Strong problem-solving skills",
        ],
        postedAt: "2026-06-20",
        isEpic: true,
    },
    {
        id: "job-10",
        title: "Logistics Coordinator",
        description: "Coordinate shipment of Bukidnon agricultural products to major cities. Manage supplier relationships and ensure timely delivery across supply chain operations.",
        salaryMin: 18000,
        salaryMax: 26000,
        type: "Hybrid",
        city: "Don Carlos",
        companyId: "comp-4",
        requirements: [
            "Experience in logistics or supply chain",
            "Knowledge of local trucking/shipping routes",
            "Good negotiation skills",
            "Proficiency in MS Office",
        ],
        postedAt: "2026-06-22",
    },
    {
        id: "job-11",
        title: "UI/UX Designer",
        description: "Design intuitive and beautiful user interfaces for our web and mobile products. Work closely with developers and product managers to create exceptional user experiences.",
        salaryMin: 35000,
        salaryMax: 55000,
        type: "Remote",
        city: "Valencia City",
        companyId: "comp-1",
        requirements: [
            "Proficiency in Figma or Adobe XD",
            "Portfolio of UI/UX projects",
            "Understanding of design systems",
            "Experience with user research",
        ],
        postedAt: "2026-06-23",
    },
    {
        id: "job-12",
        title: "Marketing Specialist",
        description: "Develop and execute marketing campaigns for our agri-tech products. Manage social media, content creation, and digital advertising to drive brand awareness.",
        salaryMin: 22000,
        salaryMax: 35000,
        type: "Hybrid",
        city: "Malaybalay City",
        companyId: "comp-2",
        requirements: [
            "2+ years in digital marketing",
            "Experience with social media management",
            "Content writing and copywriting skills",
            "Google Analytics proficiency",
        ],
        postedAt: "2026-06-21",
    },
];

// ─── MOCK APPLICATIONS ────────────────────────────────────────────────────────
export const mockApplications: Application[] = [
    {
        id: "app-1",
        userId: "user-1",
        jobId: "job-2",
        status: "pending",
        appliedAt: "2026-06-23",
    },
    {
        id: "app-2",
        userId: "user-1",
        jobId: "job-8",
        status: "reviewed",
        appliedAt: "2026-06-22",
    },
    {
        id: "app-3",
        userId: "user-1",
        jobId: "job-9",
        status: "accepted",
        appliedAt: "2026-06-20",
    },
];

// ─── CITY DATA ────────────────────────────────────────────────────────────────
export const cities: CityData[] = [
    { id: "city-1", name: "Malaybalay City", jobCount: 187, companyCount: 64, explorerCount: 1205, x: 42, y: 12 },
    { id: "city-2", name: "Valencia City",   jobCount: 348, companyCount: 127, explorerCount: 2341, x: 68, y: 28 },
    { id: "city-3", name: "Maramag",         jobCount: 64,  companyCount: 22,  explorerCount: 560,  x: 18, y: 40 },
    { id: "city-4", name: "Don Carlos",      jobCount: 95,  companyCount: 31,  explorerCount: 780,  x: 45, y: 62 },
    { id: "city-5", name: "Quezon",          jobCount: 76,  companyCount: 28,  explorerCount: 640,  x: 70, y: 60 },
];

// ─── SAVED QUESTS ─────────────────────────────────────────────────────────────
export const savedQuestIds: string[] = ["job-1", "job-9"];

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────
export const leaderboard = [
    { rank: 1, user: mockUsers[3], badge: "🥇" },
    { rank: 2, user: mockUsers[0], badge: "🥈" },
    { rank: 3, user: mockUsers[1], badge: "🥉" },
    { rank: 4, user: mockUsers[2], badge: "🏅" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function getJobById(id: string): Job | undefined {
    return mockJobs.find((j) => j.id === id);
}

export function getCompanyById(id: string): Company | undefined {
    return mockCompanies.find((c) => c.id === id);
}

export function getJobsByCity(city: string): Job[] {
    return mockJobs.filter((j) => j.city === city);
}

export function getJobsByType(type: JobType): Job[] {
    return mockJobs.filter((j) => j.type === type);
}

export function getCompanyJobs(companyId: string): Job[] {
    return mockJobs.filter((j) => j.companyId === companyId);
}

export function formatSalary(min: number, max: number): string {
    return `₱${min.toLocaleString()} - ₱${max.toLocaleString()} / month`;
}