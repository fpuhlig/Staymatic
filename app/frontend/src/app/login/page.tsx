'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginSchema, type LoginFormData } from '../../../../shared/src/schemas';
import { FormInput, FormButton } from '../../components';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev: LoginFormData) => ({ ...prev, [field]: value }));

    // Only clear existing errors while typing - don't create new ones
    if (errors[field]) {
      setErrors((prev: Partial<LoginFormData>) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputBlur = (field: keyof LoginFormData, value: string) => {
    // Only validate when user leaves the field (blur event)
    if (value.trim() === '') return; // Don't validate empty fields on blur

    try {
      if (field === 'email') {
        loginSchema.shape.email.parse(value);
      } else if (field === 'password') {
        loginSchema.shape.password.parse(value);
      }
      // Clear error if validation passes
      setErrors((prev: Partial<LoginFormData>) => ({ ...prev, [field]: undefined }));
    } catch (error: any) {
      // Set error if validation fails
      setErrors((prev: Partial<LoginFormData>) => ({ ...prev, [field]: error.errors[0]?.message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Final validation check
    const emailValidation = loginSchema.shape.email.safeParse(formData.email);
    const passwordValidation = loginSchema.shape.password.safeParse(formData.password);

    if (!emailValidation.success || !passwordValidation.success) {
      setErrors({
        email: !emailValidation.success ? emailValidation.error.errors[0]?.message : undefined,
        password: !passwordValidation.success
          ? passwordValidation.error.errors[0]?.message
          : undefined,
      });
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with Better Auth login
      console.log('Login attempt:', formData);

      // Mock login success - redirect to home
      setTimeout(() => {
        router.push('/');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center overflow-hidden bg-gray-50 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Welcome back to Staymatic</p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              id="email"
              label="Email address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              error={errors.email}
              autoComplete="email"
              required
              onChange={value => handleInputChange('email', value)}
              onBlur={value => handleInputBlur('email', value)}
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              error={errors.password}
              autoComplete="current-password"
              required
              onChange={value => handleInputChange('password', value)}
              onBlur={value => handleInputBlur('password', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <FormButton
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              loadingText="Signing in..."
              className="flex w-full justify-center"
            >
              Sign in
            </FormButton>
          </div>

          <div className="text-center">
            <FormButton
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
              className="text-sm"
            >
              ← Back to Home
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
