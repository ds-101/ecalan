import { subDays, addDays } from 'date-fns';
import { InvoiceList } from '@/components/invoices/invoice-list';

// In a real app, this would be fetched from the database
const invoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    client: 'Acme Inc.',
    amount: 1250.75,
    status: 'paid',
    issueDate: subDays(new Date(), 20),
    dueDate: subDays(new Date(), 5),
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    client: 'Globex Corp',
    amount: 3420.00,
    status: 'pending',
    issueDate: subDays(new Date(), 10),
    dueDate: addDays(new Date(), 7),
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    client: 'Initech LLC',
    amount: 870.25,
    status: 'overdue',
    issueDate: subDays(new Date(), 15),
    dueDate: subDays(new Date(), 2),
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    client: 'Umbrella Corp',
    amount: 2100.50,
    status: 'draft',
    issueDate: subDays(new Date(), 5),
    dueDate: addDays(new Date(), 14),
  },
  {
    id: '5',
    invoiceNumber: 'INV-2025-005',
    client: 'Wayne Enterprises',
    amount: 4750.00,
    status: 'paid',
    issueDate: subDays(new Date(), 25),
    dueDate: subDays(new Date(), 10),
  },
  {
    id: '6',
    invoiceNumber: 'INV-2025-006',
    client: 'Stark Industries',
    amount: 6200.75,
    status: 'pending',
    issueDate: subDays(new Date(), 8),
    dueDate: addDays(new Date(), 10),
  },
  {
    id: '7',
    invoiceNumber: 'INV-2025-007',
    client: 'Oscorp',
    amount: 1850.00,
    status: 'cancelled',
    issueDate: subDays(new Date(), 12),
    dueDate: addDays(new Date(), 5),
  },
  {
    id: '8',
    invoiceNumber: 'INV-2025-008',
    client: 'Daily Planet',
    amount: 950.25,
    status: 'paid',
    issueDate: subDays(new Date(), 18),
    dueDate: subDays(new Date(), 3),
  },
];

export default function InvoicesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground">
          Manage and track all your invoices in one place
        </p>
      </div>

      <InvoiceList invoices={invoices} />
    </div>
  );
}