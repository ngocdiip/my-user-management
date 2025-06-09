import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import { setAuthToken } from './api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData && userData !== 'undefined') {
      try {
        const parsedUser = JSON.parse(userData);
        setAuthToken(token);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <>
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : (
        <UserManagement
          user={user}
          onLogout={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }}
        />
      )}
    </>
  );
}

export default App;
