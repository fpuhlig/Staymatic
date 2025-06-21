'use client';

import { useParams } from 'next/navigation';
import { LAYOUT_CONSTANTS } from '../../../../../shared/src/constants';
import { PageContainer, PageHeader, LoadingSpinner, ErrorMessage } from '../../../components';
import {
  PropertyHeader,
  PropertyInfo,
  HostInfo,
  BookingCard,
} from '../../../components/PropertyDetails';
import { usePropertyDetails } from '../../../hooks/usePropertyDetails';

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params.id as string;

  const { property, isLoading, error, refetch } = usePropertyDetails({
    propertyId,
    autoLoad: true,
  });

  if (isLoading) {
    return (
      <PageContainer maxWidth="gallery">
        <PageHeader
          title="Loading Property..."
          subtitle="Please wait while we load the property details"
        />
        <div className="flex justify-center">
          <LoadingSpinner message="Loading property details..." />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="gallery">
        <PageHeader
          title="Error Loading Property"
          subtitle="There was an issue loading the property details"
        />
        <div className="flex justify-center">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </PageContainer>
    );
  }

  if (!property) {
    return (
      <PageContainer maxWidth="gallery">
        <PageHeader
          title="Property Not Found"
          subtitle="The property you're looking for doesn't exist"
        />
        <div className="flex justify-center">
          <div className={`text-center ${LAYOUT_CONSTANTS.PADDING.section}`}>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Property not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The property you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="gallery">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Properties
        </button>
      </div>

      {/* Property Header */}
      <PropertyHeader property={property} />

      {/* Main Content Grid */}
      <div className="grid gap-8 xl:grid-cols-3 xl:gap-12">
        {/* Left Column - Property Info */}
        <div className="xl:col-span-2">
          <PropertyInfo property={property} />
        </div>

        {/* Right Column - Booking Card */}
        <div className="xl:col-span-1">
          <BookingCard property={property} />
        </div>
      </div>

      {/* Host Information - Full Width */}
      <div className="mt-12">
        <HostInfo host={property.host} />
      </div>
    </PageContainer>
  );
}
