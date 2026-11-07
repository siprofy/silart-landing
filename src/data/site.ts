// Навигация по информационным разделам (docs/site-structure.md).

import { url } from '../lib/url';

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
        href: url('/support/selection/'),
        description: 'Расчёт тепловой нагрузки и подбор модели под ваш шкаф.',
      },
      {
        title: 'Сферы применения',
        href: url('/support/applications/'),
        description: 'Типовые решения для разных отраслей и условий на объекте.',
      },
      {
        title: 'Статьи и обзоры',
        href: url('/support/articles/'),
        description: 'Как охлаждать, вентилировать и обогревать шкафы.',
      },
    ],
  },
  {
    title: 'Эксплуатация',
    links: [
      {
        title: 'Документация',
        href: url('/support/docs/'),
        description: 'Паспорта, инструкции, чертежи и сертификаты.',
      },
      {
        title: 'Сервис и гарантия',
        href: url('/support/service/'),
        description: 'Гарантийные условия, ремонт и обслуживание.',
      },
      {
        title: 'Частые вопросы',
        href: url('/support/faq/'),
        description: 'Ответы на типовые вопросы по выбору и монтажу.',
      },
    ],
  },
];

export const support: NavLink[] = supportGroups.flatMap((g) => g.links);

export const company: NavLink[] = [
  { title: 'История компании', href: url('/company/history/') },
  { title: 'Наше производство', href: url('/company/production/') },
  { title: 'Новости и события', href: url('/company/news/') },
  { title: 'Карьера у нас', href: url('/company/careers/') },
  { title: 'Наши контакты', href: url('/company/contacts/') },
  { title: 'Где купить', href: url('/company/where-to-buy/') },
];

export const mainNav: NavLink[] = [
  { title: 'Продукция', href: url('/#catalog') },
  { title: 'Поддержка', href: url('/#support') },
  { title: 'Компания', href: url('/#company') },
  { title: 'Где купить', href: url('/company/where-to-buy/') },
];
