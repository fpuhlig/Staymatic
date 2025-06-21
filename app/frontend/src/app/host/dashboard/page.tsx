'use client';

import { useState, useEffect } from 'react';
import { useProperties } from '../../../hooks/useProperties';
import { useSession } from '../../../lib/auth-client';
import Link from 'next/link';
import { PropertyWithHost } from '../../../../../shared/src/types';
import {
  AuthGuard,
  HostPropertyCard,
  StatCard,
  EmptyState,
  LoadingSpinner,
  ErrorMessage,
  PageContainer,
} from '../../../components';
import { getButtonClasses } from '../../../components/common/ButtonStyles';

export default function HostDashboard() {
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize once session is loaded
  useEffect(() => {
    if (!isSessionLoading) {
      setIsInitialized(true);
    }
  }, [isSessionLoading]);

  // Use the actual user ID from session as hostId
  const hostId = session?.user?.id || '';
  const isAuthenticated = !!session?.user;

  const { properties, isLoading, error, refetch } = useProperties({
    autoLoad: isInitialized && isAuthenticated && hostId !== '',
    includeHosts: true,
    filters: hostId ? { hostId } : undefined,
  });

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/properties/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include', // Include auth cookies
      });

      if (response.ok) {
        // Refresh the properties list
        refetch();
        alert('Property deleted successfully!');
      } else {
        alert('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property');
    }
  };

  return (
    <AuthGuard
      requireAuth={true}
      loadingMessage="Checking authentication..."
      unauthorizedTitle="Please log in to access your dashboard"
      unauthorizedDescription="You need to be logged in to manage your properties."
    >
      <PageContainer maxWidth="dashboard">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              My Properties
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Welcome back, {session?.user.name || session?.user.email}! Manage your listed
              properties.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/host/add-property" className={getButtonClasses('primary', 'md')}>
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Property
            </Link>
          </div>
        </div>

        {/* Stats - Always visible with consistent height */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Properties"
            value={isLoading ? '-' : properties.length}
            bgColor="bg-blue-500"
            icon={
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            }
          />

          <StatCard
            title="Active Listings"
            value={isLoading ? '-' : properties.length}
            bgColor="bg-green-500"
            icon={
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />

          <StatCard
            title="Average Rating"
            value={
              isLoading
                ? '-'
                : properties.length > 0
                  ? (
                      properties.reduce((sum, p) => sum + (p as PropertyWithHost).rating, 0) /
                      properties.length
                    ).toFixed(1)
                  : '0.0'
            }
            bgColor="bg-yellow-500"
            icon={
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          />
        </div>

        {/* Properties Grid - Fixed height container to prevent layout shifts */}
        <div className="min-h-[500px]">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner message="Loading your properties..." />
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : properties.length === 0 ? (
            <div className="flex items-center justify-center">
              <EmptyState
                icon={
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="h-full w-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                }
                title="No properties yet"
                description="Get started by adding your first property to start hosting guests."
                actionLabel="Add Property"
                actionHref="/host/add-property"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map(property => (
                <HostPropertyCard
                  key={property.id}
                  property={property as PropertyWithHost}
                  onDelete={handleDeleteProperty}
                />
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </AuthGuard>
  );
}
