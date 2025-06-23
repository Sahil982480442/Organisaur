import { useEffect, useState } from 'react';
import axios from 'axios';
import TopicCard from '../components/TopicCard';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Topics</h1>

        {/* 🔍 Search Input Right-Aligned */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded shadow-sm"
          />
        </div>
      </div>

      {/* 🧾 Topics */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <TopicCard key={topic._id} topic={topic} />
          ))
        ) : (
          <p className="text-gray-500">No topics found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
