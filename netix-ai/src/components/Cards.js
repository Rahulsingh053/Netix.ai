import React, { useState, useEffect } from "react";
import ImageOverlay from "./ImageOverlay";
import './CardList.css';
import './Card.css'; 


const Card = ({ type, title, position, card }) => {
  const getThumbnail = (type) => {
    switch (type) {
      case "bank-draft":
        return "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif";
      case "bill-of-lading":
        return "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif";
      case "invoice":
        return "https://media.giphy.com/media/Lq0h93752f6J9tijrh/giphy.gif";
      case "bank-draft-2":
        return "https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif";
      case "bill-of-lading-2":
        return "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";
      default:
        return "";
    }
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setShowOverlay(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div onClick={handleClick}>
      <p alt={card.title}> {card.title} </p>
      <img src={getThumbnail(card.type)} />
      {showOverlay && (
        <ImageOverlay className="overlay" image={card.image} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

export default Card;
