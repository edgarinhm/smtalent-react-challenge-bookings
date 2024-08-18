import { useContext } from 'react';
import AuthContext, { AuthContextProps } from '../context/AuthProvider';

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth muse be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
