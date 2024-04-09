import { render, screen } from '@testing-library/react';
import MyCard from './card';

test('renders card with image', () => {
  const props = {
    title: 'Sample Title',
    description: 'Sample Description',
    imageUrl: 'https://example.com/sample-image.jpg',
    linkUrl: 'https://example.com/sample-link',
  };

  render(<MyCard {...props} />);

  const imageElement = screen.getByAltText('Card image');
  expect(imageElement).toBeInTheDocument();
});

test('renders "No Image" when imageUrl is not provided', () => {
  const props = {
    title: 'Sample Title',
    description: 'Sample Description',
    imageUrl: '', // No image URL
    linkUrl: 'https://example.com/sample-link',
  };

  render(<MyCard {...props} />);

  const noImageText = screen.getByText('No Image');
  expect(noImageText).toBeInTheDocument();
});

test('calls handleClick when card link is clicked', () => {
  const props = {
    title: 'Sample Title',
    description: 'Sample Description',
    imageUrl: 'https://example.com/sample-image.jpg',
    linkUrl: 'https://example.com/sample-link',
  };

  const handleClickMock = jest.fn();

  render(<MyCard {...props} onCardClick={handleClickMock}/>);

  const cardLink = screen.getByText('Sample Title');
  cardLink.click();

  expect(handleClickMock).toHaveBeenCalledTimes(1);
});


