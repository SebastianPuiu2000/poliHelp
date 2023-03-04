"use client"

import Navbar from "../../components/Navbar";
import { useState } from "react";
import help from "../../../public/help.png"
import Image from "next/image";


export default function Register() {
  const [firstOption, setFirstOption] = useState(null);
  const [secondOption, setSecondOption] = useState(null);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleProvideHelpClick = () => {
    setFirstOption('provide');
  }

  const handleNeedHelpClick = () => {
    setFirstOption('require');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      name,
      password,
      role: secondOption
    };

    console.log(form);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form)
    });

    const data = await response.json();

    console.log(data);
  }

  return (

    <div className="bg-violet-900">
      <Navbar></Navbar>

      <div className="flex flex-col items-center justify-evenly bg-violet-900 m-10">
        <div className="w-60 my-5">

          <button className="text-center text-white bg-black my-2 p-5 w-full rounded-full hover:outline"
            onClick={handleProvideHelpClick}
          >
            I want to help!
          </button>
        </div>

        <div className="w-60 my-5">
          <button
            className="text-center text-white bg-black my-2 p-5 w-full rounded-full hover:outline"
            onClick={handleNeedHelpClick}
          >
            I need help!
          </button>
        </div>

        <div className="w-60 my-10" hidden={firstOption !== 'provide'}>
          <button
            className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
            onClick={() => setSecondOption('donate')}
          >
            I want to make donations
          </button>

          <button
            className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
            onClick={() => setSecondOption('delivery')}
          >
            I want to deliver donations
          </button>

          <button
            className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
            onClick={() => setSecondOption('provideShelter')}
          >
            I want to provide shelter
          </button>
        </div>

        <div className="w-60 my-10" hidden={firstOption !== 'require'}>
          <button
            className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
            onClick={() => setSecondOption('needSupplies')}
          >
            I need supplies
          </button>

          <button
            className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
            onClick={() => setSecondOption('needShelter')}
          >
            I need shelter
          </button>
        </div>

        <div className="w-60 my-10" hidden={firstOption === null || secondOption === null}>
          <div className="flex items-center justify-center bg-violet-900">
            <form>
              <div className="bg-violet-900 w-96 p-6 py-20 rounded shadow-sm">
                <div className="flex items-center justify-center mb-20">
                  <Image src={help} width={500} height={500} alt=""></Image>
                </div>
                <label className="text-white"> Name </label>
                <input
                  className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-10" type="email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="text-white"> Password </label>
                <input
                  className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-4" type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  disabled={secondOption === null}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
