# Деплой на сервер Timeweb Cloud

Каждый push в `main` автоматически попадает на сервер. Почему так устроено — [ADR-0009](adr/0009-deploy-timeweb-cloud.md).

```
git push → GitHub Actions: сборка образа → ghcr.io → SSH на сервер → silart-deploy → /healthz → готово
                                                                                       └ ошибка → откат
```

## Что где лежит

| Файл | Где работает | Назначение |
|------|--------------|------------|
| `.github/workflows/deploy-server.yml` | GitHub Actions | Сборка и публикация образа, деплой, проверка снаружи |
| `deploy/cloud-init.yaml` | Сервер, один раз при создании | Docker, пользователь `deploy`, ограниченный ключ CI |
| `deploy/render-cloud-init.ps1` | Компьютер админа | Собирает полный cloud-init: базу + файлы ниже + ключ хоста SSH |
| `deploy/compose.yaml` | `/opt/silart/compose.yaml` | Как запускается контейнер сайта (порт 80) |
| `deploy/silart-deploy.sh` | `/usr/local/bin/silart-deploy` | Скачать образ, запустить, проверить, откатить |

На сервере в `/opt/silart`: `.env` (`TAG=<sha>` — что запущено сейчас) и `current-tag`
(последняя успешная версия, к ней идёт откат).

## Создать сервер с нуля

Сервер настраивается полностью через cloud-init — заходить на него руками не нужно.
Ключ хоста SSH генерируется заранее (`~/.ssh/silart_hostkey`), поэтому `DEPLOY_KNOWN_HOSTS`
известен до создания сервера, а GitHub Actions проверяет его через `HostKeyAlias=silart-web`.

```powershell
powershell -File deploy/render-cloud-init.ps1 -OutFile $env:TEMP\cloud-init.yaml
```

```powershell
twc server create --name silart-web --image 99 --preset-id 2447 --region ru-1 --ssh-key silart_admin --user-data $env:TEMP\cloud-init.yaml --disable-ssh-password-auth
```

Готовый файл содержит приватный ключ хоста — после создания сервера удалите его.
Затем в GitHub: `DEPLOY_HOST` и `SITE_URL` = новый IP, запустить workflow «Deploy to server».

> Firewall Timeweb с политикой DROP блокирует и исходящий трафик: без правил на выход
> cloud-init не скачает Docker, а ответы SSH не дойдут. Если включать firewall — добавить
> исходящие правила (tcp, udp, icmp на 0.0.0.0/0).

## Ключи и настройки

| Что | Где |
|-----|-----|
| Админский ключ (root) | `~/.ssh/silart_admin` на компьютере владельца |
| Ключ деплоя | `~/.ssh/silart_deploy` локально и секрет `DEPLOY_SSH_KEY` в GitHub. На сервере может **только** запустить `silart-deploy` |
| Токен Timeweb для `twc` | `~/.twcrc` |
| `vars.SITE_URL`, `vars.DEPLOY_HOST` | GitHub → Settings → Secrets and variables → Actions → Variables |
| `secrets.DEPLOY_SSH_KEY`, `secrets.DEPLOY_KNOWN_HOSTS` | там же → Secrets |

## Как узнать, что деплой прошёл

- У коммита на GitHub зелёная галочка, во вкладке Actions — «Deploy to server».
- В итогах запуска (Summary) — версия и ссылка на сайт.
- Или на сервере: `ssh -i ~/.ssh/silart_admin root@<IP> cat /opt/silart/current-tag`

## Ручной откат на прошлую версию

1. Найти sha нужного коммита (`git log --oneline`, нужен полный: `git rev-parse <короткий>`).
2. В GitHub: Actions → Deploy to server → Run workflow — пересоберёт и выкатит текущий `main`.
   Чтобы выкатить именно старую версию, на сервере:

   ```bash
   ssh -i ~/.ssh/silart_admin root@<IP> "sudo -u deploy silart-deploy <полный sha> < /dev/null"
   ```

   Образ должен быть на сервере (хранятся 30 дней); иначе сначала `docker login ghcr.io`.

## Обновить файлы сервера

Если поменялись `deploy/compose.yaml` или `deploy/silart-deploy.sh` (из корня репозитория):

```bash
scp -i ~/.ssh/silart_admin deploy/compose.yaml root@<IP>:/opt/silart/compose.yaml
```

```bash
scp -i ~/.ssh/silart_admin deploy/silart-deploy.sh root@<IP>:/usr/local/bin/silart-deploy
```

```bash
ssh -i ~/.ssh/silart_admin root@<IP> "chmod 755 /usr/local/bin/silart-deploy && chown deploy:deploy /opt/silart/compose.yaml"
```

## Частые проблемы

| Симптом | Что сделать |
|---------|-------------|
| `Не заданы переменные SITE_URL и/или DEPLOY_HOST` | Добавить переменные репозитория (таблица выше) |
| `Host key verification failed` | Сервер создан без `render-cloud-init.ps1` — обновить `DEPLOY_KNOWN_HOSTS`: `silart-web <вывод ssh-keyscan -t ed25519 <IP> без IP>` |
| `Permission denied (publickey)` | Ключ в `DEPLOY_SSH_KEY` не совпадает с ключом в `/home/deploy/.ssh/authorized_keys` |
| `Новая версия не прошла проверку /healthz` | Сработал откат, сайт на прошлой версии. Логи: `ssh root@<IP> "cd /opt/silart && docker compose logs --tail 100"` |
| `denied` при скачивании образа | У пакета в ghcr.io нет доступа для репозитория: Packages → silart-landing → Settings → Manage Actions access |
