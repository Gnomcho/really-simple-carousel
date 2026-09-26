import { cn } from "../lib/utils";

type CarouselItemProps = {
  width?: number;
  height?: number;
  alt?: string;
  id?: number;
  className?: string;
};

export default function CarouselItem({
  width = 800,
  height = 600,
  alt = "Random photo from Picsum",
  id = 0,
  className = "",
}: CarouselItemProps) {
  const src = `https://picsum.photos/${width}/${height}?browserCache=${id}`;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-full w-auto max-w-full object-contain", className)}
      loading="lazy"
    />
  );
}
