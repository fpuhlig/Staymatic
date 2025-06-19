interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

export const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-md ${bgColor} text-white`}
          >
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </dt>
            <dd className="text-lg font-medium text-gray-900 dark:text-white">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
