import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { FiEye } from 'react-icons/fi';
import { MdImage } from 'react-icons/md';
import './card.css';
import { act } from 'react-dom/test-utils';

interface MyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  onCardClick?: (title: string, description: string, imageUrl: string) => void;
}

const MyCard: React.FC<MyCardProps> = ({ title, description, imageUrl, linkUrl, onCardClick }) => {
  const [clicked, setClicked] = useState(false);

  // Load initial clicked state from local storage based on the card title
  useEffect(() => {
    const savedClickedState = localStorage.getItem(`myCardClicked_${title}`);
    if (savedClickedState) {
      setClicked(JSON.parse(savedClickedState));
    }
  }, [title]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    act(() => setClicked(true));
    // Save clicked state to local storage using the card title as the key
    localStorage.setItem(`myCardClicked_${title}`, JSON.stringify(true));

    // Invoke the prop function if provided
    if (onCardClick) {
      onCardClick(title, description, imageUrl);
    }
  };

  return (
    <a className="card-link" href={linkUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      <Card className="my-card" id='card'>
        {/* Display the image */}
        {imageUrl ? (
          <Card.Img className="my-card-img" variant="top" src={imageUrl} alt="Card image" />
        ) : (
          <p className="my-card-no-img-txt">
            No Image <br /> <MdImage className="my-card-no-img" />
          </p>
        )}

        {/* Overlay with title and description */}
        <Card.Body>
          <Card.Title className="my-card-title">{title}</Card.Title>
          <Card.Text className="my-card-desc">{description}</Card.Text>
          {clicked && <FiEye className="my-card-seen-icon" />} {/* Display the eye icon if the card has been clicked */}
        </Card.Body>
      </Card>
    </a>
  );
};

export default MyCard;
