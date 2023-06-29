import React, { useEffect } from 'react';

function ImageOverlay({ image, onClose }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className="image-overlay">
      <div className="image-container">
        <img src={image} alt="Overlay" />
      </div>
    </div>
  );
}

export default ImageOverlay;