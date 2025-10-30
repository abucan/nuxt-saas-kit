<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui';

const authForm = useTemplateRef('authForm');

definePageMeta({
  layout: 'auth',
});

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    size: 'lg',
    variant: 'ghost',
    ui: {
      base: 'hover:bg-background focus:bg-background text-inverted border border-gray-200 rounded-md',
    },
  },
];

const providers: ButtonProps[] = [
  {
    label: 'Continue with Google',
    icon: 'i-logos-google-icon',
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google' });
    },
    size: 'lg',
    variant: 'ghost',
    class:
      'text-inverted border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full',
  },
  {
    label: 'Continue with GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      toast.add({ title: 'GitHub', description: 'Login with GitHub' });
    },
    size: 'lg',
    variant: 'ghost',
    class:
      'text-inverted border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full',
  },
];

const schema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string('Password is required')
    .min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload);
}
</script>

<template>
  <div class="flex h-screen justify-center items-center">
    <UAuthForm
      ref="authForm"
      :schema="schema"
      title="Welcome back"
      description="Enter your credentials to access your account."
      :fields="fields"
      :providers="providers"
      @submit="onSubmit"
      :submit="{ size: 'lg', color: 'success' }"
      :separator="{
        label: 'OR CONTINUE WITH',
        ui: {
          border: 'border-gray-200',
          label: 'text-gray-600 text-xs font-thin',
        },
      }"
    >
      <template #separator>
        <span>fuck off</span>
      </template>
      <template #footer>
        By signing in, you agree to our
        <ULink to="#" class="text-primary font-medium">Terms of Service</ULink>.
      </template>
    </UAuthForm>
  </div>
</template>
