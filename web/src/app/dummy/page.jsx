"use client"
import { useRouter } from 'next/navigation';
import ceva from "../../components/SupplyList";

export default function Dummy() {

    const router = useRouter();

    const supply = [[type: "egg", quantity: "5"], [type: "water", quantity: "20"], [type: "meat", quantity: "10"]];
    
    return (
      
    );
  }
  