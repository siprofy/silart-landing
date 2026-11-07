// Навигация по информационным разделам (docs/site-structure.md).

export interface NavLink {
  title: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/** «Поддержка», разбитая по задаче посетителя: выбрать оборудование или эксплуатировать его. */
export const supportGroups: NavGroup[] = [
  {
    title: 'Выбор оборудования',
    links: [
      {
        title: 'Подбор и расчеты',
        href: '/support/selection/',
        description: 'Расчёт тепловой нагрузки и подбор модели под ваш шкаф.',
      },
      {
        title: 'Сферы применения',
        href: '/support/applications/',
        description: 'Типовые решения для разных отраслей и условий на объекте.',
      },
      {
        title: 'Статьи и обзоры',
        href: '/support/articles/',
        description: 'Как охлаждать, вентилировать и обогревать шкафы.',
      },
    ],
  },
  {
    title: 'Эксплуатация',
    links: [
      {
        title: 'Документация',
        href: '/support/docs/',
        description: 'Паспорта, инструкции, чертежи и сертификаты.',
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
    ],
  },
];

export const support: NavLink[] = supportGroups.flatMap((g) => g.links);

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
