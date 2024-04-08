import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import burgerIcon from "../assets/list.svg";
import closeIcon from "../assets/x.svg";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between sticky p-4 px-6 md:px-8 flex-wrap z-[20] mx-auto  w-full ">
        <Logo />
        <div onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <img src={burgerIcon} alt="burger button" /> : <img src={closeIcon} alt="close button" />}
        </div>
      </header>
      <div className={isOpen ? "fixed w-full h-screen translate-x-[45%] transition-all ease-in-out duration-300" : "fixed w-full h-screen translate-x-[100%] transition-all ease-in-out duration-300"}>
        <ul className="list-none">
          <li>Sobre</li>
          <li>Projetos</li>
          <li>Contatos</li>
        </ul>
      </div>
    </>

  )
}