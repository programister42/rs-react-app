export interface BookSearchResponse {
  start: number;
  num_found: number;
  docs: Book[];
}

export interface Book {
  key: string;
  cover_i: number;
  title: string;
  author_name?: string[];
  first_publish_year: number;
  edition_count: number;
}
