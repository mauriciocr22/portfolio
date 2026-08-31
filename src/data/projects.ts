export interface Project {
  slug: string;
  title: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
}

// Descriptions live in the i18n locale files (src/i18n/locales/*/translation.json,
// under "projects.<slug>.description") so EN/PT copy follows the same
// translation mechanism as the rest of the app instead of a second one here.
export const projects: Project[] = [
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    image: "/projects/habit-tracker.png",
    techStack: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://habit-tracker-app-zeta-six.vercel.app/",
    githubUrl: "https://github.com/mauriciocr22/habit-tracker",
  },
  {
    slug: "architetando",
    title: "Architetando",
    image: "/projects/architetando.png",
    techStack: ["React", "TailwindCSS", "TypeScript"],
    liveUrl: "https://architetando.vercel.app/",
    githubUrl: "https://github.com/mauriciocr22/architetando",
  },
  {
    slug: "product-radar",
    title: "Product Radar",
    image: "/projects/product-radar.png",
    techStack: ["React 19", "TailwindCSS", "TypeScript", "React Router DOM"],
    githubUrl: "https://github.com/mauriciocr22/productradar",
  },
  {
    slug: "esc-site",
    title: "ESC Site",
    image: "/projects/esc-site.png",
    techStack: ["React", "TailwindCSS", "TypeScript"],
    liveUrl: "https://escoficial.vercel.app/",
    githubUrl: "https://github.com/mauriciocr22/esc-site",
  },
];
