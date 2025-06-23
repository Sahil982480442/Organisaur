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

  const discard = async (id) => {
    if (!window.confirm("Are you sure you want to discard this submission?")) return;
    await axios.delete(`http://localhost:5000/api/submissions/discard/${id}`);
    alert("Discarded!");
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
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login';
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Create New Topic */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Topic</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Title"
            value={newTopic.title}
            onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
            className="border rounded p-2 flex-1 min-w-[200px]"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTopic.description}
            onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
            className="border rounded p-2 flex-1 min-w-[200px]"
          />
          <button
            onClick={addTopic}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Manage Topics */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Topics</h2>
        {topics.map((t) => (
          <div key={t._id} className="flex justify-between items-center border-b py-3">
            {editTopic && editTopic._id === t._id ? (
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={editTopic.title}
                  onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
                  className="border p-2 flex-1"
                />
                <input
                  type="text"
                  value={editTopic.description}
                  onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
                  className="border p-2 flex-1"
                />
                <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                <button onClick={() => setEditTopic(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold text-lg">{t.title}</h3>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => setEditTopic(t)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => deleteTopic(t._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pending Submissions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pending Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-500">No pending submissions.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submissions.map((sub) => (
              <div key={sub._id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                <p className="mb-1"><span className="font-semibold">Name:</span> {sub.name}</p>
                <p className="mb-1"><span className="font-semibold">Email:</span> {sub.email}</p>
                <p className="mb-1"><span className="font-semibold">Type:</span> {sub.type}</p>
                <p className="mb-1">
                  <span className="font-semibold">Link:</span>{' '}
                  <a href={sub.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    {sub.link}
                  </a>
                </p>
                <p className="mb-2"><span className="font-semibold">Topic:</span> {sub.topicId?.title || 'Unknown'}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => approve(sub._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => discard(sub._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Discard
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
