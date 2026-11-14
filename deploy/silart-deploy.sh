#!/usr/bin/env bash
# Деплой одной версии сайта. Ставится на сервер как /usr/local/bin/silart-deploy.
#
# Вызывается GitHub Actions по SSH ключом с forced command (см. deploy/cloud-init.yaml):
#   printf '%s' "$GHCR_TOKEN" | ssh deploy@<IP> <sha коммита>
# Тег приходит в SSH_ORIGINAL_COMMAND, токен для ghcr.io — через stdin.
# Админ может запустить вручную (откат):  sudo -u deploy silart-deploy <sha> < /dev/null
set -euo pipefail

IMAGE=ghcr.io/siprofy/silart-landing
APP_DIR=/opt/silart
HEALTH_URL=http://127.0.0.1/healthz

TAG="${SSH_ORIGINAL_COMMAND:-${1:-}}"
if [[ ! "$TAG" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Ожидается полный sha коммита (40 hex-символов), получено: '${TAG}'" >&2
  exit 2
fi

cd "$APP_DIR"

# Токен ghcr.io (если передан) кладём во временный конфиг Docker и удаляем после деплоя
TOKEN="$(cat || true)"
DOCKER_CONFIG="$(mktemp -d)"
export DOCKER_CONFIG
trap 'rm -rf "$DOCKER_CONFIG"' EXIT
if [[ -n "$TOKEN" ]]; then
  printf '%s' "$TOKEN" | docker login ghcr.io -u github-actions --password-stdin >/dev/null
fi

PREV="$(cat current-tag 2>/dev/null || true)"

echo "Скачиваю образ ${IMAGE}:${TAG}"
docker pull --quiet "${IMAGE}:${TAG}"

run_tag() {
  printf 'TAG=%s\n' "$1" > .env
  docker compose up -d --wait --wait-timeout 60
}

healthy() {
  curl -fsS --max-time 5 "$HEALTH_URL" >/dev/null
}

if run_tag "$TAG" && healthy; then
  echo "$TAG" > current-tag
  echo "Готово: работает ${TAG}"
  # Удаляем образы старше 30 дней — свежие остаются для ручного отката
  docker image prune -af --filter "until=720h" >/dev/null || true
  exit 0
fi

echo "Новая версия не прошла проверку /healthz" >&2
if [[ -n "$PREV" && "$PREV" != "$TAG" ]]; then
  echo "Откатываюсь на ${PREV}" >&2
  if run_tag "$PREV" && healthy; then
    echo "Откат выполнен: работает ${PREV}" >&2
  else
    echo "ВНИМАНИЕ: откат тоже не прошёл проверку" >&2
  fi
else
  echo "Предыдущей версии нет — откатываться некуда" >&2
fi
exit 1
