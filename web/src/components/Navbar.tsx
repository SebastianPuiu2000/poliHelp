'use client';

import { useUser, useUserDispatch } from '@/app/UserContext';
import { useRouter } from 'next/navigation';

function userButtons(router) {
  return (
    <div>
      <button
        className="text-white pr-4"
        onClick={() => router.push('/login')}
      >
        Sign In
      </button>
      <button
        className="text-white rounded bg-violet-900 py-2 px-6"
        onClick={() => router.push('/register')}
      >
        Sign up
      </button>
    </div>
  );
}

function userInfo(user, userDispatch) {
  const handleLogout = () => {
    userDispatch({
      type: 'logout'
    });
  };

  return (
    <div>
      <span> {user.name} </span>
      <button
        className="text-white rounded bg-red-500 ml-2 py-2 px-6"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}


export default function Navbar() {
  const user = useUser();
  const userDispatch = useUserDispatch();

  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-7 bg-black">
      <button
        className="text-violet-900 text-4xl font-bold cursor-pointer"
        onClick={() => router.push('/')}
      >
        poli<b>Help</b>
      </button>
        { user === null ? userButtons(router) : userInfo(user, userDispatch) }
    </div>
  );
}

