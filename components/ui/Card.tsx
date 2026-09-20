import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'interactive';
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, children, ...props }, ref) => {
    const variantClasses = {
      default:
        'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card',
      elevated:
        'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-elevated',
      subtle:
        'bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60',
      interactive:
        'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-elevated transition-all duration-200',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-200',
          variantClasses[variant],
          hoverEffect && 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-elevated',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5 sm:p-6 pb-3 sm:pb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5 sm:p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'p-4 sm:p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
