export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'hover:cursor-pointer',
      },
    },
    link: {
      base: 'hover:cursor-pointer',
    },
    authForm: {
      slots: {
        root: 'w-full max-w-sm space-y-6',
        header: 'flex flex-col text-center',
        leading: 'mb-2',
        leadingIcon: 'size-8 shrink-0 inline-block',
        title: 'text-2xl text-pretty font-semibold text-black',
        description: 'mt-1 text-base text-pretty text-muted',
        body: 'gap-y-6 flex flex-col',
        providers: 'space-y-3',
        checkbox: '',
        select: 'w-full',
        password: 'w-full',
        otp: 'w-full',
        input: 'w-full',
        separator: '',
        form: 'space-y-5',
        footer: 'text-sm text-center text-muted mt-2',
      },
    },
    navigationMenu: {
      slots: {
        list: 'space-y-0.5',
        link: 'hover:cursor-pointer',
        label: 'text-muted',
      },
    },
  },
});
