import { IconType } from "react-icons";
import { FiCode, FiLayers, FiDatabase, FiTool } from "react-icons/fi";

export interface TechCategory {
  name: string;
  // One representative icon per category (not per technology) — the card
  // only lists technology names as text, per the Tech Stack section spec.
  icon: IconType;
  technologies: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    name: "Languages",
    icon: FiCode,
    technologies: ["JavaScript", "TypeScript", "Java", "C#", "C++"],
  },
  {
    name: "Frameworks & Libraries",
    icon: FiLayers,
    technologies: [
      "React",
      "Node.js",
      "TailwindCSS",
      "Styled Components",
      "Spring Boot",
    ],
  },
  {
    name: "Databases & ORM",
    icon: FiDatabase,
    technologies: ["MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    name: "Tools & DevOps",
    icon: FiTool,
    technologies: ["Docker", "Railway", "Git", "Claude"],
  },
];
