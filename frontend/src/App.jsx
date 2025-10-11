import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Settings from "./components/settings"
import CreatePost from "./components/CreatePost";
import SafeZone from "./components/SafeZone";
import Alert from "./utils/alert";
import ASOS from "./components/aSOS"
// import SSOS from "./components/sSOS"
import { useState } from "react";
import { useRoute } from './context/route';


function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [showaSOS, setaSOS] = useState(false)

  const aSOShandler = () => {
    setaSOS(!showaSOS)
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    setShowSearch(true);
  };

  const handleCloseSearch = () => setShowSearch(false);

  const { user, loading } = useRoute();

  return (
    <div className="bg-white min-h-screen w-full flex">

      <Router>
        {/* show not-logged-in section only when no user */}
        {!loading && !user && (
          <section className={`notloggedin`}>
            <Navber onSearchClick={handleSearchClick} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </section>
        )}

        {/* show logged-in section when user exists */}
        {!loading && user && (
          <section className="loggedin flex w-full h-fit">
            <Alert />
            <ASOS onASOSclick={aSOShandler} />
            <LeftNav />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/blog/:id" element={<Blogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/safe-zone" element={<SafeZone />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </section>
        )}

        {showSearch && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-5">
            <div className="relative z-6 bg-white w-full flex justify-center items-center  h-[30%] md:w-[40%] rounded-lg">

              <Search close={handleCloseSearch} />
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;