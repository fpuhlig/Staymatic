import { Property } from '../../../shared/src';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border-0 shadow-md dark:shadow-lg bg-white dark:bg-gray-800 rounded-xl flex flex-col">
      {/* Image */}
      <div className="relative h-[240px] shrink-0 rounded-t-xl overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content wrapper */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="px-6 pt-5 pb-8">
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-xl font-bold line-clamp-2 leading-tight h-14 text-gray-900 dark:text-white">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 shrink-0">
              <span className="text-lg">★</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{property.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium mt-3">
            {property.location.city}, {property.location.country}
          </p>
        </div>
        
        {/* Content - grows to push button to bottom */}
        <div className="px-6 py-4 flex flex-col gap-8 flex-1">
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {property.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity: string) => (
              <span key={amenity} className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600" style={{borderRadius: '8px'}}>
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300" style={{borderRadius: '8px'}}>
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Button area - always at bottom */}
        <div className="px-6 pt-10 pb-8 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                €{property.price.amount}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/{property.price.period}</span>
            </div>
            <button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 