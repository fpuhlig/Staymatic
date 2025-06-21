'use client';

import { Property, PropertyWithHost } from '../../../shared/src/types';
import { LAYOUT_CONSTANTS } from '../../../shared/src/constants';
import { PropertyCard } from './PropertyCard';
import { getButtonClasses } from './common/ButtonStyles';

interface PropertyGridProps {
  properties: Property[] | PropertyWithHost[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[240px] rounded-t-xl bg-gray-300 dark:bg-gray-600"></div>
    <div className="p-6">
      <div className="mb-3 h-6 rounded bg-gray-300 dark:bg-gray-600"></div>
      <div className="mb-2 h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
      <div className="mb-4 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
      <div className="mb-4 h-16 rounded bg-gray-300 dark:bg-gray-600"></div>
      <div className="flex justify-between">
        <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-10 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </div>
  </div>
);

export const PropertyGrid = ({ properties, isLoading, error, onRetry }: PropertyGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center ${LAYOUT_CONSTANTS.PADDING.section}`}
      >
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Failed to load properties
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">{error}</p>
          {onRetry && (
            <button onClick={onRetry} className={getButtonClasses('primary', 'md')}>
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center ${LAYOUT_CONSTANTS.PADDING.section}`}
      >
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No properties found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            There are no properties available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
