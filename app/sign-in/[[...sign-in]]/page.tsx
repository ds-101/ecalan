import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-semibold">
        InvoicePro
      </div>
      <SignIn
        appearance={{
          elements: {
            card: 'bg-card shadow-lg',
            formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
          },
        }}
      />
    </div>
  );
}