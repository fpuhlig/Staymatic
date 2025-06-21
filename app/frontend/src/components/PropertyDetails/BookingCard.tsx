'use client';

import { Property } from '../../../../shared/src/types';
import { getCardClasses, getTextClasses } from '../common/StyleUtilities';
import { getButtonClasses } from '../common/ButtonStyles';

interface BookingCardProps {
  property: Property;
}

export const BookingCard = ({ property }: BookingCardProps) => {
  const handleBooking = () => {
    // TODO: Implement booking logic
    alert('Booking functionality coming soon!');
  };

  const nights = 3; // Example
  const basePrice = property.price.amount * nights;
  const serviceFee = 15;
  const total = basePrice + serviceFee;

  return (
    <div className={`sticky top-8 ${getCardClasses('bordered')} p-6`}>
      <div className="mb-4">
        <span className={`text-2xl font-bold ${getTextClasses('primary')}`}>
          €{property.price.amount}
        </span>
        <span className={`ml-1 ${getTextClasses('secondary')}`}>/ {property.price.period}</span>
      </div>

      <div className="mb-4 flex items-center">
        <span className="text-amber-500">★</span>
        <span className={`ml-1 font-medium ${getTextClasses('primary')}`}>{property.rating}</span>
        <span className={`ml-1 ${getTextClasses('secondary')}`}>(12 reviews)</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${getTextClasses('primary')}`}>
            Check-in
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${getTextClasses('primary')}`}>
            Check-out
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${getTextClasses('primary')}`}>Guests</label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700">
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
          </select>
        </div>

        <button onClick={handleBooking} className={`w-full ${getButtonClasses('primary', 'lg')}`}>
          Reserve
        </button>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className={getTextClasses('primary')}>
              €{property.price.amount} x {nights} nights
            </span>
            <span className={getTextClasses('primary')}>€{basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span className={getTextClasses('primary')}>Service fee</span>
            <span className={getTextClasses('primary')}>€{serviceFee}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span className={getTextClasses('primary')}>Total</span>
            <span className={getTextClasses('primary')}>€{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
