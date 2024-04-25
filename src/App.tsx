import { TypeAnimation } from "react-type-animation"
import Header from "./components/Header"
import ScrollArrow from "./components/ScrollArrow"

function App() {
  return (
    <div className="h-full bg-transparent">
      <Header />
      <div className="w-full h-[calc(100%-64px)] flex flex-col justify-center p-6">
        <div className="mb-28 flex flex-col items-center">
          <h1 className="text-[2.4rem] text-neutral-200 font-bold font-spartan">Maurício Rodrigues</h1>
          <TypeAnimation
            sequence={[
              "Desenvolvedor Web",
              1500,
              "Desenvolvedor de Softwares",
              1000,
              "Desenvolvedor Fullstack",
              1000
            ]}
            wrapper="span"
            speed={30}
            className="text-2xl font-semibold text-neutral-300"
            repeat={Infinity}
          />
        </div>
        <ScrollArrow />
      </div>
      <div className="flex items-center flex-col mt-6">
        <h2 className="text-[2.4rem]">Skills</h2>
      </div>
    </div>
  )
}

export default App
