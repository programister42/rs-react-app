import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, useSearchParams } from 'react-router';
import { afterEach, beforeEach, expect, Mock, test, vi } from 'vitest';
import { Pagination } from './Pagination';

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

beforeEach(() => {
  (useSearchParams as Mock).mockReturnValue([
    mockSearchParams,
    mockSetSearchParams,
  ]);
});

afterEach(() => {
  vi.clearAllMocks();
});

test('should render pagination with correct page numbers', () => {
  render(
    <MemoryRouter>
      <Pagination pages={5} currentPage={1} />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '5' })).toBeInTheDocument();
});

test('should update URL when clicking on page number', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Pagination pages={5} currentPage={1} />
    </MemoryRouter>
  );

  const page2Link = screen.getByRole('link', { name: '2' });
  await user.click(page2Link);

  const expectedParams = new URLSearchParams();
  expectedParams.set('page', '2');

  expect(page2Link).toHaveAttribute('href', `/?${expectedParams.toString()}`);
});

test('should display next/previous buttons appropriately', () => {
  render(
    <MemoryRouter>
      <Pagination pages={5} currentPage={2} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('link', { name: new RegExp('Previous') })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: new RegExp('Next') })
  ).toBeInTheDocument();
});

test('should not display previous button on first page', () => {
  render(
    <MemoryRouter>
      <Pagination pages={5} currentPage={1} />
    </MemoryRouter>
  );

  expect(
    screen.queryByRole('link', { name: new RegExp('Previous') })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: new RegExp('Next') })
  ).toBeInTheDocument();
});

test('should not display next button on last page', () => {
  render(
    <MemoryRouter>
      <Pagination pages={5} currentPage={5} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('link', { name: new RegExp('Previous') })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: new RegExp('Next') })
  ).not.toBeInTheDocument();
});
