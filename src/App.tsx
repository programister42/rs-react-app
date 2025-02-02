import { Component } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchPage } from './pages/SearchPage';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    );
  }
}

export default App;
