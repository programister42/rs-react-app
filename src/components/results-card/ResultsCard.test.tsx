import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { Book } from '../../api/models';
import { ResultsCard } from './ResultsCard';

const mockBook = {
  key: '/works/123',
  title: 'Test Book',
  author_name: ['Test Author'],
  cover_i: 123,
  edition_count: 1,
  first_publish_year: 2000,
} satisfies Book;

const defaultProps = {
  book: mockBook,
};

test('renders book title and author', () => {
  render(
    <MemoryRouter>
      <ResultsCard {...defaultProps} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: new RegExp(mockBook.title) })
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(mockBook.author_name[0]))
  ).toBeInTheDocument();
});

test('renders multiple authors with proper icon', () => {
  const multiAuthorBook = {
    ...mockBook,
    author_name: ['Author 1', 'Author 2'],
  };

  render(
    <MemoryRouter>
      <ResultsCard {...defaultProps} book={multiAuthorBook} />
    </MemoryRouter>
  );

  const authorText = screen.getByText(
    new RegExp(multiAuthorBook.author_name.join(', '))
  );

  expect(authorText).toBeInTheDocument();
  expect(authorText.textContent).toContain('👥');
});

test('renders correct link with search params', () => {
  render(
    <MemoryRouter>
      <ResultsCard {...defaultProps} />
    </MemoryRouter>
  );

  const link = screen.getByRole('link');

  expect(link).toHaveAttribute('href', '/works/123');
});

test('applies custom className when provided', () => {
  render(
    <MemoryRouter>
      <ResultsCard {...defaultProps} className="custom-class" />
    </MemoryRouter>
  );

  const link = screen.getByRole('link');

  expect(link.className).toContain('custom-class');
});
