import { PropertyWithHost } from '../../../../shared/src/types';

interface PropertyInfoProps {
  property: PropertyWithHost;
}

export const PropertyInfo = ({ property }: PropertyInfoProps) => {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">About this place</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">{property.description}</p>
      </div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Amenities</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {property.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                <span className="text-sm text-gray-900 dark:text-white">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Availability</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Available from</h3>
            <p className="text-gray-700 dark:text-gray-300">{formatDate(property.availableFrom)}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Available until</h3>
            <p className="text-gray-700 dark:text-gray-300">{formatDate(property.availableTo)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
