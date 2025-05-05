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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Client {
  id: string;
  name: string;
  email: string;
  companyName: string;
  phone: string;
  createdAt: Date;
  invoiceCount: number;
  totalSpent: number;
}

interface ClientListProps {
  clients: Client[];
}

export function ClientList({ clients: initialClients }: ClientListProps) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client;
    direction: 'ascending' | 'descending';
  }>({
    key: 'createdAt',
    direction: 'descending',
  });

  // Apply filters and sorting
  const filteredClients = clients
    .filter((client) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchTermLower) ||
        client.email.toLowerCase().includes(searchTermLower) ||
        client.companyName.toLowerCase().includes(searchTermLower) ||
        client.phone.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      // Special case for string comparison
      if (
        sortConfig.key === 'name' ||
        sortConfig.key === 'email' ||
        sortConfig.key === 'companyName' ||
        sortConfig.key === 'phone'
      ) {
        return sortConfig.direction === 'ascending'
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
      
      // Special case for date comparison
      if (sortConfig.key === 'createdAt') {
        return sortConfig.direction === 'ascending'
          ? a[sortConfig.key].getTime() - b[sortConfig.key].getTime()
          : b[sortConfig.key].getTime() - a[sortConfig.key].getTime();
      }
      
      // Default for numbers
      return sortConfig.direction === 'ascending'
        ? (a[sortConfig.key] as number) - (b[sortConfig.key] as number)
        : (b[sortConfig.key] as number) - (a[sortConfig.key] as number);
    });

  const handleSort = (key: keyof Client) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/dashboard/clients/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Client
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Name
                  {sortConfig.key === 'name' && (
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
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-1">
                  Email
                  {sortConfig.key === 'email' && (
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
                onClick={() => handleSort('companyName')}
              >
                <div className="flex items-center gap-1">
                  Company
                  {sortConfig.key === 'companyName' && (
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
                onClick={() => handleSort('invoiceCount')}
              >
                <div className="flex items-center gap-1">
                  Invoices
                  {sortConfig.key === 'invoiceCount' && (
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
                className="cursor-pointer text-right"
                onClick={() => handleSort('totalSpent')}
              >
                <div className="flex items-center justify-end gap-1">
                  Total Spent
                  {sortConfig.key === 'totalSpent' && (
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
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center gap-1">
                  Client Since
                  {sortConfig.key === 'createdAt' && (
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
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.companyName}</TableCell>
                  <TableCell>{client.invoiceCount}</TableCell>
                  <TableCell className="text-right">
                    ${client.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {format(client.createdAt, 'MMM dd, yyyy')}
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
                          <Link href={`/dashboard/clients/${client.id}`}>
                            <EyeIcon className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Create Invoice</DropdownMenuItem>
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