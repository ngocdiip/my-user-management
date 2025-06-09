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
      const response = await API.post('/auth/login', {
        username,
        password
      });

      const { accessToken } = response.data;

if (!accessToken) {
  throw new Error('Token không hợp lệ từ server');
}

setAuthToken(accessToken);
localStorage.setItem('token', accessToken);

// Nếu không có user từ backend, lưu thông tin giả lập (hoặc có thể gọi /me sau này)
const mockUser = { username }; // hoặc để rỗng nếu không cần

localStorage.setItem('user', JSON.stringify(mockUser));
onLogin(mockUser);

    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Đăng nhập thất bại';
      setError(`❌ Đăng nhập thất bại: ${msg}`);
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
