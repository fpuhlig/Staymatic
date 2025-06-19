import { PropertyWithHost } from '../../../shared/src/types';
import Link from 'next/link';

interface HostPropertyCardProps {
  property: PropertyWithHost;
  onDelete: (propertyId: string) => void;
}

export const HostPropertyCard = ({ property, onDelete }: HostPropertyCardProps) => {
  const handleDeleteClick = () => {
    onDelete(property.id);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-[200px] shrink-0 overflow-hidden rounded-t-xl">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {property.location.city}, {property.location.country}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            €{property.price.amount}
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
              /{property.price.period}
            </span>
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <span>★</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{property.rating}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/host/edit-property/${property.id}`}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDeleteClick}
            className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
