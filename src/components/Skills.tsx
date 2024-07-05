import SkillsCard from "./SkillsCard";
import { FaGitAlt } from "react-icons/fa";
import {
  RiNodejsFill,
  RiTailwindCssFill,
  RiHtml5Fill,
  RiCss3Fill,
  RiReactjsFill,
} from "react-icons/ri";
import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoMongodb,
} from "react-icons/bi";

export default function Skills() {
  return (
    <section className="w-full pb-12 pt-6 px-2 flex flex-col items-center">
      <h2 className="text-3xl text-slate-600 font-semibold mb-6 border-b-2 font-canada border-slate-600">
        Skills
      </h2>
      <div className="grid w-full grid-cols-3 gap-y-4 place-items-center">
        <SkillsCard icon={RiHtml5Fill} skillName="HTML5" />
        <SkillsCard icon={RiCss3Fill} skillName="CSS3" />
        <SkillsCard
          icon={BiLogoJavascript}
          iconStyle="rounded-full"
          skillName="Javascript"
        />
        <SkillsCard icon={BiLogoTypescript} skillName="Typescript" />
        <SkillsCard icon={RiNodejsFill} skillName="NodeJS" />
        <SkillsCard icon={RiTailwindCssFill} skillName="TailwindCSS" />
        <SkillsCard icon={RiReactjsFill} skillName="ReactJS" />
        <SkillsCard icon={BiLogoMongodb} skillName="MongoDB" />
        <SkillsCard icon={FaGitAlt} skillName="Git" />
      </div>
    </section>
  );
}
