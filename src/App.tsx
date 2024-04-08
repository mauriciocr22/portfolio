import Header from "./components/Header"

function App() {
  return (
    <div className="h-full">
      <Header />
      <div className="w-full h-[calc(100%-70px)] flex flex-col justify-center p-6">
        <h1 className="text-4xl text-neutral-200">Sou o Maurício</h1>
        <span className="text-3xl font-bold text-neutral-200">Desenvolvedor de Softwares</span>
      </div>
    </div>
  )
}

export default App
