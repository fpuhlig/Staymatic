import React from 'react';

interface BaseFormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface TextInputFieldProps extends BaseFormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'date';
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  min?: string;
  max?: string;
  step?: string;
}

interface TextareaFieldProps extends BaseFormFieldProps {
  type: 'textarea';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectFieldProps extends BaseFormFieldProps {
  type: 'select';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
}

type FormFieldProps = TextInputFieldProps | TextareaFieldProps | SelectFieldProps;

export const FormField: React.FC<FormFieldProps> = props => {
  const { label, error, required, className } = props;

  const renderInput = () => {
    const baseClassName = `w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none ${
      error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    } dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`;

    if (props.type === 'textarea') {
      return (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          rows={props.rows || 4}
          required={required}
          className={baseClassName}
        />
      );
    }

    if (props.type === 'select') {
      return (
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={required}
          className={baseClassName}
        >
          {props.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {props.children}
        </select>
      );
    }

    // Default to input
    return (
      <input
        type={props.type || 'text'}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        min={props.min}
        max={props.max}
        step={props.step}
        required={required}
        className={baseClassName}
      />
    );
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="mt-1">
        {renderInput()}
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </div>
  );
};
