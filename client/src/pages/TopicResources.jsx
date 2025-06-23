import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TopicResources = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicAndResources = async () => {
      try {
        const topicRes = await axios.get(`http://localhost:5000/api/topics/${topicId}`);
        const resourcesRes = await axios.get(`http://localhost:5000/api/submissions/approved/${topicId}`);
        setTopic(topicRes.data);
        setResources(resourcesRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchTopicAndResources();
  }, [topicId]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 border">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{topic.title}</h1>
        <p className="text-gray-600 mb-6">{topic.description}</p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">✅ Approved Resources</h2>

        {resources.length === 0 ? (
          <div className="text-sm text-gray-500">No approved resources yet.</div>
        ) : (
          <ul className="space-y-3">
            {resources.map((res) => (
              <li key={res._id} className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 font-medium underline hover:text-blue-900"
                >
                  📎 {res.type}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopicResources;
