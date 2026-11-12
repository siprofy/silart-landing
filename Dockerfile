# syntax=docker/dockerfile:1
#
# Образ сайта silart.com: сборка Astro в Node.js, раздача готовой статики через nginx.
# Инструкция по использованию — docs/docker.md, решение — docs/adr/0007-docker-image.md.

# Версии базовых образов закреплены точно (не :latest), чтобы сборка была воспроизводимой.
# Node — та же мажорная версия, что в .node-version.
ARG NODE_IMAGE=node:24.22.3-alpine3.24
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.30.6-alpine3.24

# ---------- Стадия 1: сборка сайта ----------
FROM ${NODE_IMAGE} AS build
WORKDIR /app

# Сначала только манифесты: слой с зависимостями кешируется, пока не меняется package-lock.json
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Адрес сайта и подпапка задаются при сборке (см. astro.config.mjs).
# По умолчанию — корень домена https://silart.com.
ARG SITE_URL=https://silart.com
ARG BASE_PATH=/
ENV SITE_URL=${SITE_URL} \
    BASE_PATH=${BASE_PATH} \
    ASTRO_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- Стадия 2: веб-сервер ----------
# nginx-unprivileged работает от непривилегированного пользователя (uid 101) на порту 8080
FROM ${NGINX_IMAGE} AS runtime

ARG BASE_PATH=/
LABEL org.opencontainers.image.title="silart-landing" \
      org.opencontainers.image.description="Сайт silart.com (Astro, статика на nginx)" \
      org.opencontainers.image.source="https://github.com/siprofy/silart-landing"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Файлы принадлежат root и доступны nginx только на чтение
COPY --from=build /app/dist /usr/share/nginx/html${BASE_PATH}

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
