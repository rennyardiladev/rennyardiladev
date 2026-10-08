'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'pink' | 'line' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  download?: string | boolean;
}

const sizeClasses = {
  sm: 'px-4 py-1 text-sm',
  md: 'px-6 py-2 text-sm',
  lg: 'px-8 py-3 text-base',
};

const variantClasses = {
  pink: 'bg-[var(--pink)] text-white hover:bg-[#d61a6b] shadow-md hover:scale-105',
  line: 'border border-[var(--muted)] text-[var(--ink)] hover:bg-white hover:shadow-md',
  ghost: 'text-[var(--ink)] hover:bg-white/50',
};

export default function Button({
  variant = 'pink',
  size = 'md',
  children,
  href,
  className,
  ...rest
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest as ButtonHTMLAttributes<HTMLAnchorElement> & { download?: string | boolean }}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
