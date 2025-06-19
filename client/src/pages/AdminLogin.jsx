import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', form);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3">
        <h2 className="text-xl font-semibold mb-2">Admin Login</h2>
        <input type="text" placeholder="Username" className="input" required
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" className="input" required
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
