import { useState, useEffect } from 'react';
import UploadForm from './UploadForm';
import axios from 'axios';

const TopicCard = ({ topic }) => {
  const [showForm, setShowForm] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/submissions/approved/${topic._id}`)
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  }, [topic._id]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">{topic.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{topic.description}</p>

      <button
        onClick={() => setShowForm(true)}
        className="mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload Resource
      </button>

      {showForm && <UploadForm topicId={topic._id} closeForm={() => setShowForm(false)} />}

      <h4 className="font-medium mt-3">Approved Resources:</h4>
      {resources.length === 0 ? (
        <p className="text-sm text-gray-500">No approved resources yet.</p>
      ) : (
        <ul className="list-disc list-inside text-sm mt-1">
          {resources.map((res) => (
            <li key={res._id}>
              <a href={res.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                 {res.type} {/*by {res.name} */}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopicCard;
