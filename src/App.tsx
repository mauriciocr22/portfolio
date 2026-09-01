import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Portfolio from "./components/Portfolio";
import Reveal from "./components/Reveal";
import TechMarquee from "./components/TechMarquee";
import TechStack from "./components/TechStack";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="w-full h-full">
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Home />
      {/* About runs its own two-part reveal (portrait, then text) — see the
          component. Everything below shares the one <Reveal> treatment,
          firing as each section scrolls into view. */}
      <About />
      <Reveal>
        <TechStack />
      </Reveal>
      <Reveal>
        <TechMarquee />
      </Reveal>
      <Reveal>
        <Portfolio />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
      <Reveal>
        <Footer />
      </Reveal>
    </div>
  );
}

export default App;
