import React, { useState } from "react";

const Popup_gallery = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="gallery-popup-overlay">
      <div className="gallery-popup-content">
       
        <button className="gallery-popup-close-btn" onClick={onClose}>
          ×
        </button>

    
        <div className="gallery-image-container">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </div>

      
        <button className="gallery-prev-btn" onClick={prevImage}>‹</button>
        <button className="gallery-next-btn" onClick={nextImage}>›</button>
      </div>
    </div>
  );
};

export default Popup_gallery;
