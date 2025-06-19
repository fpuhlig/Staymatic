import { createAuthClient } from 'better-auth/react';

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  fetchOptions: {
    onSuccess: () => {
      // Don't do automatic redirects, let components handle it
    },
  },
});
