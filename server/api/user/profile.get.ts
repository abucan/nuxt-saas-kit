import { auth } from '~~/lib/auth';
import type { User } from '~~/lib/auth';
import type { UserProfileData } from '~~/types/user';

export default defineEventHandler(async (event): Promise<UserProfileData> => {
  const headers = event.headers;

  const session = await auth.api.getSession({ headers });
  const activeOrganizationId = session?.session?.activeOrganizationId ?? null;
  const activeStripeCustomerId =
    (session?.user as User)?.stripeCustomerId ?? null;

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Unauthorized to access this resource',
    });
  }

  const user = session.user;

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: 'Could not find user',
    });
  }

  let activeOrganization = null;
  let activeSubscription = null;

  if (activeOrganizationId) {
    try {
      activeOrganization = await auth.api.getFullOrganization({ headers });
    } catch (error) {
      activeOrganization = null;
    }
  }

  if (activeStripeCustomerId) {
    try {
      activeSubscription = await auth.api.listActiveSubscriptions({ headers });
      activeSubscription =
        activeSubscription.find(
          (sub) => sub.status === 'active' || sub.status === 'trialing'
        ) || null;
    } catch (error) {
      activeSubscription = null;
    }
  }

  return {
    user,
    organization: activeOrganization,
    subscription: activeSubscription,
  };
});
