'use client';

import { PropertyGrid } from '../components/PropertyGrid';
import { useProperties } from '../hooks/useProperties';

export default function Home() {
  const { properties, isLoading, error, refetch } = useProperties({
    autoLoad: true,
    includeHosts: true, // Load properties with host information
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-12 text-center sm:mb-16">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
          Featured Properties
        </h2>
        <p className="mx-auto max-w-2xl px-4 text-lg text-gray-600 sm:text-xl dark:text-gray-400">
          Discover amazing places to stay with trusted hosts - Hot Reload Test! 🚀
        </p>
      </div>

      <PropertyGrid properties={properties} isLoading={isLoading} error={error} onRetry={refetch} />
    </main>
  );
}
