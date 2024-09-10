import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMenu, FiSun } from "react-icons/fi";
import { FaCloudMoon, FaChevronDown } from "react-icons/fa";
import Logo from "./Logo";
import brFlag from "../assets/brasil-flag.svg";
import engFlag from "../assets/eng-flag.svg";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ toggleDarkMode, darkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { i18n, t } = useTranslation();

  const languages = [
    { name: t("english"), code: "en", flag: engFlag },
    { name: t("portuguese"), code: "ptBr", flag: brFlag },
  ];

  const currentLangFlag = languages.find(
    (lang) => lang.code === i18n.language
  )!;

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`flex z-20 h-[62px] items-center transition-all duration-150 justify-between fixed p-4 px-6  md:px-8 flex-wrap mx-auto w-full ${
          isScrolled && "shadow backdrop-blur-sm bg-white/75 dark:bg-black/65"
        }`}
      >
        <div className="flex items-center w-full md:w-[1000px] mt-0 mx-auto justify-between">
          <Logo />
          <div className="hidden md:flex gap-10 items-center">
            <nav className="desktopNav hidden md:inline-block">
              <ul className="flex flex-row gap-8">
                <li>
                  <a href="#home">{t("navHome")}</a>
                </li>
                <li>
                  <a href="#about">{t("navAbout")}</a>
                </li>
                <li>
                  <a href="#skills">{t("navSkills")}</a>
                </li>
                <li>
                  <a href="#portfolio">{t("navProjects")}</a>
                </li>
                <li>
                  <a href="#contact">{t("navContact")}</a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center justify-center gap-6">
              <button
                className="text-green-600  h-fit w-fit"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <FiSun size={30} className="fill-green-600" />
                ) : (
                  <FaCloudMoon size={30} className="" />
                )}
              </button>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger className="flex gap-2 items-center justify-center px-2 py-1 hover:bg-gray-500/20 rounded-md">
                  <img src={currentLangFlag.flag} alt="" />
                  <FaChevronDown className="text-gray-600 dark:text-gray-500" />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col w-auto gap-1 p-1 bg-white dark:bg-neutral-800 dark:border-none">
                  {languages.map((language) => (
                    <button
                      onClick={() => {
                        i18n.changeLanguage(language.code);
                        setIsPopoverOpen(false);
                      }}
                      className="flex gap-3 items-center text-start py-1 px-2 hover:bg-gray-500/20 rounded-md dark:text-slate-300"
                    >
                      <img src={language.flag} alt="" />
                      {language.name}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={
              !isOpen
                ? "cursor-pointer md:hidden"
                : "hidden cursor-pointer md:hidden"
            }
          >
            {/* <img src={burgerIcon} alt="burger button" /> */}
            <FiMenu size={30} className="text-green-700 dark:text-green-600" />
          </div>
        </div>
      </header>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed h-screen w-screen z-30 overflow-hidden bg-black opacity-60 md:hidden"
        />
      )}
      <div
        className={
          isOpen
            ? "fixed w-full h-[calc(100%)] bg-white dark:bg-[#1b1b1b] translate-x-[40%] z-40 transition-all ease-in-out duration-300 md:hidden"
            : "fixed w-full z-20 h-screen translate-x-[100%] transition-all ease-in-out duration-300 md:hidden"
        }
      >
        <div className="p-4 px-4 flex justify-between items-center w-3/5">
          <button
            className="text-green-700 dark:text-green-600 h-fit w-fit"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <FiSun size={25} className="fill-green-700 dark:fill-green-600" />
            ) : (
              <FaCloudMoon
                size={25}
                className="fill-green-700 dark:fill-green-600"
              />
            )}
          </button>
          <IoMdClose
            size={30}
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-700 dark:text-green-600"
          />
        </div>
        <ul className="navList">
          <li>
            <a href="#home" onClick={() => setIsOpen(false)}>
              {t("navHome")}
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsOpen(false)}>
              {t("navAbout")}
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setIsOpen(false)}>
              {t("navSkills")}
            </a>
          </li>
          <li>
            <a href="#portfolio" onClick={() => setIsOpen(false)}>
              {t("navProjects")}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              {t("navContact")}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
