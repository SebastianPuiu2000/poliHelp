"use client"

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import help from "../../../public/help.png"
import Image from "next/image";
import { useUserDispatch } from "../UserContext";
import { decode } from "jsonwebtoken";

export default function Register() {
  const userDispatch = useUserDispatch();
  const router = useRouter();
  const ref = useRef();

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

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [secondOption])

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
    <div className="flex flex-col items-center justify-evenly">
      {/* Group 1 */}
      <div className="max-w-sm my-5 text-center text-lg text-mantis-100">

        {/* Fie e provide, fie e require, fie e niciuna */}
        {firstOption === "provide" ?
          <div>
            <button
              className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
              onClick={handleProvideHelpClick}
            >
              I want to help!
            </button>
            <button
              className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
              onClick={handleNeedHelpClick}
            >
              I <b>need</b> help!
            </button>
          </div>
          :
          firstOption === "require" ?
            <div>
            <button
                className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
                onClick={handleProvideHelpClick}
              >
                I want to help!
              </button>
              <button
                className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
                onClick={handleNeedHelpClick}
              >
                I <b>need</b> help!
              </button>
            </div>
            :
            <div>
              <button className="bg-mantis-600 my-2 p-5 w-full rounded"
                onClick={handleProvideHelpClick}
              >
                I want to help!
              </button>
              <button className="bg-mantis-600 my-2 p-5 w-full rounded"
                onClick={handleNeedHelpClick}
              >
                I need help!
              </button>
            </div>
        }

      </div>

      {/* Group 2.1 */}
      <div className="my-10 max-w-sm text-center text-lg text-mantis-100" hidden={firstOption !== 'provide'}>

        {secondOption === "donate" ?
          <div>
            <button
              className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
              onClick={() => setSecondOption('donate')}
            >
              I want to make donations
            </button>

            <button
              className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
              onClick={() => setSecondOption('delivery')}
            >
              I want to help deliver donations
            </button>

            <button
              className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
              onClick={() => setSecondOption('provideShelter')}
            >
              I want to provide shelter
            </button>
          </div>
          :
          secondOption === "delivery" ?
            <div>
              <button
                className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
                onClick={() => setSecondOption('donate')}
              >
                I want to make donations
              </button>

              <button
                className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
                onClick={() => setSecondOption('delivery')}
              >
                I want to deliver donations
              </button>

              <button
                className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
                onClick={() => setSecondOption('provideShelter')}
              >
                I want to provide shelter
              </button>
            </div>
            :
            secondOption === "provideShelter" ?
              <div>
                <button
                  className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
                  onClick={() => setSecondOption('donate')}
                >
                  I want to make donations
                </button>

                <button
                  className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
                  onClick={() => setSecondOption('delivery')}
                >
                  I want to deliver donations
                </button>

                <button
                  className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
                  onClick={() => setSecondOption('provideShelter')}
                >
                  I want to provide shelter
                </button>
              </div>
              :
              <div>
                <button
                  className="bg-mantis-600 my-2 p-5 w-full rounded"
                  onClick={() => setSecondOption('donate')}
                >
                  I want to make donations
                </button>

                <button
                  className="bg-mantis-600 my-2 p-5 w-full rounded"
                  onClick={() => setSecondOption('delivery')}
                >
                  I want to deliver donations
                </button>

                <button
                  className="bg-mantis-600 my-2 p-5 w-full rounded"
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
              className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
              onClick={() => setSecondOption('needSupplies')}
            >
              I need supplies
            </button>

            <button
              className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
              onClick={() => setSecondOption('needShelter')}
            >
              I need shelter
            </button>
          </div>
          :
          secondOption === "needShelter" ?
            <div>
              <button
                className="bg-mantis-600 my-2 p-5 w-full rounded opacity-50"
                onClick={() => setSecondOption('needSupplies')}
              >
                I need supplies
              </button>

              <button
                className="bg-gradient-to-r from-mantis-600 to-mantis-700 my-2 p-5 w-full rounded outline outline-mantis-400"
                onClick={() => setSecondOption('needShelter')}
              >
                I need shelter
              </button>
            </div>
            :
            <div>
              <button
                className="bg-mantis-600 my-2 p-5 w-full rounded"
                onClick={() => setSecondOption('needSupplies')}
              >
                I need supplies
              </button>

              <button
                className="bg-mantis-600 my-2 p-5 w-full rounded"
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
          <div className="flex items-center justify-center mb-10 opacity-30">
            <Image src={help} width={200} height={200} alt=""></Image>
          </div>
          <form>
            <div className="w-96 p-6 py-10 rounded shadow-sm">
              <input
                ref={ref}
                className="w-full text-center rounded-2xl py-2 bg-mantis-600 text-mantis-50 placeholder:text-mantis-200 px-1 outline-none mb-6" type="name" placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full text-center rounded-2xl py-2 bg-mantis-600 text-mantis-50 placeholder:text-mantis-200 px-1 outline outline-mantis-200 mb-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
          </form>
          <button
            className="bg-mantis-700 text-white w-28 text-lg text-center rounded py-2 px-1 mb-8 hover:underline"
            disabled={secondOption === null}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
