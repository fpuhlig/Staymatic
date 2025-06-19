'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZodError } from 'zod';
import { loginSchema, type LoginFormData } from '../../../../shared/src/schemas';
import { FormInput, FormButton, AuthPageLayout } from '../../components';
import { signIn } from '../../lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if form was submitted

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev: LoginFormData) => ({ ...prev, [field]: value }));

    // Only clear errors AFTER first submission attempt (security fix)
    if (hasSubmitted && Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const handleInputBlur = (field: keyof LoginFormData, value: string) => {
    // Only validate on blur AFTER first submission
    if (!hasSubmitted || value.trim() === '') return;

    try {
      if (field === 'email') {
        loginSchema.shape.email.parse(value);
      } else if (field === 'password') {
        loginSchema.shape.password.parse(value);
      }
      setErrors((prev: Partial<LoginFormData>) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors((prev: Partial<LoginFormData>) => ({
          ...prev,
          [field]: error.errors[0]?.message,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear all errors at start of submission
    setHasSubmitted(true); // Mark that form was submitted

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
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        const errorMessage = result.error.message || 'Login failed';

        // Handle different types of login errors with specific messages
        if (errorMessage.includes('Invalid credentials') || errorMessage.includes('incorrect')) {
          setErrors({ password: 'Invalid email or password. Please try again.' });
        } else if (errorMessage.includes('not found') || errorMessage.includes('not exist')) {
          setErrors({ email: 'No account found with this email address.' });
        } else if (errorMessage.includes('email')) {
          setErrors({ email: errorMessage });
        } else if (errorMessage.includes('password')) {
          setErrors({ password: errorMessage });
        } else {
          // General error - show it on password field as fallback
          setErrors({ password: errorMessage });
        }
        setIsLoading(false);
        return;
      }

      // Success - redirect to home
      router.replace('/');
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Login network error:', error);
      setErrors({
        email: 'Network error occurred. Please check your connection and try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout title="Sign in to your account" subtitle="Welcome back to Staymatic">
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
    </AuthPageLayout>
  );
}
