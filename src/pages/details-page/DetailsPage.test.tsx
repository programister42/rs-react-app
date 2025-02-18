import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';
import { Work } from '../../api/models';
import { DetailsPage } from './DetailsPage';

const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '' }),
  useParams: () => ({ category: 'works', workId: '123' }),
}));

const mockWork = {
  title: 'Test Book',
  description: 'Test Description',
  covers: [12345],
  key: '/works/123',
} satisfies Work;

const server = setupServer(
  http.get('*.json', () => {
    return HttpResponse.json(mockWork);
  }),
  http.get('*', () => {
    return new HttpResponse(null, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should show loading indicator while fetching data', () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /Loading/i })).toBeInTheDocument();
});

test('should display work details after loading', async () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(
    await screen.findByRole('heading', { name: new RegExp(mockWork.title) })
  ).toBeInTheDocument();
  expect(
    await screen.findByText(new RegExp(mockWork.description))
  ).toBeInTheDocument();
});

test('should navigate away when clicking outside the component', async () => {
  const user = userEvent.setup();
  const testHeaderText = 'Test Header';

  render(
    <MemoryRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>{testHeaderText}</h1>
              <DetailsPage />
            </div>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(
    await screen.findByRole('heading', { name: new RegExp(mockWork.title) })
  ).toBeInTheDocument();

  await user.click(screen.getByText(testHeaderText));

  expect(mockNavigate).toHaveBeenCalledWith('/search');
});
