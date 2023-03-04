'use client';

import { createContext, Dispatch, useContext, useReducer } from 'react';

interface User {
  id: string,
  name: string,
  type: string
}

interface UserAction {
  type: UserActionType,
  payload: any
}

enum UserActionType {
  login = 'login',
  logout = 'logout'
}

const UserContext = createContext<User | null>(null);
const UserDispatchContext = createContext<Dispatch<UserAction> | null>(null);

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(
    userReducer,
    null
  );

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

function userReducer(user: User | null, action: UserAction): User | null {
  switch (action.type) {
    case UserActionType.login:
      console.log('login!');
      return action.payload.user;

    case UserActionType.logout:
      console.log('logout');
      return null;
  }
}
