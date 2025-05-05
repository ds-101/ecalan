import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  change,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="mt-2 flex items-center text-sm">
            <div
              className={cn(
                'mr-1 rounded-full px-1.5 py-0.5 text-xs font-medium',
                change.trend === 'up'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : change.trend === 'down'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {change.trend === 'up' ? '+' : change.trend === 'down' ? '-' : ''}
              {Math.abs(change.value)}%
            </div>
            <div className="text-muted-foreground">vs last month</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}