import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FiEye } from 'react-icons/fi'; // Importa el icono del ojo
import './card.css';

interface MyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string; 
}

const MyCard: React.FC<MyCardProps> = ({ title, description, imageUrl, linkUrl }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setClicked(true);
  };

  return (
    <a className='card-link' href={linkUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick}> 
      <Card className="my-card">
        {/* Display the image */}
        <Card.Img className='my-card-img' variant="top" src={imageUrl} alt="Card image" />

        {/* Overlay with title and description */}
        <Card.Body>
          <Card.Title className='my-card-title'>{title}</Card.Title>
          <Card.Text className='my-card-desc'>{description}</Card.Text>
          {clicked && <FiEye className='my-card-seen-icon' />} {/* Display the eye icon if the card has been clicked */}
        </Card.Body>
      </Card>
    </a>     
  );
};

export default MyCard;
