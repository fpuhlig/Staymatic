import { ImageSlider } from '../common';

interface ImagePreviewProps {
  images: string[];
  title: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// Simple wrapper for property cards (TDA - Tell, Don't Ask)
export const ImagePreview = ({ images, title, className, onClick }: ImagePreviewProps) => (
  <ImageSlider
    images={images}
    title={title}
    className={className}
    variant="card"
    showDots
    showArrows
    showCounter
    onClick={onClick}
  />
);
