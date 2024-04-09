import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { MdImage } from 'react-icons/md';
import '../components/card.css';

const CardDetailScreen: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get('data');

    const data = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;
    // return <div>
    //     {data.imgUrl} 
    //     <br />
    //     {data.title} 
    //     <br />
    //     {data.desc}
    //     </div>
    return <Card className="my-card-detail">
    {/* Display the image */}
    {data.imgUrl ? (
      <Card.Img className="my-card-img" variant="top" src={data.imgUrl} alt="Card image" />
    ) : (
      <p className="my-card-no-img-txt">
        No Image <br /> <MdImage className="my-card-no-img" />
      </p>
    )}

    {/* Overlay with title and description */}
    <Card.Body>
      <Card.Title className="my-card-title">{data.title}</Card.Title>
      <Card.Text className="my-card-desc-detail">{data.desc}</Card.Text>
    </Card.Body>
  </Card>
}

export default CardDetailScreen;