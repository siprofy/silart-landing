# Docker: сборка и проверка образа сайта

Сайт упакован в Docker-образ: внутри — готовая статика Astro и веб-сервер nginx.
Образ можно запустить на любом сервере с Docker. Почему так — [ADR-0007](adr/0007-docker-image.md).

## Что где лежит

| Файл | Назначение |
|------|------------|
| `Dockerfile` | Рецепт образа: стадия `build` (Node.js собирает сайт) → стадия `runtime` (nginx раздаёт `dist/`) |
| `docker/nginx.conf` | Настройки nginx: кеш ассетов, gzip, заголовки безопасности, `/healthz` |
| `compose.yaml` | Запуск одной командой с безопасными настройками контейнера |
| `.dockerignore` | Что **не** отправлять в сборку (`node_modules`, `dist`, `.git`, документация) |

Итог: образ ~90 МБ, работает от непривилегированного пользователя `nginx` (uid 101),
слушает порт **8080** внутри контейнера.

## Что нужно

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/macOS) или Docker Engine (Linux).
- Docker должен быть запущен: команда `docker info` отвечает без ошибки.

Node.js на компьютере для сборки образа **не нужен** — всё собирается внутри Docker.

## Быстрый старт (рекомендуется)

Из корня репозитория:

```bash
docker compose up --build -d
```

Откройте http://localhost:8080 — это сайт из контейнера.

Остановить и удалить контейнер:

```bash
docker compose down
```

## Как собрать новый образ после изменений

1. Внесите изменения в код и сохраните файлы.
2. Пересоберите и перезапустите:

   ```bash
   docker compose up --build -d
   ```

   Docker пересоберёт только изменившиеся слои: если `package-lock.json` не менялся,
   зависимости заново не скачиваются.
3. Проверьте (раздел «Как проверить образ» ниже).

Собрать образ с конкретной версией (тегом) — удобно для публикации:

```bash
docker build -t silart-landing:0.1.0 .
```

Полная пересборка без кеша (если что-то «залипло»):

```bash
docker build --no-cache -t silart-landing:local .
```

### Адрес сайта и подпапка

Как и в GitHub Actions, адрес задаётся при сборке переменными `SITE_URL` и `BASE_PATH`.
По умолчанию — корень `https://silart.com`, менять ничего не нужно.

Если сайт будет жить в подпапке (например, `/silart-landing`):

```bash
docker build --build-arg SITE_URL=https://example.com --build-arg BASE_PATH=/silart-landing -t silart-landing:local .
```

С compose — через переменные окружения (PowerShell):

```powershell
$env:BASE_PATH = "/silart-landing"; docker compose up --build -d
```

Тогда сайт будет по адресу http://localhost:8080/silart-landing/.

## Как проверить образ

После `docker compose up --build -d`:

1. **Контейнер здоров** — в колонке STATUS должно быть `(healthy)` (появляется через ~5–30 секунд):

   ```bash
   docker compose ps
   ```

2. **Служебная проверка** — должен вернуться текст `ok`:

   ```bash
   curl http://localhost:8080/healthz
   ```

3. **Сайт открывается** — откройте http://localhost:8080 в браузере, пройдитесь по блокам,
   переключите тему.

4. **Нет ошибок в логах**:

   ```bash
   docker compose logs web
   ```

   Строка `10-listen-on-ipv6-by-default.sh: info: can not modify ... (read-only file system?)` —
   это нормально: контейнер запущен с файловой системой только для чтения, а IPv6 уже
   включён в нашем `nginx.conf`.

5. **Размер и версия образа**:

   ```bash
   docker image ls silart-landing
   ```

Запустить образ без compose (например, чужой тег или на сервере):

```bash
docker run --rm -d --name silart -p 8080:8080 --read-only --tmpfs /tmp silart-landing:local
```

Остановить его:

```bash
docker stop silart
```

## Публикация образа

Образ публикуется в реестр (registry), откуда его скачивает сервер. Пример для
GitHub Container Registry (`ghcr.io`) — он бесплатен для публичных репозиториев.

1. Создайте на GitHub персональный токен (Settings → Developer settings → Personal access tokens)
   с правом `write:packages` и войдите — Docker сам спросит токен вместо пароля:

   ```bash
   docker login ghcr.io -u siprofy
   ```

2. Соберите образ сразу с именем в реестре и версией:

   ```bash
   docker build -t ghcr.io/siprofy/silart-landing:0.1.0 -t ghcr.io/siprofy/silart-landing:latest .
   ```

3. Отправьте:

   ```bash
   docker push ghcr.io/siprofy/silart-landing:0.1.0
   ```

   ```bash
   docker push ghcr.io/siprofy/silart-landing:latest
   ```

4. На сервере:

   ```bash
   docker run -d --name silart --restart unless-stopped -p 80:8080 --read-only --tmpfs /tmp ghcr.io/siprofy/silart-landing:0.1.0
   ```

> Для каждой новой версии меняйте номер тега (`0.1.1`, `0.2.0`…). Тогда на сервере всегда понятно,
> какая версия запущена, и можно откатиться на предыдущую.

HTTPS (сертификат для silart.com) в образ не входит: на сервере его обычно даёт обратный прокси
(Caddy, Traefik, nginx) или облачный балансировщик перед контейнером.

## Частые проблемы

| Симптом | Что сделать |
|---------|-------------|
| `failed to connect to the docker API` | Docker Desktop не запущен — запустите и дождитесь зелёного статуса |
| `port is already allocated` | Порт 8080 занят. Возьмите другой: `$env:PORT = "8081"; docker compose up -d` |
| Изменения не видны на сайте | Забыли `--build`. Выполните `docker compose up --build -d` и обновите страницу с Ctrl+F5 |
| Стили не грузятся в подпапке | Образ собран без `BASE_PATH` — пересоберите с нужным значением |
| Статус `(unhealthy)` | Смотрите `docker compose logs web` |

## Полезные команды

| Команда | Что делает |
|---------|------------|
| `docker compose up --build -d` | Собрать и запустить в фоне |
| `docker compose ps` | Состояние контейнера |
| `docker compose logs -f web` | Логи в реальном времени (выход — Ctrl+C) |
| `docker compose exec web sh` | Зайти внутрь контейнера |
| `docker compose down` | Остановить и удалить контейнер |
| `docker image prune` | Удалить старые неиспользуемые образы |
