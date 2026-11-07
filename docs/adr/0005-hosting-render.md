# ADR-0005: Хостинг — Render Static Site

- **Статус:** Заменено [ADR-0006](0006-hosting-github-pages.md)
- **Дата:** 2026-11-07
- **Связанные ADR:** [ADR-0002](0002-site-architecture-approach.md), [ADR-0003](0003-static-site-generator-choice.md)

## Контекст

Сайт статический (Astro, сборка в `dist/`). Нужен хостинг с CDN, HTTPS, автоматическим деплоем
из GitHub и возможностью позже подключить домен silart.com. Владелец проекта выбрал Render.

## Решение

Публиковать сайт как **Static Site на Render** из репозитория `siprofy/silart-landing`:

- ветка: `main`, автодеплой при каждом push;
- сборка: `npm ci && npm run build`;
- публикуемая папка: `dist`;
- версия Node.js — из файла `.node-version` (Astro 7 требует Node ≥ 22.23).

## Последствия

- Каждый push в `main` сразу попадает на сайт — в `main` должна быть только рабочая версия
  (см. правила в README).
- Static Site на Render бесплатен и раздаётся через CDN с HTTPS.
- Домен silart.com подключается в настройках сервиса на Render и в DNS — отдельный шаг.
- Если понадобятся серверные функции (например, приём заявок с формы), их придётся
  разместить отдельно: Static Site серверный код не выполняет.
