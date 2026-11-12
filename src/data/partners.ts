// Дистрибьюторы Silart (страница «Где купить»).
// Источник — silart.com/partners/, просмотрено 2026-11-12.
// Чтобы добавить партнёра, достаточно дописать запись в нужный город.

export interface Partner {
  name: string;
  address?: string;
  phones?: string[];
  email?: string;
  site?: string;
}

export interface City {
  name: string;
  slug: string;
  partners: Partner[];
}

export interface Country {
  name: string;
  cities: City[];
}

export const partners: Country[] = [
  {
    name: 'Россия',
    cities: [
      {
        name: 'Москва',
        slug: 'moscow',
        partners: [
          {
            name: 'ООО «АЙДИСТРИБЬЮТ»',
            address: '115193, г. Москва, ул. 7-я Кожуховская, д. 15, стр. 1',
            phones: ['+7 (499) 558-10-78', '8 (800) 301-62-69'],
            email: 'sale+474925@idistribute.ru',
            site: 'https://www.idistribute.ru',
          },
          {
            name: 'ООО «АМЕРАЛ»',
            address: 'г. Москва, ул. Рябиновая, д. 53, офис 416',
            phones: ['+7 (495) 128-21-12'],
            email: 'start@boxev.ru',
            site: 'https://www.boxev.ru',
          },
          {
            name: 'ООО «ВСЕИНСТРУМЕНТЫ.РУ»',
            phones: ['+7 (495) 647-10-00', '8 (800) 550-37-70'],
            site: 'https://www.vseinstrumenti.ru',
          },
          {
            name: 'ООО «ГРУППА АЙТЕКС»',
            address: 'г. Москва, Электролитный проезд, д. 3, часть стр. 83',
            phones: ['+7 (495) 739-09-96', '+7 (495) 445-05-10'],
            email: 'itecs@itecs.ru',
            site: 'https://www.itecs.ru',
          },
          {
            name: 'ООО «ОКТАНТ»',
            address: 'г. Москва, ул. Угрешская, д. 12, стр. 2',
            phones: ['+7 (495) 120-45-66'],
            email: 'zakaz@oktant.ru',
            site: 'https://oktant.ru',
          },
        ],
      },
      {
        name: 'Екатеринбург',
        slug: 'ekaterinburg',
        partners: [
          {
            name: 'ООО «НАГ»',
            address: 'г. Екатеринбург, ул. Краснолесья, 12А, 4 этаж',
            phones: ['+7 (343) 311-51-80'],
            email: 'sales@nag.ru',
            site: 'https://shop.nag.ru',
          },
          {
            name: 'ООО «ТД УЭТ»',
            address: 'г. Екатеринбург, ул. Педагогическая, стр. 5А, пом. 27',
            phones: ['+7 (343) 228-18-62'],
            email: 'sale@uralenergotel.ru',
            site: 'https://www.uralenergotel.ru',
          },
          {
            name: 'ООО «УРАЛСКС»',
            address: 'г. Екатеринбург, ул. Зоологическая, 7-Г, оф. 602, вход № 6',
            phones: ['+7 (343) 243-68-07', '+7 (950) 561-73-35'],
            email: 'info@uralsks.ru',
            site: 'https://www.uralsks.ru',
          },
        ],
      },
      {
        name: 'Ижевск',
        slug: 'izhevsk',
        partners: [
          {
            name: 'ООО «СКАТ ТЕХНОЛОДЖИ»',
            address: 'г. Ижевск, ул. К. Маркса, 218, офис 503',
            phones: ['+7 (495) 663-73-29', '+7 (3412) 57-02-37'],
            email: 'info@sktech.ru',
            site: 'https://www.sktech.ru',
          },
        ],
      },
      {
        name: 'Казань',
        slug: 'kazan',
        partners: [
          {
            name: 'ООО «ЭЛЕКТРОКОМПЛЕКТ»',
            address: '420129, г. Казань, ул. Якын, д. 22',
            site: 'https://www.smart-shop.pro',
          },
        ],
      },
      {
        name: 'Краснодар',
        slug: 'krasnodar',
        partners: [
          {
            name: 'ООО «ЭЛЕКТРОХОЛДИНГ»',
            address: 'г. Краснодар, ул. Северная, 600 г',
            email: 'info@elhold.ru',
            site: 'https://elhold.ru',
          },
        ],
      },
      {
        name: 'Нижний Новгород',
        slug: 'nizhny-novgorod',
        partners: [
          {
            name: 'ООО «КИТ-ЭНЕРГО»',
            address: 'г. Нижний Новгород, пр-т Гагарина, 178/1, БЦ «Проспект», 4 этаж',
            phones: ['8 (800) 775-46-09'],
            email: 'info@kitenergo.ru',
            site: 'https://www.kitenergo.ru',
          },
        ],
      },
      {
        name: 'Новосибирск',
        slug: 'novosibirsk',
        partners: [
          {
            name: 'ООО «СИБИРЬЭЛЕКТРА»',
            address: 'г. Новосибирск, ул. Фабричная, д. 10',
            phones: ['+7 (383) 335-77-04', '+7 (913) 928-73-55'],
            email: 'sales@sibirelectra.ru',
            site: 'https://www.sibirelectra54.ru',
          },
          {
            name: 'ООО «ЭЛЕКТРОПРОФИ»',
            address: 'г. Новосибирск, ул. Мира, 65/2',
            phones: ['+7 (383) 363-02-63'],
            email: 'sales@rineco.ru',
            site: 'https://www.electro-profi.ru',
          },
        ],
      },
      {
        name: 'Пермь',
        slug: 'perm',
        partners: [
          {
            name: 'ООО «ТД ТЕХНОКОМ+»',
            address: 'г. Пермь, ул. Василия Каменского, 10а',
            phones: ['+7 (342) 229-29-09', '+7 (342) 244-45-44', '+7 (342) 244-53-13'],
            email: 'info@tkp.perm.ru',
            site: 'https://www.texnokom-plus.ru',
          },
        ],
      },
      {
        name: 'Самара',
        slug: 'samara',
        partners: [
          {
            name: 'ООО «ПРОМЭНЕРГОСИСТЕМЫ» (ГК «ЭЛЕКТРОКЛУБ»)',
            phones: ['+7 (846) 979-79-79', '+7 (846) 212-00-80'],
            email: 'eclub@eclub-s.ru',
            site: 'https://www.eclub-s.ru',
          },
        ],
      },
      {
        name: 'Санкт-Петербург',
        slug: 'saint-petersburg',
        partners: [
          {
            name: 'ООО «ГЕКОМС»',
            address: 'г. Санкт-Петербург, Большой Сампсониевский пр-т, 84',
            phones: ['8 (800) 600-26-85', '+7 (812) 317-00-87'],
            email: 'info@gekoms.ru',
            site: 'https://www.gekoms.org',
          },
        ],
      },
      {
        name: 'Чебоксары',
        slug: 'cheboksary',
        partners: [
          {
            name: 'ООО «ОРТИС»',
            address: 'г. Чебоксары, Лапсарский проезд, д. 13',
            phones: ['8 (800) 700-20-90', '+7 (8352) 24-30-00'],
            email: 'ortice@ortice.ru',
            site: 'https://www.ortice.ru',
          },
          {
            name: 'ООО «ЭЛЕККОМ ЛОГИСТИК»',
            address: 'г. Чебоксары, пр-т И. Я. Яковлева, зд. 3, этаж 8',
            phones: ['+7 (8352) 220-380', '+7 (8352) 222-781'],
            email: 'sales@elekkom.ru',
            site: 'https://www.elekkomgroup.ru',
          },
        ],
      },
    ],
  },
  {
    name: 'Казахстан',
    cities: [
      {
        name: 'Алматы',
        slug: 'almaty',
        partners: [
          {
            name: 'ООО «ELECTRIC LIGHT»',
            address: 'г. Алматы, ул. Ауэзова, д. 84, офис 310',
            phones: ['+7 (727) 245-35-35'],
            email: 'wgm@wgm.kz',
            site: 'https://www.electriclight.kz',
          },
          {
            name: 'ТОО «LMA ELECTRIC»',
            address: 'г. Алматы, ул. Джумалиева, д. 19, к. 1',
            phones: ['+7 (727) 339-67-89'],
            email: 'z.klim@lma-electric.kz',
            site: 'https://www.lma-el.kz',
          },
        ],
      },
    ],
  },
  {
    name: 'Беларусь',
    cities: [
      {
        name: 'Минск',
        slug: 'minsk',
        partners: [
          {
            name: 'ООО «ВЕГА ЭЛЕКТРО»',
            address: 'г. Минск, ул. Олешева, д. 14, офис 318',
            phones: ['+375 (29) 396-88-85'],
            email: 'info@vegaelectro.by',
            site: 'https://www.vegaelectro.by',
          },
          {
            name: 'ООО «ВЭЛТКОМПАНИ»',
            address: 'Минский р-н, д. Боровляны, ул. 40 лет Победы, д. 23А, офис 14',
            phones: ['+375 (17) 513-77-61'],
            email: 'info-velt@yandex.by',
            site: 'https://www.velt.by',
          },
          {
            name: 'ООО «ПВК»',
            address: 'г. Минск, ул. Леонида Беды, 45, пом. 813',
            phones: ['+375 (17) 373-70-60'],
            email: '1807060pvk@gmail.com',
            site: 'https://www.e-component.by',
          },
        ],
      },
    ],
  },
];

/** Номер телефона в формате для ссылки tel: */
export const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '');
  // Российские номера «8 (800) …» → +7800…
  return `tel:${digits.startsWith('8') && digits.length === 11 ? `+7${digits.slice(1)}` : digits}`;
};

/** Адрес сайта без протокола — для подписи ссылки */
export const siteLabel = (site: string) => site.replace(/^https?:\/\//, '').replace(/\/$/, '');
