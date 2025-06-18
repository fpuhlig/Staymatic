import { Property } from '../../../shared/src';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-12 text-center sm:mb-16">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Featured Properties
        </h2>
        <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600 sm:text-xl dark:text-gray-400">
          Discover amazing places to stay
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
};
