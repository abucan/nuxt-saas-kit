import { authClient } from '../../lib/auth-client';

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return;
  }

  const { data: session } = await authClient.useSession(useFetch);

  if (session?.value) {
    return navigateTo('/dashboard');
  }
});
