'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../../../lib/auth-client';
import Link from 'next/link';
import { FormField, FormButton } from '../../../components/forms';
import { LoadingSpinner } from '../../../components';

interface PropertyFormData {
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  amount: string;
  currency: string;
  period: string;
  amenities: string;
  availableFrom: string;
  availableTo: string;
}

export default function AddProperty() {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    imageUrl: '',
    address: '',
    city: '',
    country: 'Germany',
    amount: '',
    currency: 'EUR',
    period: 'night',
    amenities: '',
    availableFrom: '',
    availableTo: '',
  });

  const isAuthenticated = !!session?.user;
  const hostId = session?.user?.id || '';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!hostId) {
      setError('You must be logged in to create a property');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        hostId,
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        location: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
        },
        price: {
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          period: formData.period,
        },
        amenities: formData.amenities
          .split(',')
          .map(a => a.trim())
          .filter(a => a),
        availableFrom: formData.availableFrom,
        availableTo: formData.availableTo,
      };

      const response = await fetch('http://localhost:3001/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include auth cookies
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create property');
      }

      // Success - redirect to dashboard
      router.push('/host/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create property';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading until session is checked
  if (isSessionLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <LoadingSpinner message="Checking authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Please log in to add a property
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          You need to be logged in to list properties on Staymatic.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Link
            href="/host/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <svg className="mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Add New Property
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Fill in the details to list your property on Staymatic
        </p>
      </div>

      {/* Form */}
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                label="Property Title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Beautiful Apartment in Berlin"
                required
              />

              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property, its features, and what makes it special..."
                rows={4}
                required
              />

              <FormField
                label="Image URL"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://images.unsplash.com/photo-..."
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Location</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Alexanderplatz 1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Berlin"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="Germany">Germany</option>
                  <option value="Austria">Austria</option>
                  <option value="Switzerland">Switzerland</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Pricing</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Currency *
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Period *
                </label>
                <select
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="night">Per Night</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Amenities</h2>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="WiFi, Kitchen, Air Conditioning, Balcony"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter amenities separated by commas
              </p>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Availability</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Available From *
                </label>
                <input
                  type="date"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Available Until *
                </label>
                <input
                  type="date"
                  name="availableTo"
                  value={formData.availableTo}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
            <Link
              href="/host/dashboard"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </Link>
            <FormButton type="submit" disabled={isSubmitting} className="px-6 py-2">
              {isSubmitting ? 'Creating...' : 'Create Property'}
            </FormButton>
          </div>
        </form>
      </div>
    </main>
  );
}
