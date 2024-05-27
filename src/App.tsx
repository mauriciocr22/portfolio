import Header from "./components/Header";
import selfieImg from "./assets/foto.jpg";
import ScrollArrow from "./components/ScrollArrow";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex flex-col w-full h-[calc(100%-64px)] items-center justify-center px-8">
        <span className="font-canada text-lg font-semibold">
          Hello There! I'm
        </span>
        <h1 className="font-canada font-semibold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-800">
          Maurício Rodrigues
        </h1>
        <p className="text-slate-700 font-semibold text-center text-lg mb-4">
          A fullstack developer with a passion for web development.
        </p>
        <button className=" bg-green-600 text-white text-semibold px-4 py-3 rounded-sm">
          Get in Touch
        </button>
      </div>
      <ScrollArrow />
    </div>
  );
}

export default App;
