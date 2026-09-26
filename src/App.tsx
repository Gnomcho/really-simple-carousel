import CarouselItem from "./components/carousel-item";
import { Carousel } from "./components/carousel";

const images = [
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 200, height: 200 },
  { width: 1000, height: 200 },
  { width: 2000, height: 200 },
  { width: 742, height: 318 },
  { width: 183, height: 875 },
  { width: 956, height: 142 },
  { width: 421, height: 693 },
  { width: 608, height: 527 },
  { width: 275, height: 964 },
  { width: 839, height: 206 },
  { width: 514, height: 781 },
  { width: 367, height: 439 },
  { width: 990, height: 650 },
  { width: 126, height: 998 },
  { width: 683, height: 354 },
  { width: 452, height: 817 },
  { width: 798, height: 263 },
  { width: 231, height: 590 },
  { width: 567, height: 731 },
  { width: 914, height: 485 },
  { width: 345, height: 109 },
  { width: 860, height: 902 },
  { width: 629, height: 676 },
];

function App() {
  return (
    <>
      <div className="flex h-dvh flex-col justify-center">
        <Carousel className="max-h-[30dvh]" threshold={10}>
          {Array.from({ length: 1000 }, (_, index) => (
            <CarouselItem key={index} id={index} {...images[index % images.length]} />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default App;
