import { Component, ContextType } from 'react';
import { ErrorContext } from './ErrorBoundary';

interface ErrorButtonProps {
  className?: string;
}

export class ErrorButton extends Component<ErrorButtonProps> {
  static contextType = ErrorContext;
  declare context: ContextType<typeof ErrorContext>;

  handleClick = () => {
    this.context.setError(new Error('Error thrown from ErrorButton'));
  };

  render() {
    return (
      <button
        className={`${this.props.className ?? ''} w-fit block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-red-600 ring-1 shadow-xs ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
        onClick={this.handleClick}
      >
        Trow Error<span className="ml-2">🚨</span>
      </button>
    );
  }
}
