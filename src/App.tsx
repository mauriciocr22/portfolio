import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Portfolio from "./components/Portfolio";
import TechMarquee from "./components/TechMarquee";
import TechStack from "./components/TechStack";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="w-full h-full">
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Home />
      <About />
      <TechStack />
      <TechMarquee />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
