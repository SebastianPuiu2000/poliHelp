"use client"

import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { useState } from "react";
import SelectSearch from "react-select-search";


import Image from "next/image";
import food from "../../public/food.png";
import drop from "../../public/drop.png";
import shirt from "../../public/shirt.png";
import paper from "../../public/toilet-paper.png";

import React from 'react';
import SearchBar from './SearchBar';

export default function SupplyCreate() {

    const [supply, setSupply] = useState("");
    const [donation, setDonation] = useState(false);
    const [quantity, setQuantity] = useState("");

    const handleDonation = () => {
        setDonation(true);
    }
    
    const handleSubmit = () => {
        setDonation(true);
    }

    //   function handleChange(e) {
    //     setCountryName(e.currentTarget.value);
    //   }

    return (
        <div className="bg-violet-900 p-6 flex flex-col items-center">
            <button className="text-center text-white bg-black my-4 p-5 w-48 rounded-full hover:outline"
                onClick={handleDonation}>
                Make donation
            </button>

            <div className="w-48" hidden={!donation}>
                
                <SearchBar setSupply={setSupply} />
                

                <div className="flex flex-col items-center justify-center">
                <input
                    className="w-full text-center rounded-md py-2 bg-gray-50 text-black px-1 outline-none mb-6" type="name" placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button className="bg-black text-white w-28 text-center rounded-full py-2 px-1 mb-8 hover:outline"
                    onClick={handleSubmit}
                >
                    Donate
                </button>
                </div>


            </div>

        </div>
    );

}