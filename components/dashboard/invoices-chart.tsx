'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface InvoicesChartProps {
  data: {
    name: string;
    date: Date;
    paid: number;
    pending: number;
    overdue: number;
  }[];
}

export function InvoicesChart({ data }: InvoicesChartProps) {
  return (
    <Card className="h-[350px]">
      <CardHeader>
        <CardTitle>Invoices Overview</CardTitle>
        <CardDescription>
          Track your invoice status over time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 15,
              right: 5,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="paid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="overdue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {format(new Date(payload[0].payload.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Paid
                          </span>
                          <span className="font-bold">
                            ${payload[0].value}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Pending
                          </span>
                          <span className="font-bold">
                            ${payload[1].value}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Overdue
                          </span>
                          <span className="font-bold">
                            ${payload[2].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <Area
              type="monotone"
              dataKey="paid"
              stroke="hsl(var(--chart-2))"
              fillOpacity={1}
              fill="url(#paid)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="pending"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#pending)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="overdue"
              stroke="hsl(var(--destructive))"
              fillOpacity={1}
              fill="url(#overdue)"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}