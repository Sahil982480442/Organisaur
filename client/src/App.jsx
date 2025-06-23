import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import TopicResources from './pages/TopicResources';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/topic/:topicId" element={<TopicResources />} />
      </Routes>
    </Router>
  );
}

export default App;
