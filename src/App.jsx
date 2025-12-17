import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarLayout from './components/layout/SidebarLayout';
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
          <Route path="/" element={<SidebarLayout />}>
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
