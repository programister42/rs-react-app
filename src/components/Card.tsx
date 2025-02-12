import cn from 'classnames';
import { ReactNode } from 'react';

interface ModalRendererProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: ModalRendererProps) {
  return (
    <div
      className={cn(
        'inset-px flex h-full flex-col overflow-hidden rounded-lg bg-white p-8 ring-1 shadow-sm ring-black/5 sm:p-10',
        className
      )}
    >
      {children}
    </div>
  );
}
