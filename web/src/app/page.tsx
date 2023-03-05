'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import handshake from "../../public/handshake.png";

function pageButton(page: string, text: string, router: any) {
  return (
    <button
      className='bg-mantis-700 px-6 py-2 rounded text-xl hover:underline'
      key={page}
      onClick={() => router.push(page)}
    >
      {text}

    </button>
  );
}

function buttons(router: any) {
  const buttons: Array<React.ReactElement> = [];

  buttons.push(pageButton('dropoffs', 'Supplies', router));
  buttons.push(pageButton('shelters', 'Shelter', router));

  return (
    <div className="flex flex-row justify-center gap-6 py-6 w-full">
      {buttons}
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const welcomeText =
    <div className="flex flex-col items-center justify-center lg:w-1/2 mt-4">
      <div className="w-5/6 text-mantis-700 text-xl lg:text-2xl text-justify">
        <p className="indent-8">
          Welcome to our website, where we aim to provide assistance and
          support to those who are in need. We understand that life can be
          unpredictable, and sometimes, despite our best efforts, we find
          ourselves in challenging situations.
        </p>

        <p className="indent-8">
          Whether you need a listening ear,
          a warm meal, or a safe place to sleep, we are here for you. We believe
          that by working together, we can make a difference in the lives of those
          who are struggling.
        </p>

      </div>
    </div>;

  return (
    <div>
      <div className="flex flex-col p-10 lg:flex-row justify-center items-center">
        <div className="items-center justify-center w-1/2 flex flex-col">
          <div className="opacity-20">
            <Image src={handshake} width={400} height={400} alt=""></Image>
          </div>
        </div>
        {welcomeText}
      </div>
      {buttons(router)}
    </div>
  );
}
