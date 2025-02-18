import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, expect, Mock, test, vi } from 'vitest';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TopControls } from './TopControls';

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

const mockSetSearch = vi.fn();
const mockSetSearchParams = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  (useLocalStorage as Mock).mockReturnValue(['', mockSetSearch]);

  vi.mock('react-router', async (importOriginal) => ({
    ...(await importOriginal()),
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
  }));
});

test('retrieves value from localStorage on mount', () => {
  const storedValue = 'test search';

  (useLocalStorage as Mock).mockReturnValue([storedValue, mockSetSearch]);

  render(
    <MemoryRouter>
      <TopControls isLoading={false} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
  expect(input.value).toBe(storedValue);
});

test('updates search params and localStorage when search button is clicked', async () => {
  const user = userEvent.setup();
  const testValue = 'test search';

  (useLocalStorage as Mock).mockReturnValue([testValue, mockSetSearch]);

  render(
    <MemoryRouter>
      <TopControls isLoading={false} />
    </MemoryRouter>
  );

  const searchButton = screen.getByText('Search');
  await user.click(searchButton);

  expect(mockSetSearchParams).toHaveBeenCalled();
  const newParams = mockSetSearchParams.mock.calls[0][0];
  expect(newParams.get('q')).toBe(testValue);
  expect(newParams.get('page')).toBe('1');
});

test('updates search value when input changes', async () => {
  const user = userEvent.setup();
  const testValue = 's';

  render(
    <MemoryRouter>
      <TopControls isLoading={false} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Search...');
  await user.type(input, testValue);

  expect(mockSetSearch).toHaveBeenCalledWith(testValue);
});

test('triggers search on Enter key press', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <TopControls isLoading={false} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText('Search...');
  await user.type(input, '{enter}');

  expect(mockSetSearchParams).toHaveBeenCalled();
});
