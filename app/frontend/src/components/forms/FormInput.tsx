import { z } from 'zod';

interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  zodSchema?: z.ZodString;
  className?: string;
}

export const FormInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  required = false,
  autoComplete,
  onChange,
  onBlur,
  zodSchema,
  className = '',
}: FormInputProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (onBlur) {
      onBlur(inputValue);
      return;
    }

    if (zodSchema && inputValue.trim() !== '') {
      try {
        zodSchema.parse(inputValue);
      } catch {
        // Parent component will handle the error display
      }
    }
  };

  const inputClassName = `
    mt-1 appearance-none relative block w-full px-3 py-2 border 
    ${error ? 'border-red-300' : 'border-gray-300'} 
    placeholder-gray-500 text-gray-900 rounded-md 
    focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 
    sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={handleBlur}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};
