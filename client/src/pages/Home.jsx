import { useEffect, useState } from 'react';
import axios from 'axios';
import TopicCard from '../components/TopicCard';

const Home = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📚 Topics</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {topics.map(topic => (
          <TopicCard key={topic._id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Home;
