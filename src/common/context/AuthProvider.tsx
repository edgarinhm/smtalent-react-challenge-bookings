import { createContext, ReactNode, useState } from 'react';
import { UserModel } from '../models/user-model';

const initialState = {
  auth: undefined,
  loginUser: () => {},
  logoutUser: () => {},
};

export interface AuthContextProps {
  auth: UserModel | undefined;
  loginUser: (user: UserModel) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<UserModel>();
  const loginUser = (user: UserModel) => setAuth(user);
  const logoutUser = () => setAuth(undefined);

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
