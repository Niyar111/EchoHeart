import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navber from "./components/Navber";
import Explore from "./pages/explore";
import Home from "./pages/home";
import Blogs from "./pages/blogs";
import Search from "./components/search";
import Profile from "./components/profile";
import Registration from "./components/auth/registration";
import LeftNav from "./components/leftNav";
import Dashboard from "./components/dashboard";
import Notification from "./components/notification";
import Settings from "./components/settings";
import CreatePost from "./components/CreatePost";
import SafeZone from "./components/SafeZone";
import Alert from "./utils/alert";

function App() {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setShowSearch(true);
  };

  const handleCloseSearch = () => setShowSearch(false);

  return (
    <div className="bg-white min-h-screen w-full flex">
      <Router>
        {/* ---------------- Unauthenticated Section ---------------- */}
        <section className="notloggedin">
          <Navber onSearchClick={handleSearchClick} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </section>

        {/* ---------------- Authenticated Section ---------------- */}
        <section className="loggedin flex w-full h-fit">
          {/* Floating Alert Button + ASOS popup is handled inside Alert.jsx */}
          
          <Alert/>

          {/* Sidebar */}
          <LeftNav />

          {/* Main Routes */}
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/blog/:id" element={<Blogs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/safe-zone" element={<SafeZone />} />
          </Routes>
        </section>

        {/* ---------------- Search Popup ---------------- */}
        {showSearch && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="relative bg-white w-full md:w-[40%] rounded-lg p-6">
              <Search close={handleCloseSearch} />
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;