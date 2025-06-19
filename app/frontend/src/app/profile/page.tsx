'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, getSession, listAccounts } from '../../lib/auth-client';
import { useUser } from '../../lib/user-context';
import {
  AuthGuard,
  LoadingSpinner,
  PageContainer,
  PageHeader,
  FormContainer,
  FormSection,
  FormField,
  FormActions,
  UserAvatar,
} from '../../components';

interface FormData {
  name: string;
  image: string;
}

interface UserAccount {
  id: string;
  provider: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        image: user.image || '',
      });
    }
  }, [user]);

  // Load user accounts to check authentication provider
  useEffect(() => {
    const loadUserAccounts = async () => {
      if (session?.user) {
        try {
          const result = await listAccounts();
          if (result.data) {
            setUserAccounts(result.data);
          } else {
            setUserAccounts([]);
          }
        } catch (error) {
          console.error('Failed to load user accounts:', error);
          setUserAccounts([]);
        } finally {
          setIsLoadingAccounts(false);
        }
      }
    };

    loadUserAccounts();
  }, [session]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      setError('User session not found');
      return;
    }

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call our user profile update endpoint
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: session.user.id,
          name: formData.name.trim(),
          image: formData.image.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const updatedUserData = await response.json();

      // Update global user state immediately for instant UI update
      if (updatedUserData.data) {
        updateUser(updatedUserData.data);
        setFormData({
          name: updatedUserData.data.name || '',
          image: updatedUserData.data.image || '',
        });
      }

      // Refresh session in background to sync with server
      getSession().catch(console.error);

      setSuccess(true);

      // Redirect after successful update
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <AuthGuard
      requireAuth={true}
      unauthorizedTitle="Please log in to view your profile"
      unauthorizedDescription="You need to be logged in to manage your profile settings."
    >
      <PageContainer maxWidth="2xl">
        <PageHeader
          title="Profile Settings"
          subtitle="Manage your account information and profile picture"
        />

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Profile updated successfully! Redirecting...
          </div>
        )}

        <FormContainer onSubmit={handleSubmit} error={error}>
          <FormSection title="Profile Information">
            {/* Current Profile Picture Preview */}
            <div className="mb-6 flex items-center gap-4">
              <UserAvatar
                user={{
                  name: formData.name,
                  email: user?.email || session?.user?.email,
                  image: formData.image,
                }}
                size="lg"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Current Profile Picture
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formData.image ? 'Custom image' : 'Default avatar with initials'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />

              <FormField
                label="Profile Picture URL"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/your-photo.jpg"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter a URL to your profile picture, or leave empty to use initials
              </p>

              {/* Show note about email editing based on authentication provider */}
              {!isLoadingAccounts && (
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong>{' '}
                    {userAccounts.some(account => account.provider !== 'credential')
                      ? 'Your email address is managed by your authentication provider and cannot be changed here.'
                      : 'You can change your email address by contacting support.'}
                  </p>
                </div>
              )}
            </div>
          </FormSection>

          <FormActions
            submitLabel="Save Changes"
            submitLoadingLabel="Saving..."
            isSubmitting={isSubmitting}
            cancelHref="/"
          />
        </FormContainer>
      </PageContainer>
    </AuthGuard>
  );
}
