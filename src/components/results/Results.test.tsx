import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { expect, test, vi } from 'vitest';
import { BookSearchResponse } from '../../api/models';
import { ErrorContext } from '../ErrorBoundary';
import { Results, ResultsProps } from './Results';

const mockResponse: BookSearchResponse = {
  docs: Array.from({ length: 5 }, (_, i) => ({
    title: `Test Book ${i}`,
    author_name: [`Test Author ${i}`],
    cover_i: i,
    edition_count: i,
    first_publish_year: 2000 + i,
    key: `key-${i}`,
  })),
  num_found: 5,
  start: 0,
};

const renderResults = (
  props: ResultsProps & {
    error: Error | null;
  }
) => {
  return render(
    <BrowserRouter>
      <ErrorContext.Provider value={{ error: props.error, setError: vi.fn() }}>
        <Results response={props.response} isLoading={props.isLoading} />
      </ErrorContext.Provider>
    </BrowserRouter>
  );
};

test('renders no content message when response is empty', () => {
  renderResults({
    response: { docs: [], num_found: 0, start: 0 },
    isLoading: false,
    error: null,
  });

  expect(
    screen.getByRole('heading', { name: 'No content 🤷' })
  ).toBeInTheDocument();
});

test('renders books when response contains data', () => {
  renderResults({
    response: mockResponse,
    isLoading: false,
    error: null,
  });

  expect(screen.getAllByRole('link')).toHaveLength(5);
});
