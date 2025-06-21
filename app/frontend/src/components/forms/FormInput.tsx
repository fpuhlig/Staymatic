import React from 'react';

interface FormInputProps {
  id?: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'url' | 'date';
  placeholder?: string;
  value: string | number;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  min?: string;
  max?: string;
  step?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  error,
  autoComplete,
  required,
  min,
  max,
  step,
  onChange,
  onBlur,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400`}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </div>
  );
};
