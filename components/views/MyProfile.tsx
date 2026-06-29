"use client";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { mockApplications, getJobById, getCompanyById } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { cn, timeAgo } from "@/lib/utils";

type ToggleKey =
  | "publicProfile"
  | "showEmail"
  | "showPhone"
  | "allowRecruiterContact"
  | "twoFactorEnabled"
  | "emailNotifications"
  | "jobAlerts"
  | "applicationUpdates";

type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  course: string;
  startDate: string;
  endDate: string;
  description: string;
};

type ExperienceEntry = {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

type CertificationEntry = {
  id: string;
  certificateName: string;
  issuer: string;
  dateIssued: string;
  credentialUrl: string;
};

const profileNav = [
  { id: "personal", label: "Personal Info" },
  { id: "professional", label: "Professional Info" },
  { id: "documents", label: "Career Docs" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "preferences", label: "Job Preferences" },
  { id: "privacy", label: "Privacy" },
  { id: "account", label: "Account Settings" },
];

function SectionCard({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm scroll-mt-20">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">{children}</label>;
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400",
        className
      )}
    />
  );
}

function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all",
        className
      )}
    />
  );
}

function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400 resize-none",
        className
      )}
    />
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <div>
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 mt-0.5">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${checked ? "bg-violet-600" : "bg-gray-300"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function MyProfile() {
  const { user, applications, savedQuests } = useAppStore();
  const myApps = applications.filter((application) => application.userId === user.id);

  const [activeTab, setActiveTab] = useState<"overview" | "edit">("overview");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "requested" | "confirmed">("idle");

  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    publicProfile: true,
    showEmail: true,
    showPhone: true,
    allowRecruiterContact: true,
    twoFactorEnabled: false,
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
  });

  const [personalInfo, setPersonalInfo] = useState({
    profilePhoto: "",
    firstName: "Bebot",
    lastName: "Bengil",
    username: "bebot_bengil",
    email: user.email,
    mobileNumber: "+63 912 345 6789",
    dateOfBirth: "1998-06-14",
    gender: "Male",
    country: "Philippines",
    region: "Northern Mindanao",
    city: user.city,
    completeAddress: "Poblacion, Valencia City, Bukidnon",
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    headline: "Front-End Developer | Map-based SaaS, UI Systems, and Product Interfaces",
    aboutMe:
      "I build clean, fast, and user-friendly interfaces for modern web products. I enjoy turning complex workflows into simple product experiences and shipping polished frontend systems that feel trustworthy.",
    currentJobTitle: "Front-End Developer",
    yearsOfExperience: "5+ years",
    employmentStatus: "Open to work",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "UI Design", "Figma"],
    languages: ["English", "Cebuano", "Tagalog"],
  });

  const [careerDocuments] = useState({
    resume: {
      fileName: "Bebot_Bengil_Resume.pdf",
      fileSize: "248 KB",
      uploadedAt: "2026-06-24",
    },
    portfolioUrl: "https://portfolio.example.com/bebot",
    linkedinUrl: "https://linkedin.com/in/bebotbengil",
    githubUrl: "https://github.com/bebotbengil",
    personalWebsite: "https://bebot.dev",
  });

  const [education, setEducation] = useState<EducationEntry[]>([
    {
      id: "edu-1",
      school: "Bukidnon State University",
      degree: "Bachelor of Science",
      course: "Information Technology",
      startDate: "2018-06-01",
      endDate: "2022-04-01",
      description: "Studied software development, databases, and modern web application design.",
    },
    {
      id: "edu-2",
      school: "Valencia City National High School",
      degree: "Senior High School",
      course: "STEM",
      startDate: "2016-06-01",
      endDate: "2018-03-01",
      description: "Built a foundation in logic, mathematics, and technical problem solving.",
    },
  ]);

  const [experience, setExperience] = useState<ExperienceEntry[]>([
    {
      id: "exp-1",
      company: "TechNova Solutions",
      position: "Front-End Developer",
      employmentType: "Full-time",
      startDate: "2023-01-01",
      endDate: "Present",
      responsibilities:
        "Built product screens, improved dashboard UX, and maintained reusable frontend components for enterprise clients.",
    },
    {
      id: "exp-2",
      company: "BukTrade Hub",
      position: "UI Developer",
      employmentType: "Contract",
      startDate: "2021-06-01",
      endDate: "2022-12-01",
      responsibilities:
        "Created responsive interfaces, cleaned up design system usage, and helped ship customer-facing features faster.",
    },
  ]);

  const [certifications] = useState<CertificationEntry[]>([
    {
      id: "cert-1",
      certificateName: "Responsive Web Design",
      issuer: "freeCodeCamp",
      dateIssued: "2024-05-12",
      credentialUrl: "https://freecodecamp.org/certification/bebot",
    },
    {
      id: "cert-2",
      certificateName: "Modern React Essentials",
      issuer: "LinkedIn Learning",
      dateIssued: "2025-02-20",
      credentialUrl: "https://linkedin.com/learning/certificates/bebot",
    },
  ]);

  const [preferences, setPreferences] = useState({
    preferredJobTitle: "Senior Front-End Developer",
    preferredSalaryRange: "₱60,000 - ₱90,000",
    preferredJobType: "Remote",
    preferredEmploymentType: "Full-time",
    preferredWorkSetup: "Hybrid",
    preferredLocations: ["Valencia City", "Cagayan de Oro", "Remote Philippines"],
  });

  const profileCompletion = useMemo(() => {
    const checks = [
      personalInfo.profilePhoto,
      personalInfo.mobileNumber,
      personalInfo.completeAddress,
      professionalInfo.headline,
      professionalInfo.aboutMe,
      professionalInfo.skills.length > 0,
      careerDocuments.resume.fileName,
      careerDocuments.portfolioUrl,
      education.length > 0,
      experience.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [careerDocuments, education.length, experience.length, personalInfo, professionalInfo]);

  const suggestions = [
    { label: "Upload Resume", done: Boolean(careerDocuments.resume.fileName) },
    { label: "Add Skills", done: professionalInfo.skills.length >= 5 },
    { label: "Complete Education", done: education.length > 0 },
    { label: "Add Work Experience", done: experience.length > 0 },
    { label: "Verify Email", done: toggles.showEmail },
  ];

  const completedApplications = myApps.filter((application) => application.status === "accepted").length;

  const sectionNav = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addEducationEntry = () => {
    setEducation((current) => [
      ...current,
      {
        id: `edu-${Date.now()}`,
        school: "",
        degree: "",
        course: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const addExperienceEntry = () => {
    setExperience((current) => [
      ...current,
      {
        id: `exp-${Date.now()}`,
        company: "",
        position: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ]);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="h-28 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          <div className="px-6 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 -mt-10 mb-4">
              <div className="ring-4 ring-white rounded-full w-fit">
                <Avatar name={`${personalInfo.firstName} ${personalInfo.lastName}`} size="xl" />
              </div>
              <div className="mb-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">{personalInfo.firstName} {personalInfo.lastName}</h2>
                  <Badge variant="epic">Explorer Level {user.level}</Badge>
                  <Badge variant={toggles.publicProfile ? "remote" : "outline"}>
                    {toggles.publicProfile ? "Public Profile" : "Private Profile"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 mt-1">{personalInfo.city}, {personalInfo.region}, {personalInfo.country}</div>
                <div className="text-sm text-gray-600 mt-2 font-medium">{professionalInfo.headline}</div>
              </div>
              <div className="flex gap-2 ml-auto flex-wrap">
                <button
                  onClick={() => setActiveTab("saved")}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  View Saved Jobs
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
                >
                  View Applications
                </button>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1 w-full">
                {[
                  { label: "Level", value: user.level, icon: "⚡" },
                  { label: "Points", value: user.points, icon: "⭐" },
                  { label: "Completed", value: completedApplications, icon: "✅" },
                  { label: "Saved Jobs", value: savedQuests.length, icon: "🔖" },
                  { label: "Completion", value: `${profileCompletion}%`, icon: "📈" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-lg mb-0.5">{stat.icon}</div>
                    <div className="font-bold text-xl text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                <span>Profile Completion</span>
                <span>{profileCompletion}% complete</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-700" style={{ width: `${profileCompletion}%` }} />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestions.filter((item) => !item.done).slice(0, 5).map((item) => (
                  <span key={item.label} className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm py-2">
          {profileNav.map((item) => (
            <button
              key={item.id}
              onClick={() => sectionNav(item.id)}
              className="px-3 py-2 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(activeTab === "edit" ? "overview" : "edit")}
            className={`ml-auto px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${activeTab === "edit" ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:text-violet-700"}`}
          >
            {activeTab === "edit" ? "Viewing Details" : "Edit Fields"}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
          <div className="space-y-5">
            <SectionCard id="personal" title="Personal Information" subtitle="Basic identity and contact details.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <Avatar name={`${personalInfo.firstName} ${personalInfo.lastName}`} size="lg" />
                  <div className="flex-1 min-w-0">
                    <Label>Profile Photo</Label>
                    <div className="text-sm text-gray-600">Mock profile photo enabled. Use the edit button to swap the avatar in future versions.</div>
                  </div>
                  <button className="px-3 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                    Change Photo
                  </button>
                </div>

                {[
                  ["First Name", personalInfo.firstName],
                  ["Last Name", personalInfo.lastName],
                  ["Username", personalInfo.username],
                  ["Email Address", personalInfo.email],
                  ["Mobile Number", personalInfo.mobileNumber],
                  ["Date of Birth", personalInfo.dateOfBirth],
                  ["Gender", personalInfo.gender],
                  ["Country", personalInfo.country],
                  ["Region", personalInfo.region],
                  ["City", personalInfo.city],
                ].map(([label, value]) => (
                  <div key={label}>
                    <Label>{label}</Label>
                    {label === "Gender" ? (
                      <Select value={personalInfo.gender} onChange={(e) => setPersonalInfo((current) => ({ ...current, gender: e.target.value }))}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </Select>
                    ) : label === "Country" ? (
                      <Select value={personalInfo.country} onChange={(e) => setPersonalInfo((current) => ({ ...current, country: e.target.value }))}>
                        <option>Philippines</option>
                        <option>Malaysia</option>
                        <option>Singapore</option>
                      </Select>
                    ) : label === "Region" ? (
                      <Select value={personalInfo.region} onChange={(e) => setPersonalInfo((current) => ({ ...current, region: e.target.value }))}>
                        <option>Northern Mindanao</option>
                        <option>Davao Region</option>
                        <option>Central Visayas</option>
                      </Select>
                    ) : label === "City" ? (
                      <Input value={personalInfo.city} onChange={(e) => setPersonalInfo((current) => ({ ...current, city: e.target.value }))} />
                    ) : (
                      <Input value={value as string} onChange={(e) => setPersonalInfo((current) => ({ ...current, [label === "First Name" ? "firstName" : label === "Last Name" ? "lastName" : label === "Username" ? "username" : label === "Email Address" ? "email" : label === "Mobile Number" ? "mobileNumber" : label === "Date of Birth" ? "dateOfBirth" : "completeAddress"]: e.target.value }))} />
                    )}
                  </div>
                ))}

                <div className="md:col-span-2">
                  <Label>Complete Address</Label>
                  <Textarea rows={3} value={personalInfo.completeAddress} onChange={(e) => setPersonalInfo((current) => ({ ...current, completeAddress: e.target.value }))} />
                </div>
              </div>
            </SectionCard>

            <SectionCard id="professional" title="Professional Information" subtitle="A concise professional snapshot for recruiters.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Professional Headline</Label>
                  <Input value={professionalInfo.headline} onChange={(e) => setProfessionalInfo((current) => ({ ...current, headline: e.target.value }))} />
                </div>
                <div className="md:col-span-2">
                  <Label>About Me</Label>
                  <Textarea rows={5} value={professionalInfo.aboutMe} onChange={(e) => setProfessionalInfo((current) => ({ ...current, aboutMe: e.target.value }))} />
                </div>
                <div>
                  <Label>Current Job Title</Label>
                  <Input value={professionalInfo.currentJobTitle} onChange={(e) => setProfessionalInfo((current) => ({ ...current, currentJobTitle: e.target.value }))} />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input value={professionalInfo.yearsOfExperience} onChange={(e) => setProfessionalInfo((current) => ({ ...current, yearsOfExperience: e.target.value }))} />
                </div>
                <div>
                  <Label>Employment Status</Label>
                  <Select value={professionalInfo.employmentStatus} onChange={(e) => setProfessionalInfo((current) => ({ ...current, employmentStatus: e.target.value }))}>
                    <option>Open to work</option>
                    <option>Actively interviewing</option>
                    <option>Employed</option>
                    <option>Freelancing</option>
                  </Select>
                </div>
                <div>
                  <Label>Languages</Label>
                  <Input value={professionalInfo.languages.join(", ")} onChange={(e) => setProfessionalInfo((current) => ({ ...current, languages: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) }))} />
                </div>
                <div className="md:col-span-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {professionalInfo.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full text-sm font-medium bg-violet-50 text-violet-700 border border-violet-200">
                        {skill}
                      </span>
                    ))}
                    <button className="px-3 py-1 rounded-full text-sm font-medium border-2 border-dashed border-gray-300 text-gray-500 hover:border-violet-300 hover:text-violet-600 transition-colors">
                      + Add Skill
                    </button>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard id="documents" title="Career Documents" subtitle="Mock document storage and profile links.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">Resume Upload</div>
                      <div className="text-sm text-gray-500 mt-1">{careerDocuments.resume.fileName} • {careerDocuments.resume.fileSize}</div>
                      <div className="text-xs text-gray-400 mt-1">Uploaded {timeAgo(careerDocuments.resume.uploadedAt)}</div>
                    </div>
                    <button className="px-3 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors">
                      Replace Resume
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Portfolio URL</Label>
                  <Input value={careerDocuments.portfolioUrl} readOnly />
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input value={careerDocuments.linkedinUrl} readOnly />
                </div>
                <div>
                  <Label>GitHub URL</Label>
                  <Input value={careerDocuments.githubUrl} readOnly />
                </div>
                <div>
                  <Label>Personal Website</Label>
                  <Input value={careerDocuments.personalWebsite} readOnly />
                </div>
              </div>
            </SectionCard>

            <SectionCard id="education" title="Education" subtitle="Add multiple education entries to show your academic background.">
              <div className="space-y-4">
                {education.map((entry, index) => (
                  <div key={entry.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h4 className="font-semibold text-gray-900">Education Entry {index + 1}</h4>
                      <button className="text-sm text-red-500 hover:text-red-600">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>School</Label>
                        <Input value={entry.school} onChange={() => undefined} />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input value={entry.degree} onChange={() => undefined} />
                      </div>
                      <div>
                        <Label>Course</Label>
                        <Input value={entry.course} onChange={() => undefined} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Start Date</Label>
                          <Input value={entry.startDate} onChange={() => undefined} />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input value={entry.endDate} onChange={() => undefined} />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Textarea rows={3} value={entry.description} onChange={() => undefined} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addEducationEntry} className="px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-gray-600 hover:border-violet-300 hover:text-violet-700 transition-colors text-sm font-medium">
                  + Add Education Entry
                </button>
              </div>
            </SectionCard>

            <SectionCard id="experience" title="Work Experience" subtitle="Show your work history and responsibilities.">
              <div className="space-y-4">
                {experience.map((entry, index) => (
                  <div key={entry.id} className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h4 className="font-semibold text-gray-900">Experience Entry {index + 1}</h4>
                      <button className="text-sm text-red-500 hover:text-red-600">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company</Label>
                        <Input value={entry.company} onChange={() => undefined} />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input value={entry.position} onChange={() => undefined} />
                      </div>
                      <div>
                        <Label>Employment Type</Label>
                        <Select value={entry.employmentType} onChange={() => undefined}>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Internship</option>
                          <option>Freelance</option>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Start Date</Label>
                          <Input value={entry.startDate} onChange={() => undefined} />
                        </div>
                        <div>
                          <Label>End Date</Label>
                          <Input value={entry.endDate} onChange={() => undefined} />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Responsibilities</Label>
                        <Textarea rows={3} value={entry.responsibilities} onChange={() => undefined} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addExperienceEntry} className="px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-gray-600 hover:border-violet-300 hover:text-violet-700 transition-colors text-sm font-medium">
                  + Add Work Experience
                </button>
              </div>
            </SectionCard>

            <SectionCard id="certifications" title="Certifications" subtitle="Highlight completed courses and credentials.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50">
                    <div className="font-semibold text-gray-900">{cert.certificateName}</div>
                    <div className="text-sm text-gray-500 mt-1">{cert.issuer}</div>
                    <div className="text-xs text-gray-400 mt-1">Issued {timeAgo(cert.dateIssued)}</div>
                    <div className="text-xs text-violet-600 mt-2 break-all">{cert.credentialUrl}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard id="preferences" title="Job Preferences" subtitle="Tune what recruiters should see in your ideal job match.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Job Title</Label>
                  <Input value={preferences.preferredJobTitle} onChange={() => undefined} />
                </div>
                <div>
                  <Label>Preferred Salary Range</Label>
                  <Input value={preferences.preferredSalaryRange} onChange={() => undefined} />
                </div>
                <div>
                  <Label>Preferred Job Type</Label>
                  <Select value={preferences.preferredJobType} onChange={() => undefined}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </Select>
                </div>
                <div>
                  <Label>Preferred Employment Type</Label>
                  <Select value={preferences.preferredEmploymentType} onChange={() => undefined}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </Select>
                </div>
                <div>
                  <Label>Preferred Work Setup</Label>
                  <Select value={preferences.preferredWorkSetup} onChange={() => undefined}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </Select>
                </div>
                <div>
                  <Label>Preferred Locations</Label>
                  <div className="flex flex-wrap gap-2 min-h-11 px-1 py-1.5 border border-gray-200 rounded-xl bg-white">
                    {preferences.preferredLocations.map((location) => (
                      <span key={location} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard id="privacy" title="Privacy Settings" subtitle="Mock toggles that control how your profile appears.">
              <div className="space-y-1">
                <ToggleRow title="Public Profile" description="Allow recruiters and employers to see your profile." checked={toggles.publicProfile} onChange={(value) => setToggles((current) => ({ ...current, publicProfile: value }))} />
                <ToggleRow title="Show Email" description="Display email address on your public profile." checked={toggles.showEmail} onChange={(value) => setToggles((current) => ({ ...current, showEmail: value }))} />
                <ToggleRow title="Show Phone" description="Display mobile number on your public profile." checked={toggles.showPhone} onChange={(value) => setToggles((current) => ({ ...current, showPhone: value }))} />
                <ToggleRow title="Allow Recruiter Contact" description="Let recruiters contact you directly through the platform." checked={toggles.allowRecruiterContact} onChange={(value) => setToggles((current) => ({ ...current, allowRecruiterContact: value }))} />
              </div>
            </SectionCard>

            <SectionCard id="account" title="Account Settings" subtitle="Mock account actions and security preferences.">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Change Profile Picture</div>
                    <div className="text-sm text-gray-500 mt-1">Update your avatar used across the dashboard.</div>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors">
                    Change Picture
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-gray-200">
                    <div className="font-medium text-gray-900">Change Password</div>
                    <div className="text-sm text-gray-500 mt-1">Mock password form for future auth integration.</div>
                    <button className="mt-3 px-4 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200">
                    <div className="font-medium text-gray-900">Change Email</div>
                    <div className="text-sm text-gray-500 mt-1">Change the email linked to this profile.</div>
                    <button className="mt-3 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors">
                      Update Email
                    </button>
                  </div>
                </div>

                <ToggleRow title="Two-Factor Authentication" description="Mock security toggle for a future account security flow." checked={toggles.twoFactorEnabled} onChange={(value) => setToggles((current) => ({ ...current, twoFactorEnabled: value }))} />
                <ToggleRow title="Notification Preferences" description="Receive updates about applications, new jobs, and system events." checked={toggles.emailNotifications} onChange={(value) => setToggles((current) => ({ ...current, emailNotifications: value }))} />

                <div className="p-4 rounded-2xl border border-red-200 bg-red-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-red-700">Delete Account</div>
                      <div className="text-sm text-red-600 mt-1">Mock confirmation only. No account data will be removed.</div>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                  {showDeleteConfirm && (
                    <div className="mt-4 p-4 rounded-xl bg-white border border-red-200">
                      <div className="text-sm text-gray-700 mb-3">This action is mocked for Phase 1. Confirming will only update local state.</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setDeleteStatus("confirmed"); setShowDeleteConfirm(false); }}
                          className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                          Confirm Mock Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {deleteStatus === "confirmed" && (
                    <div className="mt-3 text-sm font-medium text-green-700">Mock delete completed. Nothing was removed.</div>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Achievements</h3>
              <div className="space-y-3">
                {[
                  { label: "Explorer Level", value: user.level, icon: "🗺️" },
                  { label: "Points", value: user.points, icon: "⭐" },
                  { label: "Completed Applications", value: completedApplications, icon: "✅" },
                  { label: "Saved Jobs", value: savedQuests.length, icon: "🔖" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <div className="text-sm font-medium text-gray-700">{item.label}</div>
                      <div className="text-lg font-black text-gray-900">{item.value}</div>
                    </div>
                    <div className="text-2xl">{item.icon}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Profile Completion</h3>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Current progress</span>
                <span>{profileCompletion}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-700" style={{ width: `${profileCompletion}%` }} />
              </div>
              <div className="mt-4 space-y-2">
                {suggestions.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <span className={item.done ? "text-green-600" : "text-gray-400"}>{item.done ? "✓" : "○"}</span>
                    <span className={item.done ? "text-gray-500 line-through" : "text-gray-700"}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Recent Applications</h3>
              {myApps.length === 0 ? (
                <p className="text-sm text-gray-400">No applications yet.</p>
              ) : (
                <div className="space-y-2">
                  {myApps.slice(0, 4).map((application) => {
                    const job = getJobById(application.jobId);
                    const company = job ? getCompanyById(job.companyId) : null;
                    return (
                      <div key={application.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                        <div className="w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                          {company?.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{job?.title}</div>
                          <div className="text-xs text-gray-400">{company?.name}</div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          application.status === "accepted" ? "bg-green-100 text-green-700" :
                          application.status === "reviewed" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
