import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMenu, FiSun } from "react-icons/fi";
import { FaCloudMoon } from "react-icons/fa";
import Logo from "./Logo";

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ toggleDarkMode, darkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          isScrolled && "shadow backdrop-blur-sm bg-white/65 dark:bg-black/65"
        }`}
      >
        <div className="flex items-center w-full md:w-[1000px] mt-0 mx-auto justify-between">
          <Logo />
          <div className="hidden md:flex gap-12 items-center">
            <nav className="desktopNav hidden md:inline-block">
              <ul className="flex flex-row gap-8">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#skills">Skills</a>
                </li>
                <li>
                  <a href="#portfolio">Projects</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
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
            <FiMenu size={30} className="text-green-700" />
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
        <div className="p-4 px-6 flex justify-between items-center w-3/5">
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
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setIsOpen(false)}>
              Skills
            </a>
          </li>
          <li>
            <a href="#portfolio" onClick={() => setIsOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
