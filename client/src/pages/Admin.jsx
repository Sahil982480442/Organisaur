import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [submissions, setSubmissions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ title: '', description: '' });
  const [editTopic, setEditTopic] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin-login');

    axios.get('http://localhost:5000/api/submissions/all')
      .then(res => setSubmissions(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data));
  }, []);

  const approve = async (id) => {
    await axios.put(`http://localhost:5000/api/submissions/approve/${id}`);
    alert("Approved!");
    setSubmissions(submissions.filter(s => s._id !== id));
  };

  const addTopic = async () => {
    await axios.post('http://localhost:5000/api/topics', newTopic);
    setNewTopic({ title: '', description: '' });
    const res = await axios.get('http://localhost:5000/api/topics');
    setTopics(res.data);
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/topics/${editTopic._id}`, editTopic);
    setEditTopic(null);
    const res = await axios.get('http://localhost:5000/api/topics');
    setTopics(res.data);
  };

  const deleteTopic = async (id) => {
    if (!window.confirm("Delete this topic?")) return;
    await axios.delete(`http://localhost:5000/api/topics/${id}`);
    const res = await axios.get('http://localhost:5000/api/topics');
    setTopics(res.data);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login';
          }}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Create New Topic</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTopic.description}
          onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={addTopic} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Manage Topics</h2>
        {topics.map((t) => (
          <div key={t._id} className="flex items-center justify-between border-b py-2">
            {editTopic && editTopic._id === t._id ? (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={editTopic.title}
                  onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
                  className="border p-1 flex-1"
                />
                <input
                  type="text"
                  value={editTopic.description}
                  onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
                  className="border p-1 flex-1"
                />
                <button onClick={saveEdit} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
                <button onClick={() => setEditTopic(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => setEditTopic(t)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                  <button onClick={() => deleteTopic(t._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Pending Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-500">No pending submissions.</p>
        ) : (
          submissions.map(sub => (
            <div key={sub._id} className="p-4 border rounded mb-3 bg-white shadow">
              <p><strong>Name:</strong> {sub.name}</p>
              <p><strong>Email:</strong> {sub.email}</p>
              <p><strong>Type:</strong> {sub.type}</p>
              <p><strong>Link:</strong> <a href={sub.link} target="_blank" className="text-blue-600 underline">{sub.link}</a></p>
              <button onClick={() => approve(sub._id)} className="mt-2 px-3 py-1 bg-green-600 text-white rounded">Approve</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
