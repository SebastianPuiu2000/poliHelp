'use client';

import { useUser, useUserDispatch } from '@/app/UserContext';
import { useRouter } from 'next/navigation';

function userButtons(router) {
  return (
    <div>
      <button
        className="text-mantis-50 pr-4 hover:underline"
        onClick={() => router.push('/login')}
      >
        Sign In
      </button>
      <button
        className="text-mantis-900 rounded bg-mantis-400 py-2 px-6 hover:underline"
        onClick={() => router.push('/register')}
      >
        <b> Sign up </b>
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
        className="text-mantis-800 bg-mantis-300 rounded py-2 px-6 hover:underline"
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
    <div className="flex items-center justify-between py-4 px-6 bg-gradient-to-r from-mantis-500 to-mantis-700">
      <button
        className="text-matis-50 text-4xl font-bold cursor-pointer"
        onClick={() => router.push('/')}
      >
        <span className='font-light text'>poli</span><span className='font-bold'>Help</span>
      </button>
        { user === null ? userButtons(router) : userInfo(user, userDispatch) }
    </div>
  );
}

