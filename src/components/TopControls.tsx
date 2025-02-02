import { ChangeEvent, Component } from 'react';
import { Spinner } from './Spinner';

interface TopControlsProps {
  onSearch: (search: string) => unknown;
  isLoading: boolean;
}

interface TopControlsState {
  search: string;
}

export class TopControls extends Component<TopControlsProps, TopControlsState> {
  state: TopControlsState = {
    search: localStorage.getItem('SEARCH') ?? '',
  };

  componentDidMount(): void {
    this.props.onSearch(this.state.search);
  }

  handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = async () => {
    localStorage.setItem('SEARCH', this.state.search);
    this.props.onSearch(this.state.search.trim());
  };

  render() {
    return (
      <div className="flex gap-6">
        <input
          type="text"
          placeholder="Search..."
          autoComplete="search"
          className="block grow rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          value={this.state.search}
          onChange={this.handleSearchInputChange}
          onKeyUp={(e) => e.key === 'Enter' && this.handleSearch()}
        />
        <button
          className="flex gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={this.handleSearch}
        >
          <span>Search</span>
          <span>
            {this.props.isLoading ? (
              <Spinner className="size-5 text-white" />
            ) : (
              '🔍'
            )}
          </span>
        </button>
      </div>
    );
  }
}
