import { useEffect, useState } from "react";
import Logo from "./Logo";
import burgerIcon from "../assets/list.svg";
import closeIcon from "../assets/x.svg";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <header className="flex bg-[#060606] items-center justify-between sticky p-4 px-6 md:px-8 flex-wrap z-[20] mx-auto w-full ">
        <Logo />
        <div onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <img src={burgerIcon} alt="burger button" /> : <img src={closeIcon} alt="close button" />}
        </div>
      </header>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="absolute h-[calc(100%-64px)] w-screen z-10 overflow-hidden bg-[#060606] opacity-60" />
      )}
      <div className={isOpen ? "fixed w-full h-[calc(100%-64px)] bg-[#060606] py-4 translate-x-[45%] z-20 transition-all ease-in-out duration-300" : "fixed w-full z-20 h-screen translate-x-[100%] transition-all ease-in-out duration-300"}>
        <ul className="list-none">
          <li>Sobre</li>
          <li>Projetos</li>
          <li>Contatos</li>
        </ul>
      </div>
    </>

  )
}