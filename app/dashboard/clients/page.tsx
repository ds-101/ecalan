import { subMonths } from 'date-fns';
import { ClientList } from '@/components/clients/client-list';

// In a real app, this would be fetched from the database
const clients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acmeinc.com',
    companyName: 'Acme Inc.',
    phone: '(555) 123-4567',
    createdAt: subMonths(new Date(), 12),
    invoiceCount: 8,
    totalSpent: 12500.75,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@globexcorp.com',
    companyName: 'Globex Corp',
    phone: '(555) 234-5678',
    createdAt: subMonths(new Date(), 8),
    invoiceCount: 5,
    totalSpent: 8420.00,
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@initech.com',
    companyName: 'Initech LLC',
    phone: '(555) 345-6789',
    createdAt: subMonths(new Date(), 6),
    invoiceCount: 3,
    totalSpent: 3870.25,
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@umbrella.com',
    companyName: 'Umbrella Corp',
    phone: '(555) 456-7890',
    createdAt: subMonths(new Date(), 4),
    invoiceCount: 2,
    totalSpent: 2100.50,
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@wayne.com',
    companyName: 'Wayne Enterprises',
    phone: '(555) 567-8901',
    createdAt: subMonths(new Date(), 10),
    invoiceCount: 7,
    totalSpent: 9750.00,
  },
  {
    id: '6',
    name: 'Jennifer Miller',
    email: 'jennifer@stark.com',
    companyName: 'Stark Industries',
    phone: '(555) 678-9012',
    createdAt: subMonths(new Date(), 5),
    invoiceCount: 4,
    totalSpent: 6200.75,
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert@oscorp.com',
    companyName: 'Oscorp',
    phone: '(555) 789-0123',
    createdAt: subMonths(new Date(), 3),
    invoiceCount: 1,
    totalSpent: 1850.00,
  },
  {
    id: '8',
    name: 'Jessica Anderson',
    email: 'jessica@dailyplanet.com',
    companyName: 'Daily Planet',
    phone: '(555) 890-1234',
    createdAt: subMonths(new Date(), 2),
    invoiceCount: 2,
    totalSpent: 950.25,
  },
];

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">
          Manage your client relationships and view their invoice history
        </p>
      </div>

      <ClientList clients={clients} />
    </div>
  );
}