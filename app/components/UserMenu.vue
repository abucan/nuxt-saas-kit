<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{ collapsed?: boolean }>();

const colorMode = useColorMode();

const user = ref({
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac',
  },
});

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value.name,
      avatar: user.value.avatar,
      description: 'ante.bucan.st@gmail.com',
      ui: {
        itemLeadingAvatar: 'w-8 h-8',
      },
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      to: '/profile',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
      to: '/billing',
    },
    {
      label: 'Security',
      icon: 'i-lucide-shield',
      to: '/security',
    },
  ],
  [
    {
      label: 'Theme',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onSelect(e: Event) {
            e.preventDefault();
            colorMode.preference = 'light';
          },
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onSelect(e: Event) {
            e.preventDefault();
            colorMode.preference = 'dark';
          },
        },
      ],
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-lucide-log-out',
      color: 'error',
      ui: {
        item: 'text-error',
        itemLeadingIcon: 'text-error',
      },
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
      item: 'font-medium text-muted tracking-wide hover:cursor-pointer',
      itemDescription: 'text-xs text-muted font-thin',
    }"
  >
    <div
      type="button"
      class="flex w-full items-center justify-between hover:bg-gray-100 rounded-lg cursor-pointer"
      :class="[!collapsed && 'p-2']"
    >
      <UUser
        v-bind:name="collapsed ? undefined : user?.name"
        :description="collapsed ? undefined : 'ante.bucan.st@gmail.com'"
        :avatar="{
          src: user?.avatar?.src,
          alt: user?.avatar?.alt,
        }"
        :ui="{ name: 'font-bold' }"
      />
      <UIcon
        name="i-lucide-chevrons-up-down"
        class="text-dimmed"
        :class="[!collapsed && 'ml-auto']"
      />
    </div>
  </UDropdownMenu>
</template>
