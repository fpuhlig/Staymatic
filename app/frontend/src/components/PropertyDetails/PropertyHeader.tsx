import { PropertyWithHost } from '../../../../shared/src/types';
import { ImageCarousel } from './ImageCarousel';

interface PropertyHeaderProps {
  property: PropertyWithHost;
}

export const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  return (
    <div className="mb-8">
      {/* Property Images Carousel */}
      <div className="mb-6">
        <ImageCarousel
          images={
            property.images && property.images.length > 0 ? property.images : [property.imageUrl]
          }
          title={property.title}
          className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]"
        />
      </div>

      {/* Title and Location */}
      <div className="mb-4">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          {property.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {property.location.address}, {property.location.city}, {property.location.country}
        </p>
      </div>

      {/* Rating and Price */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <span className="text-xl">★</span>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {property.rating}
            </span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            ({Math.floor(property.rating * 10)} reviews)
          </span>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            €{property.price.amount}
          </span>
          <span className="ml-1 text-xl text-gray-600 dark:text-gray-400">
            /{property.price.period}
          </span>
        </div>
      </div>
    </div>
  );
};
