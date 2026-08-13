import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <section
      id="portfolio"
      className="w-full flex flex-col items-center px-7 dark:bg-[#222222] -mb-[1px]"
    >
      <h2 className="text-3xl text-slate-600 font-semibold mb-6 border-b-2 font-canada border-slate-600 dark:text-slate-200 dark:border-slate-200">
        {t("navProjects")}
      </h2>
      <div>
        {projects.map((project) => (
          <div
            key={project.slug}
            className="mb-4 w-full h-full iphone:h-24 flex space-between border border-gray-500 rounded-md dark:text-slate-200"
          >
            <div className="w-9/12 p-3">
              <h3 className="font-medium text-lg font-canada mb-1 duration-[0s]">
                {project.title}
              </h3>
              <p className="font-canada leading-tight duration-[0s]">
                {t(`projects.${project.slug}.description`)}
              </p>
            </div>
            <div className="w-3/12 flex flex-col">
              {project.liveUrl ? (
                <>
                  <a
                    href={project.liveUrl}
                    className="h-1/2 w-full rounded-tr-[4px] text-white font-medium text-lg bg-[#169444] flex items-center justify-center md:hover:bg-green-700 transition-colors duration-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projectsCta")}
                  </a>
                  <a
                    href={project.githubUrl}
                    className="h-1/2 w-full rounded-br-[4px] border-t border-white/20 text-white font-medium text-lg bg-[#169444] flex items-center justify-center md:hover:bg-green-700 transition-colors duration-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("projectsGithubCta")}
                  </a>
                </>
              ) : (
                <a
                  href={project.githubUrl}
                  className="h-full w-full projectsButton text-white font-medium text-lg bg-[#169444] flex items-center justify-center md:hover:bg-green-700 transition-colors duration-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("projectsCta")}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
