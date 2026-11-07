// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL и BASE_PATH задаются при сборке на хостинге (см. .github/workflows/deploy.yml).
// Без них сайт собирается под собственный домен в корне.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://silart.com',
  base: process.env.BASE_PATH ?? '/',
});
