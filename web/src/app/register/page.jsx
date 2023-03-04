"use client"
import { useUser } from "../UserContext"
import Navbar from "../../components/Navbar";
import { useState } from "react";
import help from "../../../public/help.png"
import Image from "next/image";


export default function Register() {

    const user = useUser();

    const [fade, setFade] = useState(false);
    const [needShow, setNeedShow] = useState(true);
    const [wantShow, setWantShow] = useState(true);
    const [formShow, setFormShow] = useState(false);

    const handleWantClick = () => {
        setNeedShow(false);
        setWantShow(true);
    }

    const handleNeedClick = () => {
        setWantShow(false);
        setNeedShow(true);
    }

    const handleFormClick = () => {
        setFormShow(true);
    }

    return (

        <div className="bg-violet-900">
            <Navbar></Navbar>


            {/* <div className="flex flex-col items-center justify-evenly bg-violet-900 m-10 sm:flex-row">
            
            <div className="bg-red-500 w-60 my-10">

                <button className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline" 
                onClick={handleWantClick}
                // hidden={!wantShow}
                >
                    I want to help!
                </button>

                <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                hidden={needShow}>
                    I want to make donations
                </div>

                <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                hidden={needShow}>
                    I want to deliver donations
                </div>
                <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                hidden={needShow}>
                    I want to provide shelter
                </div>
            </div>

            
            <div className="bg-red-500 w-60 my-10">
                <button
                    className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"  
                    onClick={handleNeedClick} 
                    // hidden={!needShow}
                >
                    I need help!
                </button>
                <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                hidden={wantShow}>
                    I need supplies
                </div>

                <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                hidden={wantShow}>
                    I need shelter
                </div>
            </div>
        </div> */}

            <div className="flex flex-col items-center justify-evenly bg-violet-900 m-10">
                {/* Partea de helper */}
                <div className="bg-red-500 w-60 my-5">

                    <button className="text-center text-white bg-black my-2 p-5 w-full rounded-full hover:outline"
                        onClick={handleWantClick}
                        
                    >
                        I want to help!
                    </button>
                </div>

                {/* Partea de needer */}
                <div className="bg-red-500 w-60 my-5">
                    <button
                        className="text-center text-white bg-black my-2 p-5 w-full rounded-full hover:outline"
                        onClick={handleNeedClick}
                    // hidden={!needShow}
                    >
                        I need help!
                    </button>
                </div>

                {/* Optiuni pt wanter */}
                <div className="bg-red-500 w-60 my-10"
                    hidden={needShow}>
                    <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                        onClick={handleFormClick} >
                        I want to make donations
                    </div>

                    <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                        onClick={handleFormClick} >
                        I want to deliver donations
                    </div>

                    <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                        onClick={handleFormClick} >
                        I want to provide shelter
                    </div>
                </div>

                {/* Optiuni pt needer */}
                <div className="bg-red-500 w-60 my-10"
                    hidden={wantShow}>
                    <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                        onClick={handleFormClick} >
                        I need supplies
                    </div>

                    <div className="text-center text-white bg-black my-5 p-5 w-full rounded-full hover:outline"
                        onClick={handleFormClick} >
                        I need shelter
                    </div>
                </div>

                {/* Form */}
                <div className="bg-red-500 w-60 my-10"
                    hidden={!formShow}>
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
                </div>
            </div>

            <div className="bg-black h-32">
                sadad
            </div>
        </div>
    );
}
