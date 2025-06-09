import React, { useEffect, useState } from 'react';
import API from '../api';

function UserManagement({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/user');
      setUsers(res.data);
      setError('');
    } catch (err) {
      setError('Lấy danh sách user thất bại');
    }
    setLoading(false);
  };

  const handleAddUser = async () => {
    const { username, email, password } = newUser;
    if (!username || !email || !password) return alert('Vui lòng nhập đầy đủ thông tin');
    try {
      const res = await API.post('/user', newUser);
      setUsers([...users, res.data]);
      setNewUser({ username: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      alert('Thêm user thất bại');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
    try {
      await API.delete(`/user/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Xóa user thất bại');
    }
  };

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ccc' }}>
      <h2>Quản lý người dùng</h2>
      <p>Xin chào, <b>{user.username || user.name || 'User'}</b>! <button onClick={handleLogout}>Đăng xuất</button></p>

      {loading ? <p>Đang tải dữ liệu...</p> : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h3>Danh sách người dùng</h3>
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th><th>Tên đăng nhập</th><th>Email</th><th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td><button onClick={() => handleDeleteUser(u.id)}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: 20 }}>Thêm người dùng mới</h3>
          <input
            placeholder="Tên đăng nhập"
            value={newUser.username}
            onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            style={{ marginRight: 10 }}
          />
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            style={{ marginRight: 10 }}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            style={{ marginRight: 10 }}
          />
          <button onClick={handleAddUser}>Thêm</button>
        </>
      )}
    </div>
  );
}

export default UserManagement;