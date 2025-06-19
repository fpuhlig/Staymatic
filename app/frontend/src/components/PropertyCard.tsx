import { Property, PropertyWithHost } from '../../../shared/src/types';
import Image from 'next/image';
import Link from 'next/link';
import { ImagePreview } from './PropertyCard/ImagePreview';

interface PropertyCardProps {
  property: Property | PropertyWithHost;
}

// Type guard to check if property has host data
const isPropertyWithHost = (
  property: Property | PropertyWithHost,
): property is PropertyWithHost => {
  return 'host' in property;
};

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const hasHost = isPropertyWithHost(property);
  const host = hasHost ? property.host : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl">
      {/* Image */}
      <div className="h-[240px] shrink-0 rounded-t-xl">
        <ImagePreview
          images={
            property.images && property.images.length > 0 ? property.images : [property.imageUrl]
          }
          title={property.title}
          className="h-full rounded-t-xl"
        />
      </div>

      {/* Content wrapper */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="px-6 pb-8 pt-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 h-14 text-xl font-bold leading-tight text-gray-900 dark:text-white">
              {property.title}
            </h3>
            <div className="flex shrink-0 items-center gap-1 text-amber-500 dark:text-amber-400">
              <span className="text-lg">★</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {property.rating}
              </span>
            </div>
          </div>
          <p className="mt-3 font-medium text-gray-600 dark:text-gray-400">
            {property.location.city}, {property.location.country}
          </p>

          {/* Host Information */}
          {host && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                {host.image ? (
                  <Image
                    src={host.image}
                    alt={host.name}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {host.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hosted by{' '}
                <span className="font-medium text-gray-900 dark:text-white">{host.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* Content - grows to push button to bottom */}
        <div className="flex flex-1 flex-col gap-8 px-6 py-4">
          <p className="line-clamp-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {property.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity: string) => (
              <span
                key={amenity}
                className="inline-flex items-center border border-gray-300 bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                style={{ borderRadius: '8px' }}
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span
                className="inline-flex items-center border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300"
                style={{ borderRadius: '8px' }}
              >
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Button area - always at bottom */}
        <div className="shrink-0 border-t border-gray-100 bg-gray-50/50 px-6 pb-8 pt-10 dark:border-gray-700 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                €{property.price.amount}
              </span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                /{property.price.period}
              </span>
            </div>
            <Link
              href={`/property/${property.id}`}
              className="rounded-xl bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
