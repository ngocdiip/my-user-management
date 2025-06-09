import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import { setAuthToken } from './api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setAuthToken(token);
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : (
        <UserManagement user={user} onLogout={() => setUser(null)} />
      )}
    </>
  );
}

export default App;
