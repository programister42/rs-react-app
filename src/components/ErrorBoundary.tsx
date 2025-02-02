import { Component, createContext, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  setError: (e: Error | null) => void;
}
const defaultErrorState: ErrorBoundaryState = {
  error: null,
  setError: () => {},
};

export const ErrorContext =
  createContext<ErrorBoundaryState>(defaultErrorState);

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  setError = (error: Error | null) => {
    this.setState({ error });
  };

  state = { error: null, setError: this.setError };

  static getDerivedStateFromError(e: unknown) {
    return e instanceof Error ? { error: e } : 'Unknown error';
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.log(error, info.componentStack);
  }

  render() {
    return (
      <ErrorContext.Provider value={this.state}>
        {this.props.children}
      </ErrorContext.Provider>
    );
  }
}
