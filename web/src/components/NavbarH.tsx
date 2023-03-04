"use client"
import { useRouter } from 'next/navigation';

export default function Navbar() {

    const router = useRouter();
    
    return (
      <div className="flex items-center justify-between p-7 bg-black">
        <button className="text-violet-900 text-4xl font-bold cursor-pointer"onClick={() => router.push('/')}> poliHELP</button>
        <div>
          <button className="text-white pr-4" onClick={() => router.push('/login')}> Sing In </button>
          <button className="text-white rounded bg-violet-900 py-2 px-6"onClick={() => router.push('/register')}> Sign up </button>
        </div>
      </div>
    );
  }
  