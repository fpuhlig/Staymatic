import { Property } from '../../../shared/src';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Properties
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Discover amazing places to stay
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {properties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}; 