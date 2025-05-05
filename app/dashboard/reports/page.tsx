'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DateRange } from 'react-day-picker';
import { format, subMonths } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Example data for charts
const revenueData = [
  { name: 'Jan', total: 4500 },
  { name: 'Feb', total: 6000 },
  { name: 'Mar', total: 8500 },
  { name: 'Apr', total: 7000 },
  { name: 'May', total: 9000 },
  { name: 'Jun', total: 12000 },
  { name: 'Jul', total: 11000 },
  { name: 'Aug', total: 13500 },
  { name: 'Sep', total: 14200 },
  { name: 'Oct', total: 15500 },
  { name: 'Nov', total: 16800 },
  { name: 'Dec', total: 18000 },
];

const clientGrowthData = [
  { name: 'Jan', clients: 8 },
  { name: 'Feb', clients: 10 },
  { name: 'Mar', clients: 13 },
  { name: 'Apr', clients: 15 },
  { name: 'May', clients: 18 },
  { name: 'Jun', clients: 20 },
  { name: 'Jul', clients: 22 },
  { name: 'Aug', clients: 25 },
  { name: 'Sep', clients: 28 },
  { name: 'Oct', clients: 31 },
  { name: 'Nov', clients: 34 },
  { name: 'Dec', clients: 38 },
];

const invoiceStatusData = [
  { name: 'Paid', value: 12000, color: 'hsl(var(--chart-2))' },
  { name: 'Pending', value: 8000, color: 'hsl(var(--chart-1))' },
  { name: 'Overdue', value: 3000, color: 'hsl(var(--destructive))' },
  { name: 'Draft', value: 2000, color: 'hsl(var(--chart-3))' },
];

export default function ReportsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analyze your business performance with detailed reports
          </p>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left sm:w-auto"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>
                Your revenue growth over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-3 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-bold">
                                ${payload[0].value}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Revenue Sources</CardTitle>
                <CardDescription>Your highest paying clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Acme Inc.', value: 12500.75 },
                    { name: 'Wayne Enterprises', value: 9750.00 },
                    { name: 'Stark Industries', value: 6200.75 },
                    { name: 'Globex Corp', value: 4200.00 },
                    { name: 'Initech LLC', value: 3870.25 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.name}</div>
                      </div>
                      <div className="text-right font-medium">
                        ${item.value.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Month</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-sm">
                              <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">
                                  {payload[0].payload.name}
                                </span>
                                <span className="font-bold">
                                  ${payload[0].value}
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--chart-2))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Growth</CardTitle>
              <CardDescription>
                New client acquisition over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientGrowthData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-3 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-bold">
                                {payload[0].value} clients
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--chart-4))" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Retention</CardTitle>
                <CardDescription>Percentage of returning clients</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Returning', value: 75, color: 'hsl(var(--chart-2))' },
                        { name: 'New', value: 25, color: 'hsl(var(--chart-4))' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Returning', value: 75, color: 'hsl(var(--chart-2))' },
                        { name: 'New', value: 25, color: 'hsl(var(--chart-4))' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Clients</CardTitle>
                <CardDescription>Clients by invoice count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Acme Inc.', count: 8 },
                    { name: 'Wayne Enterprises', count: 7 },
                    { name: 'Stark Industries', count: 5 },
                    { name: 'Globex Corp', count: 4 },
                    { name: 'Umbrella Corp', count: 3 },
                  ].map((client, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{client.name}</div>
                      </div>
                      <div className="text-right font-medium">
                        {client.count} invoices
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status Distribution</CardTitle>
              <CardDescription>
                Current distribution of invoices by status
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {invoiceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-3 shadow-sm">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">
                                {payload[0].name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ${payload[0].value}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {(payload[0].percent * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Timeline</CardTitle>
                <CardDescription>Average days to payment</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Acme Inc.', days: 12 },
                      { name: 'Wayne Ent.', days: 8 },
                      { name: 'Stark Ind.', days: 15 },
                      { name: 'Globex', days: 22 },
                      { name: 'Initech', days: 18 },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="days" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Invoices</CardTitle>
                <CardDescription>Invoices requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'INV-2025-003', client: 'Initech LLC', amount: 870.25, status: 'overdue', days: 14 },
                    { id: 'INV-2025-007', client: 'Oscorp', amount: 1850.00, status: 'overdue', days: 7 },
                    { id: 'INV-2025-012', client: 'Cyberdyne', amount: 3200.50, status: 'overdue', days: 5 },
                    { id: 'INV-2025-002', client: 'Globex Corp', amount: 3420.00, status: 'pending', days: 0 },
                    { id: 'INV-2025-006', client: 'Stark Industries', amount: 6200.75, status: 'pending', days: 0 },
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{invoice.id}</div>
                        <div className="text-sm text-muted-foreground">{invoice.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${invoice.amount.toFixed(2)}</div>
                        <div className={cn(
                          "text-xs",
                          invoice.status === 'overdue' ? "text-destructive" : "text-amber-500"
                        )}>
                          {invoice.status === 'overdue' ? `${invoice.days} days overdue` : 'Payment pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}