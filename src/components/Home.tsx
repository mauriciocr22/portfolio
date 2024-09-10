import ScrollArrow from "./ScrollArrow";
import { useTranslation } from "react-i18next";

interface HomeProps {
  darkMode: boolean;
}

export default function Home({ darkMode }: HomeProps) {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="flex flex-col w-full h-full items-center justify-center px-8"
    >
      <div
        className={`absolute inset-0 -z-40 transition-opacity duration-200 pointer-events-none bg-gradient-to-r from-white to-black/20 ${
          darkMode ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`absolute inset-0 -z-40 transition-opacity duration-200 pointer-events-none bg-gradient-to-r from-[#0f0f0f] to-[#1b1b1b] ${
          darkMode ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <span className="font-canada text-lg font-semibold md:text-xl dark:text-slate-200">
        {t("headerTitle")}
      </span>
      <h1 className="font-canada font-semibold text-4xl md:text-[42px] md:leading-tight bg-clip-text text-center text-transparent bg-gradient-to-r from-green-500 to-green-700">
        Maurício Rodrigues
      </h1>
      <p className="text-slate-700 font-semibold text-center text-lg mb-4 md:text-xl dark:text-slate-300">
        {t("headerDescription")}
      </p>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/mauriciocr22/"
        className=" bg-green-600 dark:bg-green-700 text-white text-semibold px-4 py-3 rounded-sm md:hover:bg-green-700 md:dark:hover:bg-green-800 transition-colors duration-100 md:text-lg shadow-md"
      >
        {t("headerCta")}
      </a>
      <ScrollArrow />
    </section>
  );
}
