import { IconType } from "react-icons";
import { FiCode, FiLayers, FiDatabase, FiTool } from "react-icons/fi";
import { TbBrandReactNative } from "react-icons/tb";
// Java and Styled Components pull from Font Awesome instead of Simple Icons:
// SiOpenjdk / SiStyledcomponents are abstract marks that read as noise at
// row scale, so a recognisable metaphor glyph works better here (the Java
// coffee cup; a paint brush for styling). Both are solid fills, so they sit
// consistently next to the Simple Icons.
import { FaJava, FaPaintBrush } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiCsharp,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiSpringboot,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiRailway,
  SiGit,
  SiAnthropic,
} from "react-icons/si";

export interface Technology {
  name: string;
  // i18n key stem — the row's description line lives in the locale files at
  // "techStack.technologies.<slug>.description", so EN/PT copy follows the
  // same mechanism as everything else (see projects.ts for the pattern).
  slug: string;
  // The technology's own brand glyph, rendered in currentColor so it stays
  // monochrome. React Native shares React's atom (no distinct mark exists).
  icon: IconType;
}

export interface TechCategory {
  name: string;
  // i18n key stem — the modal's intro line lives at
  // "techStack.categories.<slug>.intro" in the locale files.
  slug: string;
  // One representative icon per category (from react-icons/fi) — used on the
  // Tech Stack card. The modal list uses each technology's own icon instead.
  icon: IconType;
  technologies: Technology[];
}

export const TECH_STACK: TechCategory[] = [
  {
    name: "Languages",
    slug: "languages",
    icon: FiCode,
    technologies: [
      { name: "JavaScript", slug: "javascript", icon: SiJavascript },
      { name: "TypeScript", slug: "typescript", icon: SiTypescript },
      { name: "Java", slug: "java", icon: FaJava },
      { name: "C#", slug: "csharp", icon: SiCsharp },
      { name: "C++", slug: "cpp", icon: SiCplusplus },
    ],
  },
  {
    name: "Frameworks & Libs",
    slug: "frameworks",
    icon: FiLayers,
    technologies: [
      { name: "React", slug: "react", icon: SiReact },
      { name: "React Native", slug: "react-native", icon: TbBrandReactNative },
      { name: "Next.js", slug: "nextjs", icon: SiNextdotjs },
      { name: "Node.js", slug: "nodejs", icon: SiNodedotjs },
      { name: "TailwindCSS", slug: "tailwindcss", icon: SiTailwindcss },
      { name: "Styled Components", slug: "styled-components", icon: FaPaintBrush },
      { name: "Spring Boot", slug: "spring-boot", icon: SiSpringboot },
    ],
  },
  {
    name: "Databases & ORM",
    slug: "databases",
    icon: FiDatabase,
    technologies: [
      { name: "MongoDB", slug: "mongodb", icon: SiMongodb },
      { name: "PostgreSQL", slug: "postgresql", icon: SiPostgresql },
      { name: "Prisma", slug: "prisma", icon: SiPrisma },
    ],
  },
  {
    name: "Tools & DevOps",
    slug: "tools",
    icon: FiTool,
    technologies: [
      { name: "Docker", slug: "docker", icon: SiDocker },
      { name: "Railway", slug: "railway", icon: SiRailway },
      { name: "Git", slug: "git", icon: SiGit },
      { name: "Claude", slug: "claude", icon: SiAnthropic },
    ],
  },
];
