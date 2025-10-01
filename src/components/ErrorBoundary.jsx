import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-moon-900 via-werewolf-900 to-blood-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-moon-800 rounded-lg shadow-2xl border border-blood-600 p-8 text-center">
            <div className="text-6xl mb-4">🐺💥</div>
            <h2 className="text-2xl font-bold text-blood-400 mb-4">
              Something went wrong!
            </h2>
            <p className="text-moon-300 mb-6">
              The werewolves have caused some chaos in the application. 
              Don't worry, we're tracking them down!
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6 bg-moon-900 p-4 rounded border border-moon-600">
                <summary className="text-blood-300 cursor-pointer mb-2">
                  Error Details (Development Mode)
                </summary>
                <pre className="text-xs text-moon-400 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blood-600 hover:bg-blood-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                🔄 Reload Application
              </button>
              
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="w-full bg-moon-600 hover:bg-moon-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                🎯 Try Again
              </button>
            </div>
            
            <p className="text-xs text-moon-500 mt-6">
              If this problem persists, try refreshing the page or clearing your browser cache.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;