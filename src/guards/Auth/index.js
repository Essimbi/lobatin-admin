import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
    const token = localStorage.getItem('labatin_admin_access_token');
  
    return token ? children : <Navigate to="/" />;
};

export default Auth