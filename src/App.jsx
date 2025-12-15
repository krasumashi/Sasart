import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import BottomNav from './components/navigation/BottomNav';
import './styles/layout.css'; // specific layout styles if needed

import Home from './views/Home';
import Library from './views/Library';
import Create from './views/Create';
import Profile from './views/Profile';

function Layout() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
