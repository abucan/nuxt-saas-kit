import { stripeClient } from '@better-auth/stripe/client';
import { emailOTPClient, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/vue';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [
    emailOTPClient(),
    organizationClient(),
    stripeClient({
      subscription: true,
    }),
  ],
});
