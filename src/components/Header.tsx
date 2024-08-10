import { useEffect, useState } from "react";
import Logo from "./Logo";
import burgerIcon from "../assets/list.svg";

export default function Header() {
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
        className={`flex z-20 items-center transition-all duration-150 justify-between fixed p-4 px-6  md:px-8 flex-wrap mx-auto w-full ${
          isScrolled &&
          "border-b border-slate-200 shadow backdrop-blur-sm bg-white/65"
        }`}
      >
        <Logo />
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <img src={burgerIcon} alt="burger button" />
        </div>
      </header>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed h-screen w-screen z-30 overflow-hidden bg-black opacity-60"
        />
      )}
      <div
        className={
          isOpen
            ? "fixed w-full h-[calc(100%)] bg-white py-4 translate-x-[45%] z-40 transition-all ease-in-out duration-300"
            : "fixed w-full z-20 h-screen translate-x-[100%] transition-all ease-in-out duration-300"
        }
      >
        <ul className="list-none">
          <li>
            <a href="#home" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsOpen(false)}>
              Sobre mim
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setIsOpen(false)}>
              Habilidades
            </a>
          </li>
          <li>
            <a href="#portfolio" onClick={() => setIsOpen(false)}>
              Projetos
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              Contato
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
