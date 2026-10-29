export type CareerRole = {
  slug: string;
  title: string;
  team: string;
  type: string;
  location: string;
  experience: string;
  salary: string;
  summary: string;
  skills: string[];
  responsibilities: string[];
};

export const careerRoles: CareerRole[] = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    team: "Product Engineering",
    type: "Full-time",
    location: "Noida / Hybrid",
    experience: "1–3 years",
    salary: "₹6–12 LPA",
    summary:
      "Build fast, accessible interfaces in React and Next.js for business websites, dashboards, and customer portals.",
    skills: [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive layout",
      "Accessibility",
      "Core Web Vitals",
    ],
    responsibilities: [
      "Turn Figma screens into production components.",
      "Connect interfaces to REST APIs and handle real edge cases.",
      "Keep pages fast on mid-range Android devices.",
      "Review your own work across 390, 768, and 1440 pixels.",
      "Work with backend developers on contracts and states.",
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    team: "Platform Engineering",
    type: "Full-time",
    location: "Noida / Hybrid",
    experience: "2–4 years",
    salary: "₹8–16 LPA",
    summary:
      "Design APIs, data models, auth, and integrations that keep web and mobile products reliable as they grow.",
    skills: [
      "Node.js",
      "TypeScript",
      "MongoDB / PostgreSQL",
      "REST APIs",
      "Authentication",
      "Queues & cron",
    ],
    responsibilities: [
      "Design schemas that match the product's real workflow.",
      "Build APIs with validation, permissions, and sensible errors.",
      "Integrate payments, email, WhatsApp, and internal systems.",
      "Write migrations, background jobs, and operational scripts.",
      "Debug production issues without guessing.",
    ],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    team: "Product Engineering",
    type: "Full-time",
    location: "Noida / Hybrid",
    experience: "2–5 years",
    salary: "₹10–20 LPA",
    summary:
      "Own a feature from database to interface, with enough product judgement to spot the gaps in a brief.",
    skills: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB / PostgreSQL",
      "API design",
      "Product thinking",
    ],
    responsibilities: [
      "Ship end-to-end features across web and admin surfaces.",
      "Ask the product questions that prevent rework.",
      "Keep code shared, documented, and easy to change.",
      "Review pull requests and raise the engineering bar.",
      "Work directly with clients when a decision needs context.",
    ],
  },
  {
    slug: "app-developer",
    title: "App Developer",
    team: "Mobile Engineering",
    type: "Full-time",
    location: "Noida / Hybrid",
    experience: "1–4 years",
    salary: "₹8–16 LPA",
    summary:
      "Build React Native apps for customers and field teams, including the offline and notification flows that make them useful.",
    skills: [
      "React Native",
      "Expo",
      "TypeScript",
      "Offline sync",
      "Push notifications",
      "Store releases",
    ],
    responsibilities: [
      "Build and maintain iOS and Android apps from one codebase.",
      "Handle offline storage, sync, and conflict cases properly.",
      "Test on low-end Android hardware, not only a simulator.",
      "Prepare builds, store assets, and release notes.",
      "Work with backend on mobile-specific API needs.",
    ],
  },
];

export const careerPositions = careerRoles.map((role) => role.title);
