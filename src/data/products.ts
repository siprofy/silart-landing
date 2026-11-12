// Серии и модели из «Каталога продукции 2026» (PDF в public/catalog/).
// Используются поиском по сайту и виджетом подбора оборудования.
// page — номер страницы в PDF, на который ведёт ссылка «Открыть в каталоге».

import { url } from '../lib/url';

export const catalogPdf = {
  title: 'Каталог продукции 2026',
  file: 'silart-catalog-2026.pdf',
  href: url('/catalog/silart-catalog-2026.pdf'),
  cover: url('/catalog/silart-catalog-2026-cover.jpg'),
  /** Путь от корня проекта — чтобы посчитать размер файла при сборке */
  path: 'public/catalog/silart-catalog-2026.pdf',
  pages: 100,
};

/** Ссылка на конкретную страницу PDF: браузерные просмотрщики понимают #page=N */
export const pdfPage = (page: number) => `${catalogPdf.href}#page=${page}`;

export type Kind = 'heater' | 'fan' | 'ac' | 'control' | 'accessory';

/** Питание: ac — сеть ~230 В (для крупных кондиционеров ~380 В), dc24/dc48 — постоянный ток */
export type Supply = 'ac' | 'dc12' | 'dc24' | 'dc48';

export interface Model {
  code: string;
  /** Тепловая мощность / холодопроизводительность, Вт или производительность, м³/ч */
  value?: number;
  supply?: Supply[];
  note?: string;
}

export interface Series {
  code: string;
  title: string;
  kind: Kind;
  /** Направление каталога (совпадает со слагами src/data/catalog.ts) */
  category: 'heaters' | 'fans' | 'conditioners' | 'accessories';
  page: number;
  summary: string;
  /** Короткие характеристики для карточки: диапазон, IP, питание */
  specs: string[];
  /** Синонимы и слова, по которым серию должны находить */
  keywords: string;
  models: Model[];
}

const AC: Supply[] = ['ac'];
const m = (code: string, value: number, supply: Supply[] = AC): Model => ({ code, value, supply });

export const series: Series[] = [
  // ---------- Устройства обогрева ----------
  {
    code: 'SNK-B',
    title: 'Конвекционные нагреватели SNK-B',
    kind: 'heater',
    category: 'heaters',
    page: 12,
    summary:
      'Позисторные нагреватели в корпусе из анодированного алюминия: бесшумный обогрев без подвижных частей, DIN-клип, клемма или провод.',
    specs: ['15–300 Вт', 'IP20', '~110–230 В, =12–24 В', '−40…+80 °C'],
    keywords: 'нагреватель конвекционный обогрев позистор ptc антиконденсат din клемма провод',
    models: [
      m('SNK-B020-01T', 15),
      m('SNK-B030-00T', 25),
      m('SNK-B050-00T', 45),
      m('SNK-B052-00T', 45, ['dc12', 'dc24']),
      m('SNK-B060-00T', 60),
      m('SNK-B080-10T', 75),
      m('SNK-B100-30T', 100),
      m('SNK-B120-30T', 120),
      m('SNK-B150-30T', 150),
      m('SNK-B180-50T', 175),
      m('SNK-B210-50T', 210),
      m('SNK-B250-50T', 250),
      m('SNK-B300-60T', 300),
      m('SNK-B030-00L', 25),
      m('SNK-B050-00L', 45),
      m('SNK-B100-30L', 100),
      m('SNK-B150-30L', 150),
      m('SNK-B300-60L', 300),
    ],
  },
  {
    code: 'SNK-T',
    title: 'Конвекционные нагреватели SNK-T',
    kind: 'heater',
    category: 'heaters',
    page: 14,
    summary: 'Сверхкомпактный профиль толщиной 23 мм — для тесных шкафов и сурового климата.',
    specs: ['10–140 Вт', 'IP20', '~110–230 В, =12–48 В', 'Толщина 23 мм'],
    keywords: 'нагреватель конвекционный компактный тонкий плоский обогрев',
    models: [
      m('SNK-T010-00L', 10),
      m('SNK-T020-00L', 20),
      m('SNK-T024-00L', 22, ['dc24', 'dc48']),
      m('SNK-T030-10L', 30),
      m('SNK-T032-00L', 30, ['dc12', 'dc24']),
      m('SNK-T050-10L', 50),
      m('SNK-T060-20L', 60),
      m('SNK-T080-30L', 75),
      m('SNK-T100-40L', 100),
      m('SNK-T120-50L', 120),
      m('SNK-T140-51L', 140),
    ],
  },
  {
    code: 'SNV',
    title: 'Нагреватели с вентилятором SNV',
    kind: 'heater',
    category: 'heaters',
    page: 16,
    summary:
      'Активный обогрев с принудительной циркуляцией: тепло распределяется равномерно, без локального перегрева. Исполнения с проводом и с клеммой.',
    specs: ['80–800 Вт', 'IP20', '~230 В, =12/24/48 В'],
    keywords: 'тепловентилятор нагреватель с вентилятором обогрев snv-4 snv-6 snv-8 snv-t',
    models: [
      { code: 'SNV-408-100', value: 80, note: 'вентилятор =12 В' },
      { code: 'SNV-412-100', value: 120, note: 'вентилятор =12 В' },
      { code: 'SNV-424-100', value: 240, note: 'вентилятор =12 В' },
      { code: 'SNV-615-000', value: 150, supply: AC },
      { code: 'SNV-620-000', value: 200, supply: AC },
      { code: 'SNV-625-000', value: 250, supply: AC },
      { code: 'SNV-633-220', value: 350, supply: AC },
      { code: 'SNV-633-440', value: 400, supply: AC },
      { code: 'SNV-635-000', value: 330, supply: ['dc24'] },
      { code: 'SNV-640-000', value: 330, supply: ['dc48'] },
      { code: 'SNV-845-000', value: 450, supply: AC },
      { code: 'SNV-860-000', value: 600, supply: AC },
      { code: 'SNV-880-000', value: 800, supply: AC },
      { code: 'SNV-880-440', value: 800, supply: ['dc48'] },
      { code: 'SNV-6150-00T', value: 150, supply: AC, note: 'с клеммой' },
      { code: 'SNV-6250-00T', value: 250, supply: AC, note: 'с клеммой' },
      { code: 'SNV-6400-00T', value: 400, supply: AC, note: 'с клеммой' },
      { code: 'SNV-8450-00T', value: 450, supply: AC, note: 'с клеммой' },
      { code: 'SNV-8600-00T', value: 600, supply: AC, note: 'с клеммой' },
      { code: 'SNV-8800-00T', value: 800, supply: AC, note: 'с клеммой' },
    ],
  },
  {
    code: 'SNV-S',
    title: 'Нагреватели с вентилятором SNV-S',
    kind: 'heater',
    category: 'heaters',
    page: 22,
    summary:
      'Модели с наибольшей тепловой мощностью — для крупных шкафов распределения, уличных станций и телеком-комплексов.',
    specs: ['1650–2100 Вт', 'IP20', '~230 В', 'Два режима мощности'],
    keywords: 'мощный нагреватель тепловентилятор обогрев большой шкаф',
    models: [
      { code: 'SNV-S160-010', value: 1650, supply: AC },
      { code: 'SNV-S210-000', value: 2100, supply: AC },
    ],
  },

  // ---------- Вентиляторы ----------
  {
    code: 'SLV',
    title: 'Фильтрующие вентиляторы SLV',
    kind: 'fan',
    category: 'fans',
    page: 26,
    summary:
      'Монтаж в один клик без крепежа, откидная решётка, простая замена фильтра. Для внутреннего и уличного монтажа.',
    specs: ['16–155 м³/ч', 'IP54/55', '~230/380 В, =12/24/48 В'],
    keywords: 'вентилятор с фильтром фильтрующий вентиляция охлаждение slf выходной фильтр решетка',
    models: [
      { code: 'SLV-1000', value: 16 },
      { code: 'SLV-1100', value: 34 },
      { code: 'SLV-1500', value: 65 },
      { code: 'SLV-1540', value: 100 },
      { code: 'SLV-2000', value: 105 },
      { code: 'SLV-2120', value: 155 },
    ],
  },
  {
    code: 'SLF',
    title: 'Выходные фильтры SLF',
    kind: 'accessory',
    category: 'fans',
    page: 31,
    summary: 'Выходные фильтрующие решётки в пару к вентиляторам SLV: выпускают нагретый воздух и держат пыль.',
    specs: ['IP54/55', 'Типоразмеры 100–200'],
    keywords: 'выходной фильтр решетка вытяжка',
    models: ['SLF-100', 'SLF-101', 'SLF-150', 'SLF-151', 'SLF-200', 'SLF-201'].map((code) => ({ code })),
  },
  {
    code: 'NLV',
    title: 'Фильтрующие вентиляторы NLV',
    kind: 'fan',
    category: 'fans',
    page: 32,
    summary:
      'Исполнение «слайдер», широкий ряд типоразмеров до 800 м³/ч. Работают в паре с выходными фильтрами NLF.',
    specs: ['16–800 м³/ч', 'IP54/55', '~230/380 В, =12/24/48 В', '−40…+70 °C'],
    keywords: 'вентилятор с фильтром фильтрующий вентиляция охлаждение nlf выходной фильтр',
    // Код NLV-ABCD: AB — типоразмер, C — питание (0 ~230, 1 =12, 2 =24, 3 ~380, 4 =48), D — 0 IP54 / 1 IP55
    models: [
      ['NLV-1000', 16],
      ['NLV-1100', 34],
      ['NLV-1110', 39],
      ['NLV-1120', 45],
      ['NLV-1140', 52],
      ['NLV-1500', 65],
      ['NLV-1510', 78],
      ['NLV-1520', 78],
      ['NLV-1530', 65],
      ['NLV-1540', 78],
      ['NLV-2000', 105],
      ['NLV-2010', 120],
      ['NLV-2020', 120],
      ['NLV-2030', 105],
      ['NLV-2040', 120],
      ['NLV-2500', 210],
      ['NLV-2520', 280],
      ['NLV-2600', 280],
      ['NLV-2630', 258],
      ['NLV-3000', 500],
      ['NLV-3030', 460],
      ['NLV-3100', 800],
    ].map(([code, value]) => {
      const c = String(code);
      const supply = (['ac', 'dc12', 'dc24', 'ac', 'dc48'] as Supply[])[Number(c[6])];
      return { code: c, value: Number(value), supply: [supply], note: c[6] === '3' ? '~380 В' : undefined };
    }),
  },
  {
    code: 'NLF',
    title: 'Выходные фильтры NLF',
    kind: 'accessory',
    category: 'fans',
    page: 32,
    summary: 'Выходные фильтрующие решётки к вентиляторам NLV соответствующего типоразмера.',
    specs: ['IP54/55', 'Типоразмеры 100–300'],
    keywords: 'выходной фильтр решетка вытяжка',
    models: ['NLF-100', 'NLF-150', 'NLF-200', 'NLF-250', 'NLF-300'].map((code) => ({ code })),
  },
  {
    code: 'G',
    title: 'Осевые вентиляторы G',
    kind: 'fan',
    category: 'fans',
    page: 38,
    summary: 'Осевые вентиляторы переменного и постоянного тока для принудительной вентиляции и встраивания в оборудование.',
    specs: ['30–1650 м³/ч', 'IP54', '~230/380 В, =12/24/48 В'],
    keywords: 'осевой вентилятор компактный кулер ac dc',
    models: [
      ['G0825-A22X-7PBHL', 32],
      ['G0925-A22X-6PBHL', 51],
      ['G1225-A22X-7PBHL', 109],
      ['G1238-A22X-5PBHL', 141],
      ['G1750-A22X-5PBHL', 323],
      ['G2260-A22C-5PBHL', 731],
      ['G2880-A22C-7MBHL', 1777],
      ['G0825-D24X-7PBHL', 86],
      ['G1238-D24X-7PBHL', 225],
      ['G1750-D24X-7PBHL', 411],
    ].map(([code, value]) => ({ code: String(code), value: Number(value) })),
  },
  {
    code: 'KR',
    title: 'Центробежные вентиляторы KR',
    kind: 'fan',
    category: 'fans',
    page: 40,
    summary: 'Радиальные вентиляторы: высокий напор там, где воздуху нужно преодолеть сопротивление плотной компоновки.',
    specs: ['282–1072 м³/ч', 'IP55', '~230 В'],
    keywords: 'центробежный радиальный вентилятор улитка',
    models: [
      ['KR133-A22HE', 282],
      ['KR175-A22HE', 535],
      ['KR190-A22HE', 776],
      ['KR220-A22HE', 1072],
    ].map(([code, value]) => ({ code: String(code), value: Number(value) })),
  },
  {
    code: 'GRM',
    title: 'Крышные вентиляторы GRM',
    kind: 'fan',
    category: 'fans',
    page: 42,
    summary: 'Монтируются на крышу шкафа и вытягивают нагретый воздух. С фильтром — защита шкафа IP54, без фильтра — IP22.',
    specs: ['346–1781 м³/ч', 'IP54 / IP22', '~230 В, =24 В'],
    keywords: 'крышный вентилятор вытяжка крыша шкафа frm дефлектор',
    models: [
      ['GRM-190-00', 495],
      ['GRM-190-01', 346],
      ['GRM-220-00', 778],
      ['GRM-220-01', 500],
      ['GRM-222-00', 1104],
      ['GRM-222-01', 788],
      ['GRM-250-00', 1220],
      ['GRM-250-01', 850],
      ['GRM-280-00', 1781],
      ['GRM-280-01', 1400],
    ].map(([code, value]) => ({ code: String(code), value: Number(value) })),
  },
  {
    code: 'FRM',
    title: 'Крышные дефлекторы FRM',
    kind: 'accessory',
    category: 'fans',
    page: 45,
    summary: 'Пассивная вытяжка через крышу шкафа — без вентилятора и питания.',
    specs: ['IP54 / IP22'],
    keywords: 'дефлектор крышный пассивная вентиляция',
    models: ['FRM-220', 'FRM-221', 'FRM-280', 'FRM-281'].map((code) => ({ code })),
  },
  {
    code: 'GRO',
    title: 'Крышные вентиляторы GRO',
    kind: 'fan',
    category: 'fans',
    page: 46,
    summary: 'Компактные крышные вентиляторы собственной разработки Silart: 3 или 4 вентилятора в низком корпусе.',
    specs: ['310–830 м³/ч', 'IP54 / IP22', '~230 В, =24/48 В'],
    keywords: 'крышный вентилятор компактный вытяжка fro дефлектор',
    models: [
      ['GRO-123-00', 470],
      ['GRO-123-01', 330],
      ['GRO-124-00', 515],
      ['GRO-124-01', 330],
      ['GRO-129-00', 830],
      ['GRO-128-01', 560],
    ].map(([code, value]) => ({ code: String(code), value: Number(value) })),
  },
  {
    code: 'FRO',
    title: 'Крышные дефлекторы FRO',
    kind: 'accessory',
    category: 'fans',
    page: 49,
    summary: 'Дефлекторы в корпусе GRO для пассивной вытяжки.',
    specs: ['IP54 / IP22'],
    keywords: 'дефлектор крышный пассивная вентиляция',
    models: ['FRO-130', 'FRO-131', 'FRO-140', 'FRO-141', 'FRO-190', 'FRO-191'].map((code) => ({ code })),
  },
  {
    code: 'SVB',
    title: 'Вентиляторные блоки SVB',
    kind: 'fan',
    category: 'fans',
    page: 50,
    summary: 'Блоки из 2–6 вентиляторов для 19″ стоек и шкафов: высокая производительность для ЦОД и мощной автоматики.',
    specs: ['282–1348 м³/ч', 'IP20', '~230 В, =12/24/48 В', '19″ стойка'],
    keywords: 'вентиляторный блок модуль стойка 19 серверная цод rack',
    models: [
      ['SVB-200-00', 282],
      ['SVB-220-10', 450],
      ['SVB-400-00', 564],
      ['SVB-420-10', 900],
      ['SVB-600-00', 846],
      ['SVB-620-10', 1348],
    ].map(([code, value]) => ({ code: String(code), value: Number(value) })),
  },

  // ---------- Кондиционеры ----------
  {
    code: 'OTS',
    title: 'Кондиционеры для уличного монтажа OTS',
    kind: 'ac',
    category: 'conditioners',
    page: 60,
    summary:
      'Запатентованная серия для уличных шкафов, подстанций и транспорта: обогрев в базе, Modbus RTU, контроль утечки фреона.',
    specs: ['600–2000 Вт', 'IP65', '~230 В', '−40…+55 °C', 'УХЛ1'],
    keywords: 'кондиционер уличный наружный outdoor холодильный фреоновый modbus',
    models: [
      { code: 'OTS-0500-000', value: 600, supply: AC },
      { code: 'OTS-1000-000', value: 1050, supply: AC },
      { code: 'OTS-2000-000', value: 2000, supply: AC },
    ],
  },
  {
    code: 'NTS',
    title: 'Кондиционеры для монтажа в помещениях NTS',
    kind: 'ac',
    category: 'conditioners',
    page: 62,
    summary: 'Компактные кондиционеры для цехов: навесной, утопленный или полуутопленный монтаж, контроллер с дисплеем и Modbus.',
    specs: ['450–500 Вт', 'IP54', '~230 В'],
    keywords: 'кондиционер внутренний помещение цех компактный',
    models: [
      { code: 'NTS-0500-000', value: 500, supply: AC, note: 'навесной' },
      { code: 'NTS-0510-000', value: 450, supply: AC, note: 'полуутопленный' },
      { code: 'NTS-0520-000', value: 450, supply: AC },
    ],
  },
  {
    code: 'OTU',
    title: 'Кондиционеры для уличного монтажа OTU',
    kind: 'ac',
    category: 'conditioners',
    page: 66,
    summary: 'Антивандальные промышленные кондиционеры для улицы, управление по Ethernet или Modbus RS-485.',
    specs: ['450–5700 Вт', 'IP65', '~230/380 В', '−40…+55 °C'],
    keywords: 'кондиционер уличный наружный антивандальный мощный',
    models: [450, 1000, 1700, 2700, 3700, 5700].map((v) => ({
      code: `OTU-${String(v === 450 ? 500 : v).padStart(4, '0')}-000`,
      value: v,
      supply: AC,
    })),
  },
  {
    code: 'NDU',
    title: 'Кондиционеры для монтажа в помещениях NDU',
    kind: 'ac',
    category: 'conditioners',
    page: 70,
    summary:
      'Для шкафов автоматики, станков и кабин кранов. Исполнение из нержавеющей стали — в регулярном ассортименте.',
    specs: ['450–5700 Вт', 'IP54', '~230/380 В', '0…+55 °C'],
    keywords: 'кондиционер внутренний помещение цех нержавейка нержавеющая сталь',
    models: [450, 1000, 1700, 2700, 3700, 5700].map((v) => ({
      code: `NDU-${String(v === 450 ? 500 : v).padStart(4, '0')}-000`,
      value: v,
      supply: AC,
    })),
  },
  {
    code: 'TDU',
    title: 'Кондиционеры для крышного монтажа TDU',
    kind: 'ac',
    category: 'conditioners',
    page: 74,
    summary: 'Ставятся на крышу шкафа и не занимают стены и двери. Есть линейка в нержавеющей стали для агрессивных сред.',
    specs: ['1000–5700 Вт', 'IP54', '~230/380 В', '0…+55 °C'],
    keywords: 'кондиционер крышный на крышу шкафа top mount',
    models: [1000, 1700, 2700, 3700, 5700].map((v) => ({
      code: `TDU-${String(v).padStart(4, '0')}-000`,
      value: v,
      supply: AC,
    })),
  },
  {
    code: 'STA',
    title: 'Термоэлектрические кондиционеры STA',
    kind: 'ac',
    category: 'conditioners',
    page: 76,
    summary:
      'Охлаждение на элементах Пельтье без фреона, в защитном кожухе для улицы. Смена полярности — и кондиционер греет.',
    specs: ['120–400 Вт', 'IP67', '=24/48 В', '−10…+70 °C'],
    keywords: 'пельтье термоэлектрический кондиционер без фреона постоянный ток dc уличный вибрация',
    models: [
      { code: 'STA-122-010', value: 120, supply: ['dc24'] },
      { code: 'STA-124-010', value: 120, supply: ['dc48'] },
      { code: 'STA-212-010', value: 210, supply: ['dc24'] },
      { code: 'STA-214-010', value: 210, supply: ['dc48'] },
      { code: 'STA-322-010', value: 320, supply: ['dc24'] },
      { code: 'STA-324-010', value: 320, supply: ['dc48'] },
      { code: 'STA-402-010', value: 400, supply: ['dc24'] },
      { code: 'STA-404-010', value: 400, supply: ['dc48'] },
    ],
  },
  {
    code: 'STA-A',
    title: 'Термоэлектрические кондиционеры STA-A',
    kind: 'ac',
    category: 'conditioners',
    page: 80,
    summary: 'Пельтье-кондиционеры без кожуха, полуутопленный монтаж — для плотной компоновки и мобильного оборудования.',
    specs: ['120–320 Вт', 'IP54', '=24/48 В'],
    keywords: 'пельтье термоэлектрический кондиционер без фреона постоянный ток dc компактный',
    models: [
      { code: 'STA-A120-200', value: 120, supply: ['dc24'] },
      { code: 'STA-A120-400', value: 120, supply: ['dc48'] },
      { code: 'STA-A210-200', value: 210, supply: ['dc24'] },
      { code: 'STA-A210-400', value: 210, supply: ['dc48'] },
      { code: 'STA-A320-200', value: 320, supply: ['dc24'] },
      { code: 'STA-A320-400', value: 320, supply: ['dc48'] },
    ],
  },

  // ---------- Аксессуары ----------
  {
    code: 'TBS',
    title: 'Механические термостаты TBS',
    kind: 'control',
    category: 'accessories',
    page: 86,
    summary: 'Биметаллические термостаты — флагманский продукт Silart. Управляют нагревом, охлаждением и сигнализацией.',
    specs: ['−20…+60 °C', 'NC / NO', '250 В, 16 А'],
    keywords: 'термостат терморегулятор биметаллический управление нагревом охлаждением',
    models: [
      { code: 'TBS-140', note: 'NC, нагрев, −20…+40 °C' },
      { code: 'TBS-160', note: 'NC, нагрев, 0…+60 °C' },
      { code: 'TBS-240', note: 'NO, охлаждение, −20…+40 °C' },
      { code: 'TBS-260', note: 'NO, охлаждение, 0…+60 °C' },
    ],
  },
  {
    code: 'TSN',
    title: 'Регуляторы температуры TSN',
    kind: 'control',
    category: 'accessories',
    page: 87,
    summary: 'Регулятор со встроенным NTC-датчиком для точного управления нагревом и охлаждением.',
    specs: ['−5…+60 °C', 'NC / NO', '16 А'],
    keywords: 'регулятор температуры термостат ntc',
    models: [{ code: 'TSN-560' }],
  },
  {
    code: 'MTN',
    title: 'Механические гигростаты MTN',
    kind: 'control',
    category: 'accessories',
    page: 88,
    summary: 'Контролируют влажность и включают нагрев до того, как в шкафу появится конденсат.',
    specs: ['35–95 %RH', '250 В, 5 А'],
    keywords: 'гигростат влажность конденсат реле влажности',
    models: [{ code: 'MTN-410' }, { code: 'MTN-411' }],
  },
  {
    code: 'ECD',
    title: 'Электронные температурные контроллеры ECD',
    kind: 'control',
    category: 'accessories',
    page: 89,
    summary: 'Цифровое управление нагревом или охлаждением с выносным датчиком, дисплеем и регулируемым гистерезисом.',
    specs: ['−20…+100 °C', 'Точность 1 °C', '~230 В / =24 В'],
    keywords: 'контроллер электронный цифровой термостат дисплей датчик ntc',
    models: [{ code: 'ECD-1000', note: '~230 В' }, { code: 'ECD-1220', note: '=24 В' }],
  },
  {
    code: 'LDN',
    title: 'Осветительные модули LDN',
    kind: 'accessory',
    category: 'accessories',
    page: 90,
    summary: 'Светодиодное освещение шкафа: выключатель или датчик движения, крепление на магнитах или винтах.',
    specs: ['~/=48–265 В, =24 В', 'IP20'],
    keywords: 'светильник освещение лампа led датчик движения',
    models: ['LDN-5012', 'LDN-5112', 'LDN-5022', 'LDN-0012', 'LDN-0112', 'LDN-4012', 'LDN-1012'].map((code) => ({ code })),
  },
  {
    code: 'SAN',
    title: 'Карман для документации SAN',
    kind: 'accessory',
    category: 'accessories',
    page: 91,
    summary: 'Держатель для схем и эксплуатационной документации на двери шкафа.',
    specs: [],
    keywords: 'карман для документов держатель схем',
    models: [{ code: 'SAN-001' }],
  },
  {
    code: 'KFV',
    title: 'Защитные кожухи KFV',
    kind: 'accessory',
    category: 'accessories',
    page: 92,
    summary: 'Защищают фильтрующие вентиляторы и выходные фильтры от осадков и повреждений на улице.',
    specs: ['IP56'],
    keywords: 'кожух козырек защита от дождя уличный',
    models: ['KFV-150-00', 'KFV-250-00', 'KFV-300-00'].map((code) => ({ code })),
  },
  {
    code: 'GL',
    title: 'Защитные решётки GL',
    kind: 'accessory',
    category: 'accessories',
    page: 93,
    summary: 'Решётки из коррозионностойкой стали — защищают от попадания посторонних предметов.',
    specs: [],
    keywords: 'решетка защитная сетка',
    models: ['GL-040', 'GL-060', 'GL-080', 'GL-120', 'GL-145', 'GL-220', 'GL-280'].map((code) => ({ code })),
  },
];

export const seriesByCode = (code: string) => series.find((s) => s.code === code)!;
