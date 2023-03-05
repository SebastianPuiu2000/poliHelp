"use client"

import { useState } from "react";
import SearchBar from './SearchBar';

export default function SupplyCreate({ onClick }) {

  const [donation, setDonation] = useState(false);
  const [supply, setSupply] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleDonation = () => {
    setDonation(true);
  };

  const handleSubmit = async () => {
    await onClick([{ type: supply, quantity }]);
    setSupply('');
    setQuantity('');
    setDonation(false);
  };

  return (
    <div className="w-full text-base flex flex-col items-center justify-center">
      <button
        className="text-lg font-bold text-slate-700 mt-2"
        onClick={handleDonation}
        hidden={donation}
      >
        Make donation
      </button>

      <div hidden={!donation} className='mt-2 w-full'>
        <div className='w-full flex flex-row items-center justify-center'>
          <div className='w-54'>
            <SearchBar setSupply={setSupply} />
          </div>
          <input
            className="text-center rounded-md bg-slate-100 border border-slate-400 text-black outline-none w-10 h-8 ml-2"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-2">
          <button
            className="text-slate-800 text-center rounded"
            onClick={handleSubmit}
            disabled={supply === '' || quantity === ''}
          >
            <b> Donate </b>
          </button>
        </div>
      </div>
    </div>
  );
}
