import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

type CarouselProps = {
  children: ReactNode;
  onIndexChange?: (index: number) => void;
  threshold?: number;
  className?: string;
};

function wrap(index: number, count: number) {
  return ((index % count) + count) % count;
}

function getCenterX(element: Element) {
  const bounds = element.getBoundingClientRect();
  return bounds.left + bounds.width / 2;
}

function CarouselMultipleItems({ children, threshold = 10, className }: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const listRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentIndexLastPosition = useRef<number | undefined>(undefined);

  function handleScroll() {
    console.error("handleScroll");
    const curr = listRef.current;
    if (!curr) return;
    const centerX = getCenterX(curr);
    let closest: Element | undefined = undefined;
    let minDist = Infinity;

    for (const children of curr.children) {
      const diff = Math.abs(centerX - getCenterX(children));
      if (diff < minDist) {
        minDist = diff;
        closest = children;
      }
    }

    if (!(closest instanceof HTMLElement)) return;

    const newIndex = Number(closest.dataset.slideIndex);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      currentIndexLastPosition.current = getCenterX(closest);
    }
  }

  useLayoutEffect(() => {
    const curr = listRef.current;
    if (!curr) return;
    const child = [...curr.children][threshold];

    if (currentIndexLastPosition.current === undefined) {
      child.scrollIntoView({
        behavior: "instant",
        inline: "center",
        block: "nearest",
      });

      return;
    }

    const childCenterX = getCenterX(child);

    console.error(1, currentIndex, curr.scrollLeft, currentIndexLastPosition.current, childCenterX);
    curr.scrollLeft = curr.scrollLeft + (childCenterX - currentIndexLastPosition.current);
  }, [currentIndex]);

  return (
    <section className={cn("mx-auto flex h-200 w-full max-w-full flex-col overflow-hidden", className)}>
      <div className="[container-type:size] relative min-h-0 w-full flex-1">
        <ul
          ref={listRef}
          onScroll={handleScroll}
          className="flex h-full snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-contain [overflow-anchor:none] [&::-webkit-scrollbar]:hidden"
        >
          {Array.from({ length: threshold * 2 + 1 }, (_, offset) => {
            const index = currentIndex - threshold + offset;
            return (
              <li key={index} data-slide-index={index} className="w-max shrink-0">
                {slides[wrap(index, count)]}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Carousel(props: CarouselProps) {
  const childrenCount = Children.toArray(props.children).length;
  if (childrenCount <= 1) {
    return props.children;
  }

  return <CarouselMultipleItems {...props} />;
}
