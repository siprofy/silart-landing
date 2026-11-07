// Структура каталога по docs/site-structure.md.
// Слаги и URL предварительные — схема URL будет зафиксирована отдельным ADR.

export type CategoryIcon = 'cooling' | 'fan' | 'heat' | 'control';

export interface ProductGroup {
  title: string;
  slug: string;
  items: string[];
}

export interface Category {
  title: string;
  slug: string;
  icon: CategoryIcon;
  summary: string;
  groups: ProductGroup[];
}

export const catalog: Category[] = [
  {
    title: 'Кондиционеры',
    slug: 'conditioners',
    icon: 'cooling',
    summary: 'Активное охлаждение шкафов, стоек и серверных помещений.',
    groups: [
      {
        title: 'Компактные кондиционеры',
        slug: 'compact',
        items: ['OTS', 'NTS', 'OTU', 'NDU', 'TDU'],
      },
      {
        title: 'Пельтье кондиционеры',
        slug: 'peltier',
        items: ['STA-A', 'STA-R', 'STA-T', 'STA-V'],
      },
      {
        title: 'Компактные теплообменники',
        slug: 'heat-exchangers',
        items: ['Воздух-воздух', 'Воздух-вода'],
      },
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
    icon: 'fan',
    summary: 'Фильтрующие, крышные и компактные вентиляторы для отвода тепла.',
    groups: [
      {
        title: 'Фильтрующие вентиляторы',
        slug: 'filter-fans',
        items: ['NLV', 'SLV', 'NLF', 'SLF', 'Кожухи', 'Фильтроматериалы'],
      },
      {
        title: 'Крышные вентиляторы',
        slug: 'roof-fans',
        items: ['GRM', 'GRO', 'Дефлекторы'],
      },
      {
        title: 'Вентиляторные модули',
        slug: 'fan-modules',
        items: ['Стоечные', 'Шкафные'],
      },
      {
        title: 'Компактные вентиляторы',
        slug: 'compact-fans',
        items: ['Осевые AC/DC/EC', 'Центробежные AC/DC/EC'],
      },
    ],
  },
  {
    title: 'Нагреватели',
    slug: 'heaters',
    icon: 'heat',
    summary: 'Обогрев и защита оборудования от конденсата и низких температур.',
    groups: [
      {
        title: 'Вентиляторы с нагревателем',
        slug: 'fan-heaters',
        items: ['SNV-4', 'SNV-6', 'SNV-8', 'SNV-S'],
      },
      {
        title: 'Конвекционные нагреватели',
        slug: 'convection',
        items: ['SNK-B', 'SNK-T'],
      },
    ],
  },
  {
    title: 'Аксессуары',
    slug: 'accessories',
    icon: 'control',
    summary: 'Термостаты, гигростаты, регуляторы и функциональные аксессуары.',
    groups: [
      {
        title: 'Устройства управления',
        slug: 'controls',
        items: ['Термостаты', 'Гигростаты', 'Цифровые регуляторы'],
      },
      {
        title: 'Функциональные аксессуары',
        slug: 'functional',
        items: ['Шкафные светильники', 'Карманы для документов'],
      },
    ],
  },
];

export const categoryUrl = (c: Category) => `/products/${c.slug}/`;
export const groupUrl = (c: Category, g: ProductGroup) => `/products/${c.slug}/${g.slug}/`;
