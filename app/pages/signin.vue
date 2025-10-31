<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui';

const authForm = useTemplateRef('authForm');

definePageMeta({
  layout: 'auth',
});

const toast = useToast();
const { step, email, isLoading, error, sendOTP, verifyOTP, reset } = useAuth();

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

const otpFields: AuthFormField[] = [
  {
    name: 'otp',
    type: 'otp',
    length: 6,
    placeholder: '○',
    size: 'xl',
    variant: 'ghost',
    ui: {
      base: 'w-full hover:bg-background focus:bg-background text-inverted border border-gray-200 rounded-md',
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

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type Schema = z.output<typeof schema>;
type OtpSchema = z.output<typeof otpSchema>;

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload);
}

async function onEmailSubmit(payload: FormSubmitEvent<Schema>) {
  await sendOTP(payload.data.email);
  if (!error.value) {
    toast.add({
      title: 'OTP sent',
      description: `We've sent a code to ${payload.data.email}`,
    });
  }
}

async function onOtpSubmit(payload: FormSubmitEvent<OtpSchema>) {
  await verifyOTP(payload.data.otp);
  if (!error.value) {
    toast.add({
      title: 'Success',
      description: 'You have been signed in successfully',
    });
  }
}

function goBack() {
  reset();
}
</script>

<template>
  <div class="flex h-screen justify-center items-center">
    <Transition name="step" mode="out-in">
      <UAuthForm
        v-if="step === 'email'"
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
          <ULink to="#" class="text-primary font-medium">Terms of Service</ULink
          >.
        </template>
      </UAuthForm>

      <UAuthForm
        v-else-if="step === 'otp'"
        key="otp"
        :schema="otpSchema"
        title="Enter verification code"
        :description="`We've sent a 6-digit code to ${email}`"
        :fields="otpFields"
        @submit="onOtpSubmit"
        :submit="{ size: 'lg', color: 'success', loading: isLoading }"
      >
        <template #header>
          <UButton
            variant="ghost"
            icon="i-heroicons-arrow-left"
            @click="goBack"
            class="mb-4"
          >
            Back to email
          </UButton>
        </template>
        <template #footer>
          <UAlert
            v-if="error"
            color="warning"
            variant="soft"
            class="mb-4"
            :title="error"
          />
          <p class="text-sm text-gray-600">
            Didn't receive the code?
            <UButton
              variant="link"
              size="sm"
              :loading="isLoading"
              @click="sendOTP(email)"
              class="text-primary"
            >
              Resend code
            </UButton>
          </p>
        </template>
      </UAuthForm>
    </Transition>
  </div>
</template>
