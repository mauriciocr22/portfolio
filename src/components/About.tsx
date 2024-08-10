import selfieImg from "../assets/foto.jpg";

export default function About() {
  return (
    <section id="about" className="py-12 flex items-center w-full flex-col bg-[#27996a]">
      <div className="bg-white w-4/5 h-4/5 rounded-md shadow-md p-8 flex flex-col">
        <div className="flex flex-col mb-4 items-center">
          <img src={selfieImg} alt="" className="rounded-full w-36 mb-2" />
          <span className="font-semibold text-xl mb-4 after:">
            Maurício Rodrigues
          </span>
        </div>
        <div className="overflow-y-scroll h-72 pr-2 mb-4 scrollbar">
          <p className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
            est nesciunt. Quisquam nisi voluptate eligendi praesentium ipsam
            beatae ex accusantium earum nulla aperiam. Ipsum atque blanditiis
            dolor alias assumenda a. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Corporis, est nesciunt. Quisquam nisi voluptate
            eligendi praesentium ipsam beatae ex accusantium earum nulla
            aperiam. Ipsum atque blanditiis dolor alias assumenda a.
          </p>
        </div>
        <button className="w-full bg-green-600 text-white rounded-sm h-14">
          Download Resume
        </button>
      </div>
    </section>
  );
}
