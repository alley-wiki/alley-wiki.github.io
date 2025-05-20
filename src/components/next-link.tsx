import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

interface NextLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function NextLink({ children, className, ...props }: NextLinkProps) {
  return (
    <Link 
      {...props} 
      prefetch={false} 
      scroll={false}
      className={className}
    >
      {children}
    </Link>
  );
} 