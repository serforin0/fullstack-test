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
  return (
    <div className='grid-container'>
      {cardsData.map((card, index) => (
        <MyCard
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.image}
          linkUrl={card.link_url}
        />
      ))}
    </div>
  );
};

export default MyCardGrid;
