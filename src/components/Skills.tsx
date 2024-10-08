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
import { useTranslation } from "react-i18next";

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="w-full pb-12 pt-6 px-2 flex flex-col items-center dark:bg-[#222222] -mb-[1px]"
    >
      <h2 className="text-3xl text-slate-600 font-semibold mb-6 border-b-2 font-canada border-slate-600 dark:text-slate-200 dark:border-slate-200">
        {t("navSkills")}
      </h2>
      <div className="grid w-full grid-cols-3 gap-y-4 place-items-center md:w-[624px]">
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
