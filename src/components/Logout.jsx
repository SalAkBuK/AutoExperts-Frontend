import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/admin');
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}

export default Logout;