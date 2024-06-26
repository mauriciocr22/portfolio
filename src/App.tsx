import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import Skills from "./components/Skills";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <Home />
      <About />
      <Skills />
    </div>
  );
}

export default App;
