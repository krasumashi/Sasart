import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudioLayout from './components/layout/StudioLayout';
import Home from './views/Home';
import Library from './views/Library';
import Create from './views/Create';
import Profile from './views/Profile';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<StudioLayout />}>
            <Route index element={<Home />} />
            <Route path="library" element={<Library />} />
            <Route path="create" element={<Create />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
