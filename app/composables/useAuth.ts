import { authClient } from '../../lib/auth-client';

export default function () {
  const step = ref<'email' | 'otp' | 'success'>('otp');
  const email = ref('');
  const otp = ref('');
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const sendOTP = async (userEmail: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      await authClient.emailOtp.sendVerificationOtp({
        email: userEmail,
        type: 'sign-in',
      });

      email.value = userEmail;
      step.value = 'otp';
    } catch (err: any) {
      error.value = err.message || 'Failed to send OTP. Please try again.';
    } finally {
      isLoading.value = false;
    }
  };

  const verifyOTP = async (otpCode: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      await authClient.signIn.emailOtp({
        email: email.value,
        otp: otpCode,
      });

      step.value = 'success';
      await navigateTo('/dashboard');
    } catch (err: any) {
      error.value = err.message || 'Invalid OTP. Please try again.';
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    step.value = 'email';
    email.value = '';
    otp.value = '';
    error.value = null;
  };

  return {
    step: readonly(step),
    email: readonly(email),
    isLoading: readonly(isLoading),
    error: readonly(error),
    sendOTP,
    verifyOTP,
    reset,
  };
}
