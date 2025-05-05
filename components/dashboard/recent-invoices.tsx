import { BanknoteIcon, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  dueDate: Date;
}

interface RecentInvoicesProps {
  invoices: Invoice[];
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>Your most recent invoices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {invoice.invoiceNumber}
                </p>
                <p className="text-sm text-muted-foreground">{invoice.client}</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                <p
                  className={`text-xs ${
                    invoice.status === 'paid'
                      ? 'text-emerald-500'
                      : invoice.status === 'pending'
                      ? 'text-amber-500'
                      : invoice.status === 'overdue'
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </p>
              </div>
              <div className="ml-4 flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{format(invoice.dueDate, 'MMM d')}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}