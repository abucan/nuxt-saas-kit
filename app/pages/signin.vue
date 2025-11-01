<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

const toast = useToast();
const { step, email, isLoading, error, sendOTP, verifyOTP, reset } = useAuth();
const {
  emailFields,
  otpFields,
  providers,
  emailSchema,
  otpSchema,
  separatorConfig,
} = useAuthForm();

type EmailSchema = z.output<typeof emailSchema>;
type OtpSchema = z.output<typeof otpSchema>;

async function onEmailSubmit(payload: FormSubmitEvent<EmailSchema>) {
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
        key="email"
        :schema="emailSchema"
        :validate-on="['change']"
        title="Welcome back"
        description="Enter your credentials to access your account."
        :fields="emailFields"
        :providers="providers"
        @submit="onEmailSubmit"
        :submit="{ size: 'lg', color: 'success' }"
        :separator="separatorConfig"
      >
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
        :validate-on="['change']"
        title="Enter verification code"
        :description="`We've sent a 6-digit code to ${email}`"
        :fields="otpFields"
        @submit="onOtpSubmit"
        :submit="{ size: 'lg', color: 'success', loading: isLoading }"
      >
        <template #footer>
          <UAlert
            v-if="error"
            color="warning"
            variant="soft"
            class="mb-4"
            :title="error"
          />
          <div class="flex flex-col gap-4">
            <p class="text-sm font-medium text-gray-600">
              Didn't receive the code?
              <ULink
                as="button"
                :loading="isLoading"
                @click="sendOTP(email)"
                class="text-primary"
              >
                Resend code
              </ULink>
            </p>
            <ULink
              as="button"
              @click="goBack"
              class="text-primary font-medium flex flex-row items-center justify-center gap-2"
            >
              <UIcon name="i-lucide-arrow-left" class="size-4" /> Back to email
            </ULink>
          </div>
        </template>
      </UAuthForm>
    </Transition>
  </div>
</template>
