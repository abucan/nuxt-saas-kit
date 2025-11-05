<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
});

const name = ref('Ante');
const email = ref('ante.bucan.st@gmail.com');
</script>

<template>
  <div class="flex justify-center items-start min-h-screen py-8">
    <UCard class="w-full max-w-2xl">
      <template #header>
        <div class="space-y-1">
          <h2 class="text-xl font-bold text-gray-900">Profile Information</h2>
          <p class="text-sm text-gray-600">
            Update your personal details and profile picture
          </p>
        </div>
      </template>

      <div class="space-y-6">
        <!-- Avatar Section -->
        <div class="flex items-start gap-4 pb-6 border-b border-gray-200">
          <UAvatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ante"
            alt="Profile picture"
            size="xl"
            class="shrink-0"
          />
          <div class="flex flex-col gap-2">
            <UButton variant="outline" color="neutral" size="sm">
              Change avatar
            </UButton>
            <p class="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        <!-- Name Section -->
        <div class="space-y-2 pb-6 border-b border-gray-200">
          <label class="text-sm font-semibold text-gray-900">Name</label>
          <UInput
            v-model="name"
            placeholder="Enter your name"
            class="w-full"
            size="lg"
          />
          <p class="text-xs text-gray-500">
            This is your display name. It will be visible to other users.
          </p>
        </div>

        <!-- Email Section -->
        <div class="space-y-2 pb-6">
          <label class="text-sm font-semibold text-gray-900">Email</label>
          <UInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
            size="lg"
          />
          <p class="text-xs text-gray-500">
            Your email address is managed by your authentication provider.
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-start">
          <UButton color="warning" size="lg"> Save changes </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
