import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

type CarouselProps = {
  children: ReactNode;
  onIndexChange?: (index: number) => void;
  threshold?: number;
  className?: string;
};

const SCROLL_SPACE = 1_000_000;
const SCROLL_CENTER = SCROLL_SPACE / 2;

function wrap(index: number, count: number) {
  return ((index % count) + count) % count;
}

function getCenterX(element: Element) {
  const bounds = element.getBoundingClientRect();
  return bounds.left + bounds.width / 2;
}

function getContentX(element: Element, viewport: HTMLElement) {
  return getCenterX(element) - viewport.getBoundingClientRect().left + viewport.scrollLeft;
}

function CarouselMultipleItems({ children, threshold = 10, className }: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const listOffset = useRef(SCROLL_CENTER);
  const anchor = useRef<{ element: HTMLElement; x: number } | null>(null);

  function handleScroll() {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;

    const centerX = getCenterX(viewport);
    let closest: HTMLElement | undefined;
    let minDist = Infinity;

    for (const child of list.children) {
      const distance = Math.abs(centerX - getCenterX(child));
      if (child instanceof HTMLElement && distance < minDist) {
        minDist = distance;
        closest = child;
      }
    }

    if (!closest) return;
    const newIndex = Number(closest.dataset.slideIndex);
    if (newIndex !== currentIndex) {
      anchor.current = { element: closest, x: getContentX(closest, viewport) };
      setCurrentIndex(newIndex);
    }
  }

  function handleScrollEnd() {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;

    const diff = SCROLL_CENTER - viewport.scrollLeft;
    listOffset.current += diff;
    list.style.left = `${listOffset.current}px`;
    viewport.scrollLeft += diff;
    if (anchor.current) anchor.current.x += diff;
  }

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;

    if (anchor.current) {
      const { element, x } = anchor.current;
      listOffset.current += x - getContentX(element, viewport);
      list.style.left = `${listOffset.current}px`;
      anchor.current = null;
    }
  }, [currentIndex, threshold]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;

    const child = list.children[threshold];
    if (!child) return;
    viewport.scrollLeft += getCenterX(child) - getCenterX(viewport);
  }, []);

  return (
    <section className={cn("mx-auto flex h-200 w-full max-w-full flex-col overflow-hidden", className)}>
      <div className="@container-size relative min-h-0 w-full flex-1">
        <div
          ref={viewportRef}
          onScroll={handleScroll}
          onScrollEnd={handleScrollEnd}
          className="h-full overflow-x-auto overscroll-contain [overflow-anchor:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative h-full overflow-hidden" style={{ width: SCROLL_SPACE }}>
            <ul ref={listRef} className="absolute top-0 flex h-full w-max" style={{ left: SCROLL_CENTER }}>
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
        </div>
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
