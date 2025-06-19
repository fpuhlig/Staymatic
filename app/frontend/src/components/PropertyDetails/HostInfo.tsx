import Image from 'next/image';
import { User } from '../../../../shared/src/types';

interface HostInfoProps {
  host: User | null;
}

export const HostInfo = ({ host }: HostInfoProps) => {
  if (!host) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Host Information</h2>
        <p className="text-gray-600 dark:text-gray-400">Host information not available</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Meet your host</h2>

      <div className="flex items-start gap-4">
        {/* Host Avatar */}
        <div className="flex-shrink-0">
          {host.image ? (
            <Image
              src={host.image}
              alt={host.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {host.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Host Details */}
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{host.name}</h3>

          {host.email && <p className="mb-3 text-gray-600 dark:text-gray-400">{host.email}</p>}

          <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="text-amber-500">★</span>
              <span>4.9 rating</span>
            </div>
            <div>•</div>
            <div>23 reviews</div>
            <div>•</div>
            <div>Host since 2023</div>
          </div>

          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Welcome to my place! I'm passionate about providing great experiences for my guests.
            Feel free to reach out if you have any questions about the property or the area.
          </p>

          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
            Contact Host
          </button>
        </div>
      </div>
    </div>
  );
};
