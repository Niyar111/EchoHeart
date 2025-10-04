import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navber from "./components/Navber";
import Explore from "./pages/explore";
import Home from "./pages/home";
import LandingPage from "./components/LandingPage";
import Search from "./components/search";
import Profile from "./components/profile";
import Library from "./pages/library";
import BlogPost from "./pages/blogs";
import { useState } from "react";


function App() {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setShowSearch(true);
  };

  const handleCloseSearch = () => setShowSearch(false);

  return (
    <div className="bg-white min-h-screen w-full flex items-center justify-center relative">
      <Router>
        <Navber onSearchClick={handleSearchClick} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/legacy-library" element={<Library/>}/>
          <Route path="/legacy-library/:postSlug" element={<BlogPost/>}/>
        </Routes>
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