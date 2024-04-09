import React from 'react';
import MyCard from './card';
import './card-grid.css';

interface CardData {
  title: string;
  description: string;
  image: string;
  link_url: string;
}

interface MyCardGridProps {
  cardsData: CardData[];
}

const MyCardGrid: React.FC<MyCardGridProps> = ({ cardsData }) => {
  const onClick = (title: string, description: string, imageUrl: string) => {
    // Open a new tab or window with the same card details
    const data = { title: title, desc: description, imgUrl: imageUrl };
    const encodedData = encodeURIComponent(JSON.stringify(data));
    window.open(`/detail?data=${encodedData}`, '_blank');
  };
  return (
    <div className='grid-container'>
      {cardsData.map((card, index) => (
        <MyCard
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.image}
          linkUrl={card.link_url}
          onCardClick={onClick}
        />
      ))}
    </div>
  );
};

export default MyCardGrid;
