import React, { useState } from 'react';

function Settings() {
  const [profile, setProfile] = useState({
    name: 'Paramjit Saikia',
    email: 'paramjit@example.com',
  });

  const [notifications, setNotifications] = useState({
    sms: true,
    email: false,
    push: true,
  });

  const [theme, setTheme] = useState('light');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 font-inter">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
          ⚙️ Settings
        </h2>

        {/* Profile Settings */}
        <section className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Settings
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="self-start bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition">
              Save Changes
            </button>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Notification Preferences
          </h3>
          <div className="flex flex-col gap-4">
            {['sms', 'email', 'push'].map((type) => (
              <div
                key={type}
                className="flex items-center justify-between border-b border-gray-100 pb-3"
              >
                <span className="capitalize text-gray-700">{type} Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[type]}
                    onChange={() => handleNotificationToggle(type)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-green-400 transition-all">
                    <div className="absolute top-0.5 left-[2px] bg-white border border-gray-300 h-5 w-5 rounded-full peer-checked:translate-x-full transition-all"></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Theme Settings */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Theme Settings
          </h3>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={handleThemeChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              Light
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={handleThemeChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              Dark
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;