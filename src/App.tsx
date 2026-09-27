import CarouselItem from "./components/carousel-item";
import { Carousel } from "./components/carousel";

const images = [
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 100, height: 100 },
  { width: 500, height: 100 },
  { width: 1000, height: 100 },
  { width: 371, height: 159 },
  { width: 91, height: 437 },
  { width: 478, height: 71 },
  { width: 210, height: 346 },
  { width: 304, height: 263 },
  { width: 137, height: 482 },
  { width: 419, height: 103 },
  { width: 257, height: 390 },
  { width: 183, height: 219 },
  { width: 495, height: 325 },
  { width: 63, height: 499 },
  { width: 341, height: 177 },
  { width: 226, height: 408 },
  { width: 399, height: 131 },
  { width: 115, height: 295 },
  { width: 283, height: 365 },
  { width: 457, height: 242 },
  { width: 172, height: 54 },
  { width: 430, height: 451 },
  { width: 314, height: 338 },
];

function App() {
  return (
    <>
      <div className="flex h-dvh flex-col justify-center">
        <Carousel className="max-h-[30dvh]" threshold={10}>
          {Array.from({ length: 10000 }, (_, index) => (
            <CarouselItem key={index} id={index} {...images[index % images.length]} />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default App;
