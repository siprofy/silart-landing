# Silart Landing

Сайт silart.com: лендинг и каталог продукции (кондиционеры, вентиляторы, нагреватели
и аксессуары для климат-контроля шкафов и стоек).

> Статус: свёрстана главная страница. Сайт статический
> ([ADR-0002](docs/adr/0002-site-architecture-approach.md)), собирается на Astro
> ([ADR-0003](docs/adr/0003-static-site-generator-choice.md)).

## Документация

| Документ | Содержание |
|----------|------------|
| [docs/site-structure.md](docs/site-structure.md) | Карта разделов сайта и каталога |
| [docs/docker.md](docs/docker.md) | Docker: сборка, проверка и публикация образа |
| [docs/adr/](docs/adr/README.md) | Архитектурные решения (ADR): процесс, шаблон, индекс |

Все значимые решения принимаются через ADR — см. [ADR-0001](docs/adr/0001-record-architecture-decisions.md).

## Стек

- [Astro](https://astro.build) 7 + TypeScript, статическая сборка
- Обычный CSS с дизайн-токенами в CSS-переменных (`src/styles/global.css`), светлая и тёмная
  темы — см. [ADR-0004](docs/adr/0004-visual-language-and-themes.md)
- Хостинг — GitHub Pages ([ADR-0006](docs/adr/0006-hosting-github-pages.md))

## Быстрый старт

Нужен Node.js 22 или новее.

```bash
git clone https://github.com/siprofy/silart-landing.git
cd silart-landing
npm install
npm run dev
```

Сайт откроется на http://localhost:4321.

| Команда           | Что делает                                   |
|-------------------|----------------------------------------------|
| `npm run dev`     | Dev-сервер с автообновлением                 |
| `npm run build`   | Сборка статического сайта в `dist/`          |
| `npm run preview` | Локальный просмотр собранного сайта          |

## Структура репозитория

```
docs/
  adr/               архитектурные решения
  site-structure.md  карта сайта
public/              статические файлы (favicon, изображения)
src/
  components/        блоки страниц (шапка, каталог, подвал...)
  data/              данные каталога и навигации
  layouts/           общий каркас страниц
  pages/             страницы — каждый файл становится URL
  styles/            глобальные стили и дизайн-токены
```

Каталог продукции на главной строится из `src/data/catalog.ts`: чтобы добавить
группу или серию, достаточно поправить данные.

## Деплой

Сайт: https://siprofy.github.io/silart-landing/

Каждый push в `main` автоматически собирается и публикуется на GitHub Pages
(`.github/workflows/deploy.yml`). Версия Node.js для сборки задана в `.node-version`.

Также сайт можно запустить в Docker (`docker compose up --build -d` → http://localhost:8080) —
подробно в [docs/docker.md](docs/docker.md).

Сайт живёт в подпапке, поэтому внутренние ссылки пишутся только через `url()`
из `src/lib/url.ts`, а не строкой `"/..."`.

## Работа с репозиторием

- Основная ветка — `main`, в ней всегда рабочая версия.
- Новые задачи делаются в отдельных ветках: `feature/...`, `fix/...`, `docs/...`.
- Сообщения коммитов — коротко и по делу, в повелительном наклонении (например, `Add hero section`).
