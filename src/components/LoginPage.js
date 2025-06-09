import React, { useState } from 'react';
import API, { setAuthToken } from '../api';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await API.post('/auth/login', { username, password });
      const { token, user } = response.data;

      setAuthToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLogin(user);
    } catch (err) {
      setError('Đăng nhập thất bại: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto', padding: 20, border: '1px solid #ccc' }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên đăng nhập:</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Mật khẩu:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ marginTop: 10 }}>Đăng nhập</button>
      </form>
    </div>
  );
}

export default LoginPage;