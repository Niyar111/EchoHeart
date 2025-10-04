import React from 'react'
import Gapi from '../assets/Gapi.png'
const Circle = () => {
  // Arrange images in a circle using absolute positioning
  const images = Array.from({ length: 12 });
  const radius = 620; // Adjust radius as needed
  const center = 200; // Center offset for container size

  return (
    <div
      className="absolute slow-spin top-[80%] flex items-center"
      style={{
        width: `${center * 2}px`,
        height: `${center * 2}px`,
      }}
    >
      {images.map((_, i) => {
        const angle = (i / images.length) * 2 * Math.PI;
        const x = center + radius * Math.cos(angle) - 64; // 64 = half of image width (128/2)
        const y = center + radius * Math.sin(angle) - 64; // 64 = half of image height (128/2)
        return (
          <img
            key={i}
            className="absolute w-[14rem]"
            src={Gapi}
            alt="gapi image"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default Circle