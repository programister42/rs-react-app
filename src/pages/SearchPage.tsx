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
    this.setState({ ...this.state, isLoading: true });

    const q = encodeURIComponent(search);
    const url = `${OPEN_LIBRARY_URL}/search.json?q=${q}&limit=${PAGE_SIZE}`;

    const { error, data } = await safeFetch<BookSearchResponse>(url);

    if (error) this.context.setError(error);
    else this.setState({ response: data, isLoading: false });
  };

  render() {
    return (
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          />
        </div>
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
          <TopControls
            onSearch={this.handleSearch}
            isLoading={this.state.isLoading}
          />
          <Results
            response={this.state.response}
            isLoading={this.state.isLoading}
          />
          <ErrorButton className="ml-auto" />
        </div>
      </div>
    );
  }
}
