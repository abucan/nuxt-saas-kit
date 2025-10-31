<template>
  <div class="flex flex-row h-screen w-full">
    <div class="w-[60%] h-screen bg-white">
      <div class="absolute top-4 left-6 flex flex-row gap-1 items-center">
        <UIcon name="i-lucide-shield-check" class="size-6 text-slate-900" />
        <span class="text-xl font-semibold font-spectral text-slate-900"
          >NuxtJS Kit</span
        >
      </div>
      <slot />
    </div>
    <div class="bg-[#F2F0EF] w-[40%] h-screen flex justify-center items-center">
      <span class="text-black">Marketing Components</span>
    </div>
  </div>
</template>
