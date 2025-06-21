import { getButtonClasses, type ButtonVariant } from './ButtonStyles';

interface CTAButton {
  href: string;
  text: string;
  variant?: ButtonVariant;
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
  className?: string;
}

export const CTASection = ({ title, description, buttons, className = '' }: CTASectionProps) => {
  return (
    <section className={`rounded-lg bg-blue-50 p-8 text-center dark:bg-blue-950 ${className}`}>
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">{description}</p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.href}
            className={getButtonClasses(button.variant || 'primary', 'lg')}
          >
            {button.text}
          </a>
        ))}
      </div>
    </section>
  );
};
