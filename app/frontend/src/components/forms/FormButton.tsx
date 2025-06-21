import { getButtonClasses, ButtonVariant, ButtonSize } from '../common/ButtonStyles';

interface FormButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const FormButton = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingText,
  children,
  onClick,
  className = '',
}: FormButtonProps) => {
  const buttonClassName = getButtonClasses(variant, size, className);

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClassName}
    >
      {loading ? loadingText || 'Loading...' : children}
    </button>
  );
};
