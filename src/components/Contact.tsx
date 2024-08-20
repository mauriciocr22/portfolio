import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Contact() {
  return (
    <section id="contact" className="w-full flex flex-col items-center px-7">
      <h2 className="text-2xl text-slate-600 font-semibold mb-6 font-canada">
        Feel free to contact me!
      </h2>
      <div className="flex gap-2 mb-10 contact">
        <a target="_blank" href="https://www.linkedin.com/in/mauriciocr22/">
          <FaLinkedin />
        </a>
        {/* <a href="mailto:mauriciocr223@gmail.com">
          <IoMdMail />
        </a> */}
        <a target="_blank" href="https://wa.me/13974069042">
          <IoLogoWhatsapp />
        </a>
      </div>
    </section>
  );
}
