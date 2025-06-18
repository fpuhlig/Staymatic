import { mockProperties } from '../../../shared/src';
import { PropertyGrid } from '../components';

export default function Home() {
  return <PropertyGrid properties={mockProperties} />;
}
