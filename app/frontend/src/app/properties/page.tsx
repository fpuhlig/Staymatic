'use client';

import { PropertyGrid, PageContainer, PageHeader } from '../../components';
import { useProperties } from '../../hooks/useProperties';

export default function PropertiesPage() {
  const { properties, isLoading, error, refetch } = useProperties({
    autoLoad: true,
    includeHosts: true,
  });

  return (
    <PageContainer maxWidth="gallery">
      <PageHeader
        title="All Properties"
        subtitle="Discover amazing places to stay with trusted hosts around the world"
      />
      <PropertyGrid properties={properties} isLoading={isLoading} error={error} onRetry={refetch} />
    </PageContainer>
  );
}
