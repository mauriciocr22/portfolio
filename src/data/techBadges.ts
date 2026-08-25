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
];
