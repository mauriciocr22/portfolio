import ScrollArrow from "./ScrollArrow";

export default function Home() {
  return (
    <section
      id="home"
      className="flex flex-col w-full h-full items-center justify-center px-8"
    >
      <span className="font-canada text-lg font-semibold">
        Hello There! I'm
      </span>
      <h1 className="font-canada font-semibold text-4xl bg-clip-text text-center text-transparent bg-gradient-to-r from-green-500 to-green-800">
        Maurício Rodrigues
      </h1>
      <p className="text-slate-700 font-semibold text-center text-lg mb-4">
        A fullstack developer with a passion for web development.
      </p>
      <button className=" bg-green-600 text-white text-semibold px-4 py-3 rounded-sm md:hover:bg-green-700 transition-colors duration-100">
        Get in Touch
      </button>
      <ScrollArrow />
    </section>
  );
}
