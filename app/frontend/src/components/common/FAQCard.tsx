interface FAQCardProps {
  question: string;
  answer: string;
  className?: string;
}

export const FAQCard = ({ question, answer, className = '' }: FAQCardProps) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{question}</h3>
      <p className="leading-relaxed text-gray-700 dark:text-gray-300">{answer}</p>
    </div>
  );
};
