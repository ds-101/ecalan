import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            InvoicePro
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign In
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Streamline Your Invoicing
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Professional Invoicing for{' '}
                  <span className="text-primary">Growing Businesses</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create, send, and track invoices with ease. Get paid faster and focus on what you do best.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-1.5">
                    Get Started
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to manage your invoicing process efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Professional Invoices',
                  description:
                    'Create beautiful, customizable invoices that reflect your brand identity.',
                },
                {
                  title: 'Client Management',
                  description:
                    'Organize all your client information in one place for easy access.',
                },
                {
                  title: 'Payment Tracking',
                  description:
                    'Track payments and automatically send reminders for overdue invoices.',
                },
                {
                  title: 'Financial Reports',
                  description:
                    'Generate detailed reports to gain insights into your business finances.',
                },
                {
                  title: 'Secure Cloud Storage',
                  description:
                    'All your data is safely stored in the cloud and accessible from anywhere.',
                },
                {
                  title: 'Time-Saving Automation',
                  description:
                    'Automate recurring invoices and payment reminders to save time.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CheckIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of businesses that trust InvoicePro for their invoicing needs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-1.5">
                    Sign Up Now
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 border-t px-4 py-6 md:px-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ecalan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}