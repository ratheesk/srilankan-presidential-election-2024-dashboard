import 'jquery';

declare global {
  interface JQuery {
    mapael: (options?: unknown) => JQuery;
  }
}
