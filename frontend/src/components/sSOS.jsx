import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SSOS = ({close}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [customAlert, setCustomAlert] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setDistrict(data.address.county || data.address.district || "");
            setState(data.address.state || "");
          } catch (err) {
            alert("Could not fetch location details.",err);
          }
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!alertType) {
      alert("Please enter a alterttype");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    console.log("Post created:", { image, alertType, district, state });
    toast.success(`Alert sent successfully for ${alertType || customAlert}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="absolute left-1/4 top-1/6 z-22  w-3xl mx-auto p-6 bg-gradient-to-b from-red-50 to-indigo-50 rounded-xl shadow-xl">
      <Plus
      className="rotate-45"
      onClick={close}
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Create an Area Alert
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Type of Alert
          </label>
          <select
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
          >
            <option value="">Select Alert Type</option>
            <option value="flood">Local Fights</option>
            <option value="earthquake">Terrist Attact</option>
            <option value="other">Other</option>
          </select>
        </div>

        {alertType === "other" && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Specify Alert
            </label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              placeholder="Enter alert type"
              value={customAlert}
              onChange={(e) => setCustomAlert(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex gap-8">

            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-xl"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-xl"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              onClick={getCurrentLocation}
            >
              Use Current Location
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border-2 border-gray-300 rounded-xl cursor-pointer"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-4 border-2 border-gray-300 rounded-xl overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-500"
        >
          Send Alert
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SSOS;