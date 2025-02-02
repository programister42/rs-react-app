import { Component } from 'react';
import { BookSearchResponse } from '../api/models';
import { ErrorContext } from './ErrorBoundary';

interface ResultsProps {
  response?: BookSearchResponse;
  isLoading: boolean;
}

export class Results extends Component<ResultsProps> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  render() {
    const error = this.context?.error && (
      <h2 className="text-base/7 font-semibold text-red-600">
        ❌ {this.context.error.message}
      </h2>
    );

    const loader = this.props.isLoading && (
      <h2 className="animate-pulse text-base/7 font-semibold">Loading...</h2>
    );

    const books =
      this.props.response &&
      this.props.response?.docs.map((book, i) => {
        const booksLength = this.props?.response?.docs?.length;
        const isFirst = i === 0;
        const isLast = booksLength && i === booksLength - 1;
        return (
          <li
            key={book.key}
            className={`flex flex-col py-4 ${isFirst ? 'pt-0' : ''} ${isLast ? 'pb-0' : ''} ${!isLast ? 'border-b border-gray-200' : ''}`}
          >
            <h3 className="text-lg font-medium tracking-tight text-gray-950">
              📖&nbsp;{book.title}
            </h3>
            <p className="text-sm/6 text-gray-600 ">
              {book.author_name.length > 1 ? '👥' : '👤'}&nbsp;
              {book.author_name?.join(', ')}
            </p>
          </li>
        );
      });

    const noContent = (
      <h2 className="text-base/7 font-semibold opacity-80">No content 🤷</h2>
    );

    return (
      <ul className="inset-px flex h-full flex-col overflow-hidden rounded-lg bg-white p-8 ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem] sm:p-10">
        {error || loader || books || noContent}
      </ul>
    );
  }
}
