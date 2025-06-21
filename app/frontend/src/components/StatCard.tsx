import { LAYOUT_CONSTANTS } from './common/LayoutConstants';
import { getCardClasses, getTextClasses } from './common/StyleUtilities';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

export const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => {
  return (
    <div className={`${getCardClasses('base')} ${LAYOUT_CONSTANTS.PADDING.card}`}>
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
            <dt className={`truncate ${getTextClasses('secondary')} font-medium`}>{title}</dt>
            <dd className={`text-lg font-medium ${getTextClasses('primary')}`}>{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
