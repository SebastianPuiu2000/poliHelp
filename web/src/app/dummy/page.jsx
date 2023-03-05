"use client"
import { useRouter } from 'next/navigation';
import SupplyCreate from '../../components/SupplyCreate';

export default function Dummy() {

    const router = useRouter();

    const supply = [{type: "egg", quantity: 5}, {type: "water", quantity: 20}, {type: "shirt", quantity: 10}, {type: "soap", quantity: 10}];
    
    return (
      <div className="">
        <SupplyCreate></SupplyCreate>
      </div>
    );
  }
  