import { Component, ContextType } from 'react';
import { BookSearchResponse } from '../api/models';
import { safeFetch } from '../api/safe-fetch';
import { OPEN_LIBRARY_URL } from '../api/urls';
import { ErrorContext } from '../components/ErrorBoundary';
import { ErrorButton } from '../components/ErrorButton';
import { Results } from '../components/Results';
import { TopControls } from '../components/TopControls';

export interface SearchPageState {
  response?: BookSearchResponse;
  isLoading: boolean;
}

const PAGE_SIZE = 5;

export class SearchPage extends Component<unknown, SearchPageState> {
  state: SearchPageState = {
    isLoading: false,
  };

  static contextType = ErrorContext;
  declare context: ContextType<typeof ErrorContext>;
  prevContextValue?: typeof this.context;

  componentDidUpdate() {
    if (this.context.error !== this.prevContextValue?.error) {
      if (this.context.error) {
        this.setState({ isLoading: false, response: undefined });
      }
      this.prevContextValue = this.context;
    }
  }

  handleSearch = async (search: string) => {
    if (!search) return;

    this.context.setError(null);
    this.setState({ isLoading: true });

    const q = encodeURIComponent(search);
    const url = `${OPEN_LIBRARY_URL}/search.json?q=${q}&limit=${PAGE_SIZE}`;

    const { error, data } = await safeFetch<BookSearchResponse>(url);

    if (error) this.context.setError(error);
    else this.setState({ response: data, isLoading: false });
  };

  render() {
    const { isLoading, response } = this.state;

    return (
      <>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-center text-base/7 font-semibold text-indigo-600">
            Open Library
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Search Your Favorite Books
          </h1>
          <p className="mt-2 text-lg/8 text-gray-600">
            Search for your favorite books and authors from the Open Library
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-xl flex-col gap-6 sm:mt-20">
          <TopControls onSearch={this.handleSearch} isLoading={isLoading} />
          <Results response={response} isLoading={isLoading} />
          <ErrorButton className="ml-auto" />
        </div>
      </>
    );
  }
}
