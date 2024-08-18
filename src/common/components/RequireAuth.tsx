import { Outlet, Navigate, type Path, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequiereAuth = ({
  redirectTo,
}: {
  redirectTo: string | Partial<Path>;
}) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log('auth', auth);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};

export default RequiereAuth;
