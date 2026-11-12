/** Запись поискового индекса: серия каталога или страница сайта (см. src/pages/search.astro). */
export interface SearchItem {
  kind: 'series' | 'page';
  title: string;
  code?: string;
  label: string;
  tone: string;
  text: string;
  specs: string[];
  models: string[];
  href: string;
  linkText: string;
  keywords: string;
}
