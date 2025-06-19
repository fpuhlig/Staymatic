import { createAuthClient } from 'better-auth/react';
import { APP_CONSTANTS } from '@shared/constants';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || APP_CONSTANTS.DEFAULT_BACKEND_URL,
  fetchOptions: {
    onSuccess: () => {
      // Don't do automatic redirects, let components handle it
    },
  },
});
