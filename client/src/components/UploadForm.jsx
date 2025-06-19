import { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ topicId, closeForm }) => {
  const [form, setForm] = useState({ name: '', email: '', link: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/submissions', { ...form, topicId });
      alert("Submitted! Awaiting approval.");
      closeForm();
    } catch (err) {
      alert("Error while submitting!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-2">Upload Resource</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input type="text" placeholder="Your Name" required className="input" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Your Email" required className="input" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="text" placeholder="Link (Google Drive, YouTube...)" required className="input" onChange={e => setForm({ ...form, link: e.target.value })} />
          <input type="text" placeholder="Type (PPT, Video...)" required className="input" onChange={e => setForm({ ...form, type: e.target.value })} />
          <div className="flex gap-2 justify-end">
            <button type="submit" className="px-4 py-1 bg-green-600 text-white rounded">Submit</button>
            <button type="button" onClick={closeForm} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
