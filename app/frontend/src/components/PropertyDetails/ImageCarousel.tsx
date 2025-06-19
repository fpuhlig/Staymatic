import { ImageSlider } from '../common';

interface ImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

// Simple wrapper for property details (TDA - Tell, Don't Ask)
export const ImageCarousel = ({ images, title, className }: ImageCarouselProps) => (
  <ImageSlider
    images={images}
    title={title}
    className={className}
    variant="details"
    showThumbnails
    showArrows
    showCounter
  />
);
