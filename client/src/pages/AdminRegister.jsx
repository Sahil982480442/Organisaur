import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/register', form);
      alert("Registration successful. Please login.");
      navigate('/admin-login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={register} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3">
        <h2 className="text-xl font-semibold mb-2">Admin Register</h2>
        <input type="text" placeholder="Username" className="input" required
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Password" className="input" required
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
