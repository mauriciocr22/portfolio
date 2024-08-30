import selfieImg from "../assets/foto.jpg";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import curriculumPDF from "../assets/curriculum.pdf";

export default function About() {
  return (
    <section
      id="about"
      className="py-12 flex items-center w-full flex-col bg-[#27996a] dark:bg-[#1d6b4a] scroll-mt-[10vh]"
    >
      <div className="bg-white dark:bg-[#222222] h-4/5 w-4/5 rounded-md shadow-md p-8 flex gap-2 flex-col md:w-[850px] md:flex-row md:items-center">
        <div className="flex flex-col  items-center ">
          <img
            src={selfieImg}
            alt=""
            className="rounded-full w-36 mb-2 md:w-5/6 md:mb-4"
          />
          <span className="font-semibold text-xl mb-4 md:text-2xl dark:text-slate-200">
            Maurício Rodrigues
          </span>
          <div className="aboutContact">
            <a target="_blank" href="https://www.linkedin.com/in/mauriciocr22/">
              <FaLinkedin />
            </a>
            <a target="_blank" href="https://wa.me/13974069042">
              <IoLogoWhatsapp />
            </a>
            <a target="_blank" href="https://www.instagram.com/crmaumau/">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div>
          <div className="overflow-y-scroll md:overflow-visible h-72 pr-2 mb-4 scrollbar">
            <p className="md:text-lg dark:text-slate-200">
              I'm a Brazilian developer with a deep passion for coding, and most
              of what I know comes from rolling up my sleeves and diving into
              projects. I'm currently enrolled in an Internet Systems course at
              FATEC Rubens Lara, but I've spent a lot of time teaching myself
              the ins and outs of web development, especially with React,
              TailwindCSS, and Node.js. I love creating sleek, functional web
              apps and am always eager to learn more and tackle new challenges
              in the tech world. If you’d like to learn more about me, feel free
              to reach out or download my resume!
            </p>
          </div>
          <a
            href={curriculumPDF}
            download="mauricio_curriculum.pdf"
            className="w-full bg-green-600 text-white rounded-sm h-14 flex items-center justify-center md:hover:bg-green-700 transition-colors duration-75"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
