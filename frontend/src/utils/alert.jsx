import React, { useState } from "react";
import { Plus } from "lucide-react";
import ASOS from "../components/aSOS";

const Alert = () => {
  const [isActive, setIsActive] = useState(false);
  const [showASOS, setShowASOS] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);
  const toggleASOS = () => setShowASOS(!showASOS);

  return (
    <>
      {/* Floating main "+" button */}
      <section className="fixed bottom-6 right-6 z-50">
        <div
          className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 cursor-pointer transition-all"
          onClick={toggleMenu}
        >
          <Plus
            className={`transition-transform duration-300 ${
              isActive ? "rotate-45" : ""
            }`}
          />
        </div>

        {/* Buttons that appear when menu is open */}
        {isActive && (
          <div className="flex flex-col gap-4 absolute bottom-20 right-0">
            <button
              onClick={toggleASOS}
              className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 transition"
            >
              aSOS
            </button>
            <button className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition">
              sSOS
            </button>
          </div>
        )}
      </section>

      {/* Popup modal showing ASOS form */}
      {showASOS && (
            <ASOS close={toggleASOS}/>
      )}
    </>
  );
};

export default Alert;