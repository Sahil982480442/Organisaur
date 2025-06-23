import { Link } from 'react-router-dom';
import { useState } from 'react';
import UploadForm from './UploadForm';

const TopicCard = ({ topic }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{topic.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
      </div>

      <div className="flex gap-3">
        {/* View Button */}
        <Link
          to={`/topic/${topic._id}`}
          className="px-4 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-all text-sm font-medium shadow-sm"
        >
          📂 View Resources
        </Link>

        {/* Upload Button */}
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all text-sm font-medium shadow-sm"
        >
          ⬆️ Upload Resource
        </button>
      </div>

      {showForm && (
        <div className="mt-4">
          <UploadForm topicId={topic._id} closeForm={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default TopicCard;
