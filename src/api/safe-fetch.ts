type SafeFetchResponse<T> =
  | { error: Error; data: null }
  | { error: null; data: T };

export async function safeFetch<T>(url: string): Promise<SafeFetchResponse<T>> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { data: null, error: mapStatusToError(res.status) };
    }

    const data = await res.json();
    return { error: null, data };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e : new Error('Unknown error'),
    };
  }
}

function mapStatusToError(status: number): Error {
  if (status === 404) return new Error('Not found');
  if (status === 401) return new Error('Unauthorized');
  if (status === 403) return new Error('Forbidden');
  if (status.toString().startsWith('5')) return new Error('Server error');
  return new Error('Unknown error');
}
