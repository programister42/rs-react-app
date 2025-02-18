import cn from 'classnames';
import { useContext } from 'react';
import { ErrorContext } from './ErrorBoundary';

interface ErrorButtonProps {
  className?: string;
}

export function ErrorButton({ className }: ErrorButtonProps) {
  const { setError } = useContext(ErrorContext);

  const handleClick = () => {
    setError(new Error('Error thrown from ErrorButton'));
  };

  return (
    <button
      className={cn(
        `w-fit block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-red-600 ring-1 shadow-xs ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`,
        className
      )}
      onClick={handleClick}
    >
      Throw error<span className="ml-2">🚨</span>
    </button>
  );
}
