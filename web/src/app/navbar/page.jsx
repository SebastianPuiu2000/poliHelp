"use client"

export default function Navbar() {

    return (
      <div className="flex items-center justify-between p-4 bg-black">
        <h1 className="text-violet-900 text-4xl font-bold cursor-pointer"> poliHELP</h1>
        <div>
          <button className="text-white pr-4"> Sing In </button>
          <button className="text-white rounded bg-violet-900 py-2 px-6"> Sign up </button>
        </div>
      </div>
    );
  }
  