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

        {/* <div className="bg-red-600 flex flex-col items-center my-20">
          <div className="bg-blue-600">
            asd
          </div>
          <div>
            dsjdn
          </div>
        </div> */}

        <div className="flex items-center justify-center bg-violet-900">
            <form>
              <div className="bg-violet-900 w-96 p-6 py-20 rounded shadow-sm">
                <div className="flex items-center justify-center mb-20">
                  <Image src={help} width={500} height={500} alt=""></Image>
                </div>
                <label className="text-white"> Email </label>
                <input className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-10" type="email"></input>
                <label className="text-white"> Password </label>
                <input className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-4" type="password"></input>
              </div>
            </form>
        </div>

        <div className="bg-black h-32">
          sadad
        </div>
      </div>
    );
  }
  