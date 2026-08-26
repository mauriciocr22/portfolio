import { IconType } from "react-icons";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiGit,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiCsharp,
  SiAnthropic,
} from "react-icons/si";

export interface TechBadge {
  name: string;
  icon: IconType;
}

export const TECH_BADGES: TechBadge[] = [
  { name: "React", icon: SiReact },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Git", icon: SiGit },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Prisma", icon: SiPrisma },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "C#", icon: SiCsharp },
  // No distinct "Claude" mark in Simple Icons — Anthropic's is the closest
  // available brand icon for it.
  { name: "Claude", icon: SiAnthropic },
];
