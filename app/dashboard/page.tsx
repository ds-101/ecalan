import { CreditCardIcon, DollarSignIcon, LineChartIcon, UserIcon } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { InvoicesChart } from '@/components/dashboard/invoices-chart';
import { StatusDistribution } from '@/components/dashboard/status-distribution';
import { RecentInvoices } from '@/components/dashboard/recent-invoices';
import { addDays, subDays } from 'date-fns';

// This would normally come from the database
const invoicesChartData = [
  {
    name: 'Jan',
    date: new Date(2025, 0, 1),
    paid: 4500,
    pending: 2500,
    overdue: 500,
  },
  {
    name: 'Feb',
    date: new Date(2025, 1, 1),
    paid: 6000,
    pending: 1500,
    overdue: 1000,
  },
  {
    name: 'Mar',
    date: new Date(2025, 2, 1),
    paid: 8500,
    pending: 3000,
    overdue: 1500,
  },
  {
    name: 'Apr',
    date: new Date(2025, 3, 1),
    paid: 7000,
    pending: 2000,
    overdue: 500,
  },
  {
    name: 'May',
    date: new Date(2025, 4, 1),
    paid: 9000,
    pending: 3500,
    overdue: 1000,
  },
  {
    name: 'Jun',
    date: new Date(2025, 5, 1),
    paid: 12000,
    pending: 1500,
    overdue: 800,
  },
];

const statusDistributionData = [
  { name: 'Paid', value: 12000, color: 'hsl(var(--chart-2))' },
  { name: 'Pending', value: 8000, color: 'hsl(var(--chart-1))' },
  { name: 'Overdue', value: 3000, color: 'hsl(var(--destructive))' },
  { name: 'Draft', value: 2000, color: 'hsl(var(--chart-3))' },
];

const recentInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    client: 'Acme Inc.',
    amount: 1250.75,
    status: 'paid',
    dueDate: subDays(new Date(), 5),
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    client: 'Globex Corp',
    amount: 3420.00,
    status: 'pending',
    dueDate: addDays(new Date(), 7),
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    client: 'Initech LLC',
    amount: 870.25,
    status: 'overdue',
    dueDate: subDays(new Date(), 2),
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    client: 'Umbrella Corp',
    amount: 2100.50,
    status: 'draft',
    dueDate: addDays(new Date(), 14),
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your invoicing dashboard! Here's a summary of your business performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$24,500"
          icon={<DollarSignIcon className="h-5 w-5 text-primary" />}
          change={{ value: 12, trend: 'up' }}
        />
        <StatsCard
          title="Pending Amount"
          value="$8,000"
          icon={<LineChartIcon className="h-5 w-5 text-primary" />}
          change={{ value: 4, trend: 'down' }}
        />
        <StatsCard
          title="Invoices Sent"
          value="87"
          icon={<CreditCardIcon className="h-5 w-5 text-primary" />}
          change={{ value: 8, trend: 'up' }}
        />
        <StatsCard
          title="Active Clients"
          value="26"
          icon={<UserIcon className="h-5 w-5 text-primary" />}
          change={{ value: 2, trend: 'up' }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-4">
          <InvoicesChart data={invoicesChartData} />
        </div>
        <div className="md:col-span-3">
          <StatusDistribution data={statusDistributionData} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-12">
          <RecentInvoices invoices={recentInvoices} />
        </div>
      </div>
    </div>
  );
}