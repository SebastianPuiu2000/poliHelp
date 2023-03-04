"use client"
import { useUser } from "../UserContext"
import Navbar from "../../components/Navbar";
import Image from "next/image";
import help from "../../../public/help.png"


export default function Login() {

  const user = useUser();
  return (

    <div className="bg-violet-900">
      <Navbar></Navbar>

      <div className="flex flex-col items-center justify-center bg-violet-900">
        <form>
          <div className="bg-violet-900 w-96 p-6 py-10 rounded shadow-sm">
            <div className="flex items-center justify-center mb-20">
              <Image src={help} width={500} height={500} alt=""></Image>
            </div>
            <input className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-6" type="name" placeholder="Name"></input>
            <input className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-4" type="password" placeholder="Password"></input>
          </div>
        </form>

        <button className="bg-black text-white w-28 text-center rounded-full py-2 px-1 outline-none mb-8">
          Submit
        </button>
      </div>

      <div className="bg-black h-32">
        sadad
      </div>
    </div>
  );
}
