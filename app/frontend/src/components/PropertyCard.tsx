import { Property, PropertyWithHost } from '../../../shared/src/types';
import { propertyUtils } from '../../../shared/src/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ImagePreview } from './PropertyCard/ImagePreview';
import { getButtonClasses } from './common/ButtonStyles';
import { getTextClasses, getBadgeClasses } from './common/StyleUtilities';

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
          images={propertyUtils.combineImages(property.imageUrl, property.images)}
          title={property.title}
          className="h-full rounded-t-xl"
        />
      </div>

      {/* Content wrapper */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`line-clamp-2 h-14 text-xl font-bold leading-tight ${getTextClasses('primary')}`}
            >
              {property.title}
            </h3>
            <div className="flex shrink-0 items-center gap-1 text-amber-500 dark:text-amber-400">
              <span className="text-lg">★</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {property.rating}
              </span>
            </div>
          </div>
          <p className={`mt-3 font-medium ${getTextClasses('muted')}`}>
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
              <span className={`text-sm ${getTextClasses('muted')}`}>
                Hosted by{' '}
                <span className={`font-medium ${getTextClasses('primary')}`}>{host.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* Content - grows to push button to bottom */}
        <div className="flex flex-1 flex-col gap-6 px-4 py-3 sm:gap-8 sm:px-6 sm:py-4">
          <p className="line-clamp-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {property.description}
          </p>

          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity: string) => (
              <span
                key={amenity}
                className={getBadgeClasses('default')}
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
        <div className="shrink-0 border-t border-gray-100 bg-gray-50/50 px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 dark:border-gray-700 dark:bg-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-3xl font-bold ${getTextClasses('primary')}`}>
                €{property.price.amount}
              </span>
              <span className={`ml-1 text-sm ${getTextClasses('secondary')}`}>
                /{property.price.period}
              </span>
            </div>
            <Link
              href={`/property/${property.id}`}
              className={getButtonClasses('primary', 'md', 'rounded-xl sm:px-6 sm:text-base')}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
