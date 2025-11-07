import type { UserProfileData } from '~~/types/user';

export default function () {
  const {
    data: profile,
    pending,
    error,
    refresh,
  } = useFetch<UserProfileData>('/api/user/profile', {
    key: 'user-profile',
  });

  const user = computed(() => profile.value?.user);
  const organization = computed(() => profile.value?.organization);
  const subscription = computed(() => profile.value?.subscription);

  return {
    user: readonly(user),
    organization: readonly(organization),
    subscription: readonly(subscription),
    pending: readonly(pending),
    error: readonly(error),
    refresh,
  };
}
