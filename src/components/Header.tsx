import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";

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
        className={`flex z-20 h-[62px] items-center transition-all duration-150 justify-between fixed p-4 px-6  md:px-8 flex-wrap mx-auto w-full ${
          isScrolled &&
          "border-b border-slate-200 shadow backdrop-blur-sm bg-white/65"
        }`}
      >
        <Logo />
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={!isOpen ? "cursor-pointer" : "hidden cursor-pointer"}
        >
          {/* <img src={burgerIcon} alt="burger button" /> */}
          <FiMenu size={30} className="text-green-700" />
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
            ? "fixed w-56 h-[calc(100%)] bg-white translate-x-[90%] z-40 transition-all ease-in-out duration-300"
            : "fixed w-full z-20 h-screen translate-x-[100%] transition-all ease-in-out duration-300"
        }
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 px-6 flex justify-end"
        >
          <IoMdClose size={30} className="text-green-700" />
        </div>
        <ul className="navlist">
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
