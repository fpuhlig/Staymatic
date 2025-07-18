'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZodError } from 'zod';
import {
  registerSchema,
  registerBaseSchema,
  type RegisterFormData,
} from '../../../../shared/src/schemas';
import { FormInput, FormButton, AuthPageLayout } from '../../components';
import { signUp } from '../../lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if form was submitted

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev: RegisterFormData) => ({ ...prev, [field]: value }));

    // Only clear errors AFTER first submission attempt (security fix)
    if (hasSubmitted && Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const handleInputBlur = (field: keyof RegisterFormData, value: string) => {
    // Only validate on blur AFTER first submission
    if (!hasSubmitted || value.trim() === '') return;

    try {
      if (field === 'name') {
        registerBaseSchema.shape.name.parse(value);
      } else if (field === 'email') {
        registerBaseSchema.shape.email.parse(value);
      } else if (field === 'password') {
        registerBaseSchema.shape.password.parse(value);
      } else if (field === 'confirmPassword') {
        registerSchema.parse(formData);
      }
      setErrors((prev: Partial<RegisterFormData>) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors[0]?.message || 'Invalid input';
        setErrors((prev: Partial<RegisterFormData>) => ({ ...prev, [field]: errorMessage }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear all errors at start of submission
    setHasSubmitted(true); // Mark that form was submitted

    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<RegisterFormData> = {};
      validation.error.errors.forEach(error => {
        const field = error.path[0] as keyof RegisterFormData;
        if (field) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        const errorMessage = result.error.message || 'Registration failed';

        // Handle different types of errors with specific messages
        if (
          errorMessage.includes('existing email') ||
          errorMessage.includes('already exists') ||
          errorMessage.includes('duplicate') ||
          errorMessage.includes('User already exists') ||
          errorMessage === 'User already exists'
        ) {
          setErrors({
            email:
              'This email is already registered. Please use a different email or try logging in.',
          });
        } else if (errorMessage.includes('email')) {
          setErrors({ email: errorMessage });
        } else if (errorMessage.includes('password')) {
          setErrors({ password: errorMessage });
        } else if (errorMessage.includes('name')) {
          setErrors({ name: errorMessage });
        } else {
          // General error - show it on email field as fallback
          setErrors({ email: errorMessage });
        }
        setIsLoading(false);
        return;
      }

      // Success - redirect to home
      router.replace('/');
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Registration network error:', error);
      setErrors({
        email: 'Network error occurred. Please check your connection and try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout
      title="Create your account"
      subtitle="Join Staymatic and find your perfect stay"
    >
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput
            id="name"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            error={errors.name}
            autoComplete="name"
            required
            onChange={value => handleInputChange('name', value)}
            onBlur={value => handleInputBlur('name', value)}
          />

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
            placeholder="Enter your password (min. 8 characters)"
            value={formData.password}
            error={errors.password}
            autoComplete="new-password"
            required
            onChange={value => handleInputChange('password', value)}
            onBlur={value => handleInputBlur('password', value)}
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            autoComplete="new-password"
            required
            onChange={value => handleInputChange('confirmPassword', value)}
            onBlur={value => handleInputBlur('confirmPassword', value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <FormButton
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            loadingText="Signing up..."
            className="flex w-full justify-center"
          >
            Sign Up
          </FormButton>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="cursor-pointer font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </AuthPageLayout>
  );
}
