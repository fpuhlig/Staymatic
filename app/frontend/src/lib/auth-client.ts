import { createAuthClient } from 'better-auth/react';
import { APP_CONSTANTS } from '../../../shared/src/constants';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || APP_CONSTANTS.DEFAULT_BACKEND_URL,
  fetchOptions: {
    onSuccess: () => {
      // Don't do automatic redirects, let components handle it
    },
  },
});

export const { signIn, signUp, signOut, useSession, getSession, listAccounts } = authClient;
