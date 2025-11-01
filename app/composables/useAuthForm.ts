import type { AuthFormField, ButtonProps, SeparatorProps } from '@nuxt/ui';
import * as z from 'zod';

export default function () {
  const toast = useToast();
  const { signInWithProvider } = useAuth();

  const emailFields: AuthFormField[] = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      size: 'lg',
      variant: 'ghost',
      ui: {
        base: 'hover:bg-background focus:bg-background border border-gray-200 rounded-md',
      },
    },
  ];

  const otpFields: AuthFormField[] = [
    {
      name: 'otp',
      type: 'otp',
      length: 6,
      size: 'xl',
      required: true,
      variant: 'ghost',
      ui: {
        base: 'w-full hover:bg-background focus:bg-background text-black border border-gray-200 rounded-md',
      },
    },
  ];

  const providers: ButtonProps[] = [
    {
      label: 'Continue with Google',
      icon: 'i-logos-google-icon',
      onClick: async () => {
        await signInWithProvider('google');
      },
      size: 'lg',
      variant: 'ghost',
      class:
        'border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full',
    },
    {
      label: 'Continue with GitHub',
      icon: 'i-logos-github-icon',
      onClick: async () => {
        await signInWithProvider('github');
      },
      size: 'lg',
      variant: 'ghost',
      class:
        'border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full',
    },
  ];

  const emailSchema = z.object({
    email: z.email('Invalid email'),
  });

  const otpSchema = z.object({
    otp: z.string().array().length(6, 'OTP must be 6 digits'),
  });

  const separatorConfig: SeparatorProps = {
    label: 'OR CONTINUE WITH',
    ui: {
      border: 'border-gray-200',
      label: 'text-gray-600 text-xs font-thin',
    },
  };

  return {
    emailFields,
    otpFields,
    providers,
    emailSchema,
    otpSchema,
    separatorConfig,
  };
}
