<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  layout: 'dashboard',
});

const { user, pending, error, refresh } = useUser();
const toast = useToast();

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  image: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

const state = reactive({
  name: '',
  email: '',
  image: undefined,
});

watch(
  () => user.value,
  (userData) => {
    if (userData) {
      state.name = userData.name ?? '';
      state.email = userData.email ?? '';
      state.image = undefined;
    }
  },
  { immediate: true }
);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: {
        name: event.data.name,
        image: event.data.image,
      },
    });

    if (response) {
      toast.add({
        title: 'Success',
        description: 'Profile updated successfully',
        color: 'success',
      });

      refresh();
    }
  } catch (err) {
    toast.add({
      title: 'Error',
      description: 'Failed to update profile',
      color: 'error',
    });
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="flex justify-center items-start"
  >
    <UCard class="w-full max-w-2xl">
      <template #header>
        <div class="space-y-1">
          <h2 class="text-xl font-bold text-gray-900">Profile Information</h2>
          <p class="text-sm text-muted">
            Update your personal details and profile picture
          </p>
        </div>
      </template>

      <div v-if="error" class="p-8 text-center text-red-600">
        <p>Error loading profile</p>
      </div>

      <div v-else class="space-y-6">
        <div class="flex items-start gap-4">
          <UAvatar
            :src="state.image ?? undefined"
            alt="Profile picture"
            size="3xl"
            class="shrink-0"
          />
          <div class="flex flex-col space-y-1 items-start">
            <UButton variant="outline" color="neutral" size="md">
              Change avatar
            </UButton>
            <p class="text-xs text-dimmed">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        <USeparator />

        <UFormField
          name="name"
          label="Name"
          help="This is your display name. It will be visible to other users."
        >
          <UInput
            v-model="state.name"
            placeholder="Enter your name"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <USeparator />

        <UFormField
          name="email"
          label="Email"
          help="Your email address is managed by your authentication provider."
        >
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
            size="lg"
            icon="i-lucide-at-sign"
            disabled
          />
        </UFormField>
      </div>

      <template #footer>
        <div class="flex justify-start">
          <UButton type="submit" color="warning" size="lg"
            >Save changes</UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>
