// Навигация по информационным разделам (docs/site-structure.md).

export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export const support: NavLink[] = [
  {
    title: 'Документация',
    href: '/support/docs/',
    description: 'Паспорта, инструкции, чертежи и сертификаты.',
  },
  {
    title: 'Подбор и расчеты',
    href: '/support/selection/',
    description: 'Расчёт тепловой нагрузки и подбор оборудования под шкаф.',
  },
  {
    title: 'Сферы применения',
    href: '/support/applications/',
    description: 'Типовые решения для разных отраслей и условий эксплуатации.',
  },
  {
    title: 'Статьи и обзоры',
    href: '/support/articles/',
    description: 'Как правильно охлаждать, вентилировать и обогревать шкафы.',
  },
  {
    title: 'Сервис и гарантия',
    href: '/support/service/',
    description: 'Гарантийные условия, ремонт и обслуживание.',
  },
  {
    title: 'Частые вопросы',
    href: '/support/faq/',
    description: 'Ответы на типовые вопросы по выбору и монтажу.',
  },
];

export const company: NavLink[] = [
  { title: 'История компании', href: '/company/history/' },
  { title: 'Наше производство', href: '/company/production/' },
  { title: 'Новости и события', href: '/company/news/' },
  { title: 'Карьера у нас', href: '/company/careers/' },
  { title: 'Наши контакты', href: '/company/contacts/' },
  { title: 'Где купить', href: '/company/where-to-buy/' },
];

export const mainNav: NavLink[] = [
  { title: 'Продукция', href: '/#catalog' },
  { title: 'Поддержка', href: '/#support' },
  { title: 'Компания', href: '/#company' },
  { title: 'Где купить', href: '/company/where-to-buy/' },
];
