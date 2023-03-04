"use client"
import { useUser } from "../UserContext"
import Navbar from "../navbar_s/page";

export default function Login() {

  const user = useUser();
    return (

      <div className="h-full">
        <Navbar></Navbar>

        <div className="bg-red-600 h-full">
          abc
        </div>
      </div>
    );
  }
  