import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { emailOTP, openAPI, organization } from 'better-auth/plugins';
import { stripe } from '@better-auth/stripe';
import Stripe from 'stripe';
import { db } from './db';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 300,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      prompt: 'select_account consent',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: 'select_account consent',
    },
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      allowedAttempts: 3,
      sendVerificationOTP: async ({ email, otp, type }) => {
        console.log('Sending verification OTP to', email, otp, type);
      },
    }),
    organization({
      requireEmailVerificationOnInvitation: true,
      sendInvitationEmail: async ({ invitation, organization, inviter }) => {
        console.log(
          'Sending invitation email to',
          invitation,
          organization,
          inviter
        );
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: false,
      subscription: {
        enabled: true,
        plans: [],
      },
    }),
    openAPI(),
  ],
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user & {
  stripeCustomerId?: string;
};
export type Organization = typeof auth.$Infer.Organization;
export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type Member = typeof auth.$Infer.Member;
export type Invitation = typeof auth.$Infer.Invitation;
