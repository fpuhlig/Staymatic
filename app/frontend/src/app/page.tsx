'use client';

import { PropertyGrid, PageContainer, PageHeader } from '../components';
import { useProperties } from '../hooks/useProperties';

export default function Home() {
  const { properties, isLoading, error, refetch } = useProperties({
    autoLoad: true,
    includeHosts: true, // Load properties with host information
  });

  return (
    <PageContainer>
      <PageHeader
        title="Featured Properties"
        subtitle="Discover amazing places to stay with trusted hosts"
      />
      <PropertyGrid properties={properties} isLoading={isLoading} error={error} onRetry={refetch} />
    </PageContainer>
  );
}
