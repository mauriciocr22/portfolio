import selfieImg from "../assets/foto.jpg";

export default function About() {
  return (
    <section className="h-[38rem] flex justify-center items-center w-full bg-green-600">
      <div className="bg-white w-4/5 h-3/4 rounded-md shadow-md p-8 flex flex-col">
        <div className="flex flex-row mb-4">
          <img src={selfieImg} alt="" className="rounded-full w-10 mr-3" />
          <span className="font-medium leading-loose">Maurício Rodrigues</span>
        </div>
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
            est nesciunt. Quisquam nisi voluptate eligendi praesentium ipsam
            beatae ex accusantium earum nulla aperiam. Ipsum atque blanditiis
            dolor alias assumenda a.
          </p>
        </div>
      </div>
    </section>
  );
}
