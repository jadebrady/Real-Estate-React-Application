import Carousel from 'react-bootstrap/Carousel';
import house from '../assets/house.png';
import living from '../assets/living.png';
import bathroom from '../assets/bathroom.png';

export default function CarouselHouse() {
  return (
    <Carousel fade variant='dark'>
      <Carousel.Item>
        <img src={house} alt="Copilot generated house" style={{ width: "80%", height: "600px", objectFit: "cover" }} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={living} alt="Copilot generated living room" style={{ width: "80%", height: "600px", objectFit: "cover" }} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={bathroom} alt="Copilot generated bathroom" style={{ width: "80%", height: "600px", objectFit: "cover" }} />
      </Carousel.Item>
    </Carousel>
  );
}