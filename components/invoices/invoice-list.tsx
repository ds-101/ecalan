'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  issueDate: Date;
  dueDate: Date;
}

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices: initialInvoices }: InvoiceListProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Invoice;
    direction: 'ascending' | 'descending';
  }>({
    key: 'issueDate',
    direction: 'descending',
  });

  // Apply filters and sorting
  const filteredInvoices = invoices
    .filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Special case for string comparison
      if (sortConfig.key === 'client' || sortConfig.key === 'invoiceNumber') {
        return sortConfig.direction === 'ascending'
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
      
      // Special case for date comparison
      if (sortConfig.key === 'issueDate' || sortConfig.key === 'dueDate') {
        return sortConfig.direction === 'ascending'
          ? a[sortConfig.key].getTime() - b[sortConfig.key].getTime()
          : b[sortConfig.key].getTime() - a[sortConfig.key].getTime();
      }
      
      // Default for numbers
      return sortConfig.direction === 'ascending'
        ? (a[sortConfig.key] as number) - (b[sortConfig.key] as number)
        : (b[sortConfig.key] as number) - (a[sortConfig.key] as number);
    });

  const handleSort = (key: keyof Invoice) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    });
  };

  const getStatusBadgeColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-muted text-muted-foreground';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500';
      case 'paid':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500';
      case 'overdue':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-500';
      case 'cancelled':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Invoice
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('invoiceNumber')}
              >
                <div className="flex items-center gap-1">
                  Invoice
                  {sortConfig.key === 'invoiceNumber' && (
                    <span>
                      {sortConfig.direction === 'ascending' ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('client')}
              >
                <div className="flex items-center gap-1">
                  Client
                  {sortConfig.key === 'client' && (
                    <span>
                      {sortConfig.direction === 'ascending' ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end gap-1">
                  Amount
                  {sortConfig.key === 'amount' && (
                    <span>
                      {sortConfig.direction === 'ascending' ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('issueDate')}
              >
                <div className="flex items-center gap-1">
                  Issue Date
                  {sortConfig.key === 'issueDate' && (
                    <span>
                      {sortConfig.direction === 'ascending' ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('dueDate')}
              >
                <div className="flex items-center gap-1">
                  Due Date
                  {sortConfig.key === 'dueDate' && (
                    <span>
                      {sortConfig.direction === 'ascending' ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeColor(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {format(invoice.issueDate, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(invoice.dueDate, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDownIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/invoices/${invoice.id}`}>
                            <EyeIcon className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}