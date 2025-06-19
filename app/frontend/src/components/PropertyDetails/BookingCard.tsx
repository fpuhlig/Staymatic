'use client';

import { useState } from 'react';
import { PropertyWithHost } from '../../../../shared/src/types';

interface BookingCardProps {
  property: PropertyWithHost;
}

export const BookingCard = ({ property }: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleBooking = () => {
    // TODO: Implement booking functionality
    alert('Booking functionality will be implemented soon!');
  };

  return (
    <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            €{property.price.amount}
          </span>
          <span className="text-gray-600 dark:text-gray-400">/{property.price.period}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500">
            <span>★</span>
            <span className="font-medium text-gray-900 dark:text-white">{property.rating}</span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            · {Math.floor(property.rating * 10)} reviews
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Check-in / Check-out */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              min={new Date(property.availableFrom).toISOString().split('T')[0]}
              max={new Date(property.availableTo).toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              min={checkIn || new Date(property.availableFrom).toISOString().split('T')[0]}
              max={new Date(property.availableTo).toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Guests
          </label>
          <select
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          disabled={!checkIn || !checkOut}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-600"
        >
          Reserve
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          You won&apos;t be charged yet
        </p>

        {/* Price Breakdown */}
        {checkIn && checkOut && (
          <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  €{property.price.amount} x{' '}
                  {Math.ceil(
                    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{' '}
                  nights
                </span>
                <span className="text-gray-900 dark:text-white">
                  €
                  {property.price.amount *
                    Math.ceil(
                      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Service fee</span>
                <span className="text-gray-900 dark:text-white">€15</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-medium dark:border-gray-700">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">
                  €
                  {property.price.amount *
                    Math.ceil(
                      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                        (1000 * 60 * 60 * 24),
                    ) +
                    15}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
