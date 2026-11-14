// Сведения о сборке для подвала сайта: версия, коммит и дата последнего изменения.
//
// Значения берутся (по порядку):
//   1. из переменных окружения BUILD_COMMIT / BUILD_DATE — их передаёт CI, в т. ч. в Docker,
//      где папки .git нет (см. Dockerfile, .github/workflows/deploy-server.yml);
//   2. из git, если сборка идёт в рабочей копии репозитория;
//   3. запасные значения: «dev» и время сборки.
import { execSync } from 'node:child_process';
import pkg from '../../package.json';

function git(args: string): string | undefined {
  try {
    return execSync(`git ${args}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || undefined;
  } catch {
    return undefined;
  }
}

const commit = process.env.BUILD_COMMIT || git('rev-parse HEAD');
// Дата коммита, а не время сборки: показывает, когда сайт действительно меняли
const dateIso = process.env.BUILD_DATE || git('log -1 --format=%cI') || new Date().toISOString();
const date = new Date(dateIso);

export const build = {
  version: pkg.version,
  commit,
  shortCommit: commit ? commit.slice(0, 7) : 'dev',
  commitUrl: commit ? `https://github.com/siprofy/silart-landing/commit/${commit}` : undefined,
  dateIso: date.toISOString(),
  dateText: new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Moscow',
  }).format(date),
  dateTimeText: new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
  }).format(date),
};
