interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const ValueCard = ({ icon, title, description, className = '' }: ValueCardProps) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <span className="text-2xl text-blue-600 dark:text-blue-400">{icon}</span>
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};
