interface CTAButton {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary';
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
  className?: string;
}

export const CTASection = ({ title, description, buttons, className = '' }: CTASectionProps) => {
  const getButtonStyles = (variant: 'primary' | 'secondary' = 'primary') => {
    if (variant === 'secondary') {
      return 'rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950';
    }
    return 'rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700';
  };

  return (
    <section className={`rounded-lg bg-blue-50 p-8 text-center dark:bg-blue-950 ${className}`}>
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">{description}</p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {buttons.map((button, index) => (
          <a key={index} href={button.href} className={getButtonStyles(button.variant)}>
            {button.text}
          </a>
        ))}
      </div>
    </section>
  );
};
