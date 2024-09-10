import selfieImg from "../assets/foto.jpg";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import curriculumPDF from "../assets/curriculum.pdf";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

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
          <div className="overflow-y-scroll md:overflow-visible h-72 md:h-auto pr-2 mb-4 scrollbar">
            <p className="md:text-lg dark:text-slate-200">{t("aboutText")}</p>
          </div>
          <a
            href={curriculumPDF}
            download="mauricio_curriculum.pdf"
            className="w-full bg-green-600 text-white rounded-sm h-14 flex items-center justify-center md:hover:bg-green-700 transition-colors duration-75"
          >
            {t("aboutCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
