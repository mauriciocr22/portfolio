import selfieImg from "../assets/foto.jpg";

export default function About() {
  return (
    <section className="h-[38rem] flex justify-center items-center w-full bg-green-600">
      <div className="bg-white w-4/5 h-3/4 rounded-md shadow-md p-8 flex flex-col">
        <div className="flex flex-row mb-4 items-center">
          <img src={selfieImg} alt="" className="rounded-full w-16 mr-3" />
          <span className="font-medium h-6">Maurício Rodrigues</span>
        </div>
        <div className="overflow-y-scroll h-64 pr-2 mb-4">
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
