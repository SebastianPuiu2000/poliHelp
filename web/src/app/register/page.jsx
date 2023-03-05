"use client"

import { useRouter } from 'next/navigation';
import { useState } from "react";
import help from "../../../public/help.png"
import Image from "next/image";
import { useUserDispatch } from "../UserContext";
import { decode } from "jsonwebtoken";

export default function Register() {
  const userDispatch = useUserDispatch();
  const router = useRouter();

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

    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form)
    });

    const registerData = await registerResponse.json();

    if (registerData.success) {
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const loginData = await loginResponse.json();

      const userData = decode(loginData.jwt)

      userDispatch({
        type: 'login',
        payload: {
          token: loginData.jwt,
          ...userData
        }
      });

      router.replace('/');
    }
  }

  return (
    <div className="bg-violet-900">
      <div className="flex flex-col items-center justify-evenly bg-violet-900">

        {/* Group 1 */}
        <div className="w-60 my-5">

          {/* Fie e provide, fie e require, fie e niciuna */}
          {firstOption === "provide" ?
            <div>
              <button className="text-center text-white bg-black my-2 p-5 w-full rounded outline outline-white"
                onClick={handleProvideHelpClick}
              >
                I want to help!
              </button>
              <button
                className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                onClick={handleNeedHelpClick}
              >
                I need help!
              </button>
            </div>
            :
            firstOption === "require" ?
              <div>
                <button className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                  onClick={handleProvideHelpClick}
                >
                  I want to help!
                </button>
                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded outline outline-white"
                  onClick={handleNeedHelpClick}
                >
                  I need help!
                </button>
              </div>
              :
              <div>
                <button className="text-center text-white bg-black my-2 p-5 w-full rounded"
                  onClick={handleProvideHelpClick}
                >
                  I want to help!
                </button>
                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded"
                  onClick={handleNeedHelpClick}
                >
                  I need help!
                </button>
              </div>
          }

        </div>

        {/* Group 2.1 */}
        <div className="w-60 my-10" hidden={firstOption !== 'provide'}>

          {secondOption === "donate" ?
            <div>
              <button
                className="text-center text-white bg-black my-2 p-5 w-full rounded outline"
                onClick={() => setSecondOption('donate')}
              >
                I want to make donations
              </button>

              <button
                className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                onClick={() => setSecondOption('delivery')}
              >
                I want to deliver donations
              </button>

              <button
                className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                onClick={() => setSecondOption('provideShelter')}
              >
                I want to provide shelter
              </button>
            </div>
            :
            secondOption === "delivery" ?
              <div>
                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                  onClick={() => setSecondOption('donate')}
                >
                  I want to make donations
                </button>

                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded outline"
                  onClick={() => setSecondOption('delivery')}
                >
                  I want to deliver donations
                </button>

                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                  onClick={() => setSecondOption('provideShelter')}
                >
                  I want to provide shelter
                </button>
              </div>
              :
              secondOption === "provideShelter" ?
                <div>
                  <button
                    className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                    onClick={() => setSecondOption('donate')}
                  >
                    I want to make donations
                  </button>

                  <button
                    className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                    onClick={() => setSecondOption('delivery')}
                  >
                    I want to deliver donations
                  </button>

                  <button
                    className="text-center text-white bg-black my-2 p-5 w-full rounded outline"
                    onClick={() => setSecondOption('provideShelter')}
                  >
                    I want to provide shelter
                  </button>
                </div>
                :
                <div>
                  <button
                    className="text-center text-white bg-black my-2 p-5 w-full rounded"
                    onClick={() => setSecondOption('donate')}
                  >
                    I want to make donations
                  </button>

                  <button
                    className="text-center text-white bg-black my-2 p-5 w-full rounded"
                    onClick={() => setSecondOption('delivery')}
                  >
                    I want to deliver donations
                  </button>

                  <button
                    className="text-center text-white bg-black my-2 p-5 w-full rounded"
                    onClick={() => setSecondOption('provideShelter')}
                  >
                    I want to provide shelter
                  </button>
                </div>
          }
        </div>

        {/* Group 2.2 */}
        <div className="w-60 my-10" hidden={firstOption !== 'require'}>

          {secondOption === "needSupplies" ?
            <div>
              <button
                className="text-center text-white bg-black my-2 p-5 w-full rounded outline outline-white"
                onClick={() => setSecondOption('needSupplies')}
              >
                I need supplies
              </button>

              <button
                className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                onClick={() => setSecondOption('needShelter')}
              >
                I need shelter
              </button>
            </div>
            :
            secondOption === "needShelter" ?
              <div>
                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded opacity-30"
                  onClick={() => setSecondOption('needSupplies')}
                >
                  I need supplies
                </button>

                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded outline outline-white"
                  onClick={() => setSecondOption('needShelter')}
                >
                  I need shelter
                </button>
              </div>
              :
              <div>
                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded"
                  onClick={() => setSecondOption('needSupplies')}
                >
                  I need supplies
                </button>

                <button
                  className="text-center text-white bg-black my-2 p-5 w-full rounded"
                  onClick={() => setSecondOption('needShelter')}
                >
                  I need shelter
                </button>
              </div>
          }
        </div>

        {/* Group 3 */}
        <div className="w-60 my-10" hidden={firstOption === null || secondOption === null}>
          <div className="flex flex-col items-center justify-center bg-violet-900">
            <form>
              <div className="bg-violet-900 w-96 p-6 py-10 rounded shadow-sm">
                <div className="flex items-center justify-center mb-20">
                  <Image src={help} width={500} height={500} alt=""></Image>
                </div>
                <input
                  className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-6" type="name" placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full text-center rounded-2xl py-2 bg-gray-50 text-black px-1 outline-none mb-4" type="password" placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>
            </form>
            <button className="bg-black text-white w-28 text-center rounded-full py-2 px-1 mb-8 hover:outline"
              disabled={secondOption === null}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
