import selfieImg from "../assets/foto.jpg";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function About() {
  return (
    <section
      id="about"
      className="py-12 flex items-center w-full flex-col bg-[#27996a] scroll-mt-[10vh]"
    >
      <div className="bg-white w-4/5 h-4/5 rounded-md shadow-md p-8 flex flex-col md:w-[850px] md:flex-row md:items-center">
        <div className="flex flex-col mb-4 items-center md:mb-0">
          <img
            src={selfieImg}
            alt=""
            className="rounded-full w-36 mb-2 md:w-2/3 md:mb-4"
          />
          <span className="font-semibold text-xl mb-4 md:text-2xl">
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
          <div className="overflow-y-scroll md:overflow-visible h-72 md:h-60 pr-2 mb-4 scrollbar">
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Corporis, est nesciunt. Quisquam nisi voluptate eligendi
              praesentium ipsam beatae ex accusantium earum nulla aperiam. Ipsum
              atque blanditiis dolor alias assumenda a. Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Corporis, est nesciunt.
              Quisquam nisi voluptate eligendi praesentium ipsam beatae ex
              accusantium earum nulla aperiam. Ipsum atque blanditiis dolor
              alias assumenda a.
            </p>
          </div>
          <button className="w-full bg-green-600 text-white rounded-sm h-14 md:hover:bg-green-700 transition-colors duration-75">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
