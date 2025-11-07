<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const selectedOrganization = ref({ label: 'Acme Corp', value: 'org1' });
const organizations = ref([
  { label: 'Acme Corp', value: 'org1' },
  { label: 'Tech Startup', value: 'org2' },
  { label: 'Design Studio', value: 'org3' },
]);

const userName = 'John Doe';
const userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=John';
const organizationName = ref('Acme Corp');

const items2: NavigationMenuItem[][] = [
  [
    {
      label: 'General',
      icon: 'i-lucide-user',
      active: true,
    },
    {
      label: 'Members',
      icon: 'i-lucide-users',
    },
    {
      label: 'Notifications',
      icon: 'i-lucide-bell',
    },
  ],
  [
    {
      label: 'Documentation',
      icon: 'i-lucide-book-open',
      to: 'https://ui.nuxt.com/docs',
      target: '_blank',
    },
    {
      label: 'Help & Feedback',
      icon: 'i-lucide-help-circle',
      to: 'https://github.com/nuxt/ui/issues',
      target: '_blank',
    },
  ],
];

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Platform',
      type: 'label',
    },
    {
      label: 'Dashboard',
      icon: 'i-lucide-home',
      active: true,
    },
    {
      label: 'Workspace',
      icon: 'i-lucide-users',
      children: [
        {
          label: 'Members',
        },
        {
          label: 'Invitations',
        },
        {
          label: 'Settings',
        },
      ],
    },
    {
      label: 'Account',
      icon: 'i-lucide-user',
      children: [
        {
          label: 'Profile',
          to: '/profile',
        },
        {
          label: 'Billing',
        },
        {
          label: 'Security',
        },
      ],
    },
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/nuxt-ui-templates/dashboard',
      target: '_blank',
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
  ],
];
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar id="default" collapsible mode="slideover">
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[0]"
          orientation="vertical"
          tooltip
          :popover="false"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>
    <UDashboardPanel>
      <UDashboardNavbar title="Dashboard">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <UNavigationMenu :items="items2" class="flex-1" />
      </UDashboardToolbar>
      <div class="w-full h-full py-8">
        <slot />
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
