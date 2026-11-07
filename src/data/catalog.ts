// Структура каталога по docs/site-structure.md.
// Слаги и URL предварительные — схема URL будет зафиксирована отдельным ADR.

import { url } from '../lib/url';

/** Место направления на тепловой шкале сайта: задаёт цвет маркера. */
export type ThermalTone = 'cold' | 'air' | 'hot' | 'neutral';

export interface ProductGroup {
  title: string;
  slug: string;
  /** Серии (коды) или типы изделий внутри группы */
  items: string[];
}

export interface Category {
  title: string;
  slug: string;
  tone: ThermalTone;
  summary: string;
  groups: ProductGroup[];
}

export const catalog: Category[] = [
  {
    title: 'Кондиционеры',
    slug: 'conditioners',
    tone: 'cold',
    summary: 'Охлаждают шкаф ниже температуры окружающего воздуха и изолируют его от пыли и влаги.',
    groups: [
      { title: 'Компактные кондиционеры', slug: 'compact', items: ['OTS', 'NTS', 'OTU', 'NDU', 'TDU'] },
      { title: 'Пельтье кондиционеры', slug: 'peltier', items: ['STA-A', 'STA-R', 'STA-T', 'STA-V'] },
      { title: 'Компактные теплообменники', slug: 'heat-exchangers', items: ['Воздух-воздух', 'Воздух-вода'] },
      {
        title: 'Прецизионные кондиционеры',
        slug: 'precision',
        items: ['Шкафные', 'Межрядные', 'Внутрестоечные', 'Вибростойкие'],
      },
    ],
  },
  {
    title: 'Вентиляторы',
    slug: 'fans',
    tone: 'air',
    summary: 'Отводят тепло потоком наружного воздуха, когда снаружи прохладнее, чем в шкафу.',
    groups: [
      {
        title: 'Фильтрующие вентиляторы',
        slug: 'filter-fans',
        items: ['NLV', 'SLV', 'NLF', 'SLF', 'Кожухи', 'Фильтроматериалы'],
      },
      { title: 'Крышные вентиляторы', slug: 'roof-fans', items: ['GRM', 'GRO', 'Дефлекторы'] },
      { title: 'Вентиляторные модули', slug: 'fan-modules', items: ['Стоечные', 'Шкафные'] },
      {
        title: 'Компактные вентиляторы',
        slug: 'compact-fans',
        items: ['Осевые AC', 'Осевые DC', 'Осевые EC', 'Центробежные AC', 'Центробежные DC', 'Центробежные EC'],
      },
    ],
  },
  {
    title: 'Нагреватели',
    slug: 'heaters',
    tone: 'hot',
    summary: 'Не дают оборудованию замёрзнуть и защищают от конденсата при перепадах температуры.',
    groups: [
      { title: 'Вентиляторы с нагревателем', slug: 'fan-heaters', items: ['SNV-4', 'SNV-6', 'SNV-8', 'SNV-S'] },
      { title: 'Конвекционные нагреватели', slug: 'convection', items: ['SNK-B', 'SNK-T'] },
    ],
  },
  {
    title: 'Аксессуары',
    slug: 'accessories',
    tone: 'neutral',
    summary: 'Управляют климатическим оборудованием и делают обслуживание шкафа удобнее.',
    groups: [
      {
        title: 'Устройства управления',
        slug: 'controls',
        items: ['Механические термостаты', 'Механические гигростаты', 'Электронные термостаты', 'Цифровые регуляторы'],
      },
      { title: 'Функциональные аксессуары', slug: 'functional', items: ['Шкафные светильники', 'Карманы для документов'] },
    ],
  },
];

export const categoryUrl = (c: Category) => url(`/products/${c.slug}/`);
export const groupUrl = (c: Category, g: ProductGroup) => url(`/products/${c.slug}/${g.slug}/`);
