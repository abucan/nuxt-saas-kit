import type { User, Organization } from '~~/lib/auth';

export interface Subscription {
  limits: Record<string, number> | undefined;
  priceId: string | undefined;
  id: string;
  plan: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  trialStart?: Date;
  trialEnd?: Date;
  referenceId: string;
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';
  periodStart?: Date;
  periodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  groupId?: string;
  seats?: number;
}

export interface UserProfileData {
  user: User;
  organization: Organization | null;
  subscription: Subscription | null;
}
