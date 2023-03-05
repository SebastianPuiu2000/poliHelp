"use client"

import { useState } from "react";
import SearchBar from './SearchBar';
import SupplyList from "./SupplyList";

export default function RequestCreate({ onClick }) {
  const [request, setRequest] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [supply, setSupply] = useState("");

  const [supplies, setSupplies] = useState([]);

  const handleDonation = () => {
    setRequest(true);
  };

  const handleAdd = async () => {
    setSupply('');
    setQuantity('');
    setSupplies([...supplies, { type: supply, quantity }])
  };

  const handleSubmit = async () => {
    await onClick(supplies);
    setSupplies([]);
    setSupply('');
    setQuantity('');
    setRequest(false);
  };

  return (
    <div className="w-full text-base flex flex-col items-center justify-center">
      <button
        className="text-lg font-bold text-red-400 mt-2"
        onClick={handleDonation}
        hidden={request}
      >
        Make a request
      </button>

      <div className='w-4/5'>
        <SupplyList supplies={supplies} request/>
      </div>

      <div hidden={!request} className='mt-2 w-full'>
        <div className='w-full flex flex-row items-center justify-center'>
          <div className='w-54 text-sm'>
            <SearchBar setSupply={setSupply} value={supply}/>
          </div>

          <input
            className="text-center rounded-md bg-slate-100 border border-slate-400 text-black outline-none w-10 h-8 mx-2"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button
            className="text-slate-800 text-4xl text-center rounded"
            onClick={handleAdd}
            disabled={supply === '' || quantity === ''}
          >
            +
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-2">
          <button
            className="text-red-400 text-center rounded"
            onClick={handleSubmit}
            disabled={supplies.length <= 0}
          >
            <b> Request </b>
          </button>
        </div>
      </div>
    </div>
  );
}
