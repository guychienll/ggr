import React, { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>{this.state.error?.message || ''}</h1>;
    }

    return this.props.children;
  }
}

const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  return class WithErrorBoundary extends React.Component<P> {
    render() {
      return (
        <ErrorBoundary>
          <Component {...this.props} />
        </ErrorBoundary>
      );
    }
  };
};

export { withErrorBoundary };
export default ErrorBoundary;
