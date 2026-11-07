/** Внутренняя ссылка с учётом base: сайт может жить в подпапке (например, на GitHub Pages). */
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
