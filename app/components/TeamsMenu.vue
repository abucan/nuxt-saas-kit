<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
  collapsed?: boolean;
}>();

const teams = ref([
  {
    label: 'Nuxt',
    avatar: {
      src: 'https://github.com/nuxt.png',
      alt: 'Nuxt',
    },
  },
  {
    label: 'NuxtHub',
    avatar: {
      src: 'https://github.com/nuxt-hub.png',
      alt: 'NuxtHub',
    },
  },
  {
    label: 'NuxtLabs',
    avatar: {
      src: 'https://github.com/nuxtlabs.png',
      alt: 'NuxtLabs',
    },
  },
]);
const selectedTeam = ref(teams.value[0]);

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map((team) => ({
      ...team,
      onSelect() {
        selectedTeam.value = team;
      },
    })),
    [
      {
        label: 'Add workspace',
        icon: 'i-lucide-circle-plus',
      },
    ],
  ];
});
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'center',
      collisionPadding: 12,
    }"
    :ui="{
      content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)',
      item: 'font-medium text-muted tracking-wide hover:cursor-pointer',
    }"
  >
    <div
      type="button"
      class="flex w-full items-center justify-between hover:bg-gray-100 rounded-lg cursor-pointer"
      :class="[!collapsed && 'p-2']"
    >
      <UUser
        v-bind:name="collapsed ? undefined : selectedTeam?.label"
        :description="collapsed ? undefined : 'Hobby'"
        :avatar="{
          src: selectedTeam?.avatar?.src,
          alt: selectedTeam?.avatar?.alt,
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
