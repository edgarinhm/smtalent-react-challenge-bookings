import { ReactNode } from 'react';
import { ApiBaseProvider } from './ApiBaseProvider';
import { AuthProvider } from './AuthProvider';

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <AuthProvider>
      <ApiBaseProvider>{children}</ApiBaseProvider>
    </AuthProvider>
  );
};
