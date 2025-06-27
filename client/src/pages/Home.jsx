import { useEffect, useState } from 'react';
import axios from 'axios';
import TopicCard from '../components/TopicCard';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const exampleSearches = ['DYS', 'Bhagavad Gita', 'Srimad Bhagavatam', 'Bhakti Yoga'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % exampleSearches.length);
    }, 3000); // every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="flex justify-between items-center flex-wrap mb-6">
        <h1 className="text-3xl font-bold text-blue-900">📚 Topics</h1>

        {/* 🔍 Animated Search Placeholder */}
        <div className="w-full md:w-1/3 relative mt-4 md:mt-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pr-4 pl-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
          <div className="absolute left-4 top-3 text-gray-400 pointer-events-none text-sm">
            <span className="text-gray-500">Search for </span>
            <span
              key={placeholderIndex}
              className="inline-block animate-fade-up transition-all duration-500"
            >
              {exampleSearches[placeholderIndex]}...
            </span>
          </div>
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
