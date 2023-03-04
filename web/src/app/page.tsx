import Navbar from "../components/NavbarH";
import Image from "next/image";
import handshake from "../../public/handshake.png";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-violet-900 flex flex-col p-10 lg:flex-row justify-center items-center">

      <div className="items-center justify-center w-1/2 bg-violet-900 flex flex-col">
        <Image src={handshake} width={500} height={500} alt=""></Image>
          
        </div>
        <div className="flex flex-col items-center justify-center bg-violet-900 lg:w-1/2">
          <div className="bg-violet-900 w-5/6 text-2xl font-mono text-justify">
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
        </div>

        

        

      </div>

      <div className="bg-black h-32">
        sadad
      </div>

    </div>
  );
}
