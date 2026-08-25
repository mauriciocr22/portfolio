import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Portfolio from "./components/Portfolio";
import TechMarquee from "./components/TechMarquee";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="w-full h-full">
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Home darkMode={darkMode} />
      <About />
      <TechMarquee />
      <Portfolio />
      <Contact />
    </div>
  );
}

export default App;
