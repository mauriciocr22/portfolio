import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "../data/projects";
import ProjectsCarousel from "./ProjectsCarousel";
import SectionHeading from "./SectionHeading";

// Redesign_Brief.md §7 — project cards are solid content, not glass: opaque
// surface, no backdrop-filter. They still take the shared --glass-radius
// corner and the system's one elevation shadow (§5 "Elevation without
// color"), escalating to --shadow-hover on hover per §6.
const CARD =
  "group flex flex-col overflow-hidden rounded-glass border border-subtle bg-surface-solid shadow-glass " +
  "transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-hover " +
  "motion-reduce:transition-none";

const FOOTER_LINK =
  "flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary rounded-glass";

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <section
      id="portfolio"
      className="w-full flex flex-col items-center px-canvas-margin-mobile py-16 md:px-canvas-margin-desktop"
    >
      <SectionHeading
        title={t("navProjects")}
        subtitle={t("projectsSubtitle")}
      />

      {/* Below 768px: horizontal scroll-snap coverflow row (ProjectsCarousel).
          At 768px and up: the grid below, unchanged. */}
      <ProjectsCarousel projects={projects} />

      <div className="hidden w-full max-w-[1000px] gap-panel-gap md:grid md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className={CARD}>
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={project.image}
                alt=""
                className="h-full w-full object-cover grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0 motion-reduce:transition-none"
              />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-canada text-lg font-medium text-text-primary">
                {project.title}
              </h3>
              <p className="mt-1 line-clamp-6 min-h-[8.25em] font-canada text-sm leading-snug text-text-secondary md:line-clamp-4 md:min-h-[5.5em]">
                {t(`projects.${project.slug}.description`)}
              </p>

              <ul className="mt-3 flex flex-nowrap items-start gap-1.5 overflow-x-auto">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="shrink-0 rounded-full border border-subtle bg-subtle px-2.5 py-0.5 text-xs text-text-secondary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_LINK}
                >
                  <FaGithub size={16} />
                  {t("projectsGithubCta")}
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={FOOTER_LINK}
                  >
                    <FiExternalLink size={16} />
                    {t("projectsLiveCta")}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
