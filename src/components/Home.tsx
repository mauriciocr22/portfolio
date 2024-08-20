import ScrollArrow from "./ScrollArrow";

export default function Home() {
  return (
    <section
      id="home"
      className="flex flex-col w-full h-full items-center justify-center px-8 bg-gradient-to-r from-white to-black/20"
    >
      <span className="font-canada text-lg font-semibold md:text-xl">
        Hello There! I'm
      </span>
      <h1 className="font-canada font-semibold text-4xl md:text-[42px] md:leading-tight bg-clip-text text-center text-transparent bg-gradient-to-r from-green-500 to-green-800">
        Maurício Rodrigues
      </h1>
      <p className="text-slate-700 font-semibold text-center text-lg mb-4 md:text-xl">
        A fullstack developer with a passion for web development.
      </p>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/mauriciocr22/"
        className=" bg-green-600 text-white text-semibold px-4 py-3 rounded-sm md:hover:bg-green-700 transition-colors duration-100 md:text-lg"
      >
        Get in Touch
      </a>
      <ScrollArrow />
    </section>
  );
}
