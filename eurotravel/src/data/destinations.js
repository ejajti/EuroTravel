import spencerImg    from '../assets/images/spencer-davis-fWtJvFqyUQQ-unsplash.jpg';
import ryanImg       from '../assets/images/ryan-spencer-XGKaRnWjv1c-unsplash.jpg';
import joannaImg     from '../assets/images/joanna-chmielova-HcLbTGJ7_JI-unsplash.jpg';
import christianImg  from '../assets/images/christian-lue-AeUkq4YKvHU-unsplash.jpg';
import hendrikImg    from '../assets/images/hendrik-morkel-002kiku-xOM-unsplash.jpg';
import damianoImg    from '../assets/images/damiano-baschiera-hFXZ5cNfkOk-unsplash.jpg';
import dimitrijeImg  from '../assets/images/dimitrije-milenkovic-Wa9gkmHOTf8-unsplash.jpg';

export const UNAVAILABLE_DESTINATIONS = ['slovenija', 'bih'];

// Canonical order — used as-is across the entire site. Do not sort in components.
// 1. Hrvatska  2. Grčka  3. Makedonija  4. Italija  5. Srbija  6. Slovenija*  7. BiH*
export const destinations = [
  {
    id: 1,
    slug: 'hrvatska',
    name: 'Hrvatska',
    country: 'Hrvatska',
    flag: '🇭🇷',
    cities: ['Zagreb', 'Rijeka', 'Split', 'Istra', 'Zadar'],
    priceFrom: 60,
    currency: 'EUR',
    description:
      'Hrvatska nudi predivnu jadransku obalu, istorijske gradove i kristalno čisto more. Od živopisnog Zagreba do sunčane Istre i dalmatisnke obale, svaka destinacija odiše posebnim šarmom. Naš kombi prevoz pokriva sve ključne regije — Zagreb, Karlovac, Istru, Split i Zadar — uz direktan i udoban prevoz od vrata do vrata. Idealna destinacija za porodična putovanja i letovanje.',
    highlights: ['Jadransko more', 'Stari gradovi', 'Nacionalni parkovi'],
    image: spencerImg,
    popular: true,
    regions: [
      {
        name: 'Rijeka i Opatija',
        cities: ['Rijeka', 'Opatija'],
        oneWay: 75,
        roundTrip: 140,
      },
      {
        name: 'Istra',
        cities: ['Novigrad', 'Umag', 'Poreč', 'Rovinj', 'Vrsar', 'Pula', 'Medulin'],
        oneWay: 85,
        roundTrip: 160,
      },
      {
        name: 'Split i Zadar',
        cities: ['Split', 'Zadar'],
        oneWay: 90,
        roundTrip: 170,
      },
      {
        name: 'Zagreb',
        cities: ['Zagreb'],
        oneWay: 60,
        roundTrip: 110,
      },
      {
        name: 'Karlovac',
        cities: ['Karlovac'],
        oneWay: 70,
        roundTrip: 130,
      },
    ],
    departures: 'Svakodnevni polasci iz Beograda',
  },
  {
    id: 2,
    slug: 'grcka',
    name: 'Grčka',
    country: 'Grčka',
    flag: '🇬🇷',
    cities: ['Solun', 'Halkidiki', 'Kasandra', 'Paralija'],
    priceFrom: 75,
    currency: 'EUR',
    description:
      'Grčka je zemlja bogata istorijom, mitologijom i prelepim plažama Egejskog mora. Od živopisnog Soluna do kristalno čistih voda Halkidikija, svaka destinacija nudi nezaboravno iskustvo. Naš kombi prevoz pokriva sve ključne regije — Kasandru, Sitoniju i Olimpijsku obalu — uz udoban i direktan prevoz od vrata do vrata. Idealna destinacija za porodična putovanja, letovanje sa prijateljima ili romantični odmor uz Mediteran.',
    highlights: ['Plaže Halkidikija', 'Antička Atina', 'Mediteranska kuhinja'],
    image: ryanImg,
    popular: true,
    regions: [
      {
        name: 'Solun i okolina',
        cities: ['Solun', 'Perea', 'Nea Kalikratija', 'Nea Mudanja'],
        oneWay: 75,
        roundTrip: 140,
      },
      {
        name: 'Sitonija',
        cities: ['Sarti', 'Neos Marmaras', 'Nikiti', 'Vurvuru', 'Toroni', 'Metamorfosis'],
        oneWay: 80,
        roundTrip: 150,
      },
      {
        name: 'Kasandra',
        cities: ['Hanioti', 'Pefkohori', 'Polihrono', 'Kalitea', 'Afitos', 'Siviri'],
        oneWay: 75,
        roundTrip: 140,
      },
      {
        name: 'Olimpijska regija',
        cities: ['Paralija'],
        oneWay: 80,
        roundTrip: 150,
      },
    ],
    departures: 'Svakodnevni polasci iz Beograda',
  },
  {
    id: 5,
    slug: 'makedonija',
    name: 'Makedonija',
    country: 'Severna Makedonija',
    flag: '🇲🇰',
    cities: ['Skoplje', 'Ohrid'],
    priceFrom: 65,
    currency: 'EUR',
    description:
      'Severna Makedonija je zemlja bogate istorije, živopisne kulture i pristupačnih cena. Skoplje je moderan balkanski grad koji se brzo razvija kao turistička destinacija, dok je Ohrid biser Balkana sa kristalno čistim jezerom i starovekovnom arhitekturom. Idealna destinacija za kratke odmore i vikend putovanja uz udoban kombi prevoz od vrata do vrata.',
    highlights: ['Skoplje', 'Ohridsko jezero', 'Balkanska kuhinja'],
    image: hendrikImg,
    popular: false,
    regions: [
      {
        name: 'Skoplje',
        cities: ['Skoplje'],
        oneWay: 70,
        roundTrip: 130,
      },
      {
        name: 'Ohrid',
        cities: ['Ohrid'],
        oneWay: 65,
        roundTrip: 120,
      },
    ],
    departures: 'Svakodnevni polasci iz Beograda',
  },
  {
    id: 6,
    slug: 'italija',
    name: 'Italija',
    country: 'Italija',
    flag: '🇮🇹',
    cities: ['Trst'],
    priceFrom: 85,
    currency: 'EUR',
    description:
      'Italija je zemlja umetnosti, mode, gastronomije i nezaboravnih pejzaža. Trst je kosmopolitski lučki grad na Jadranskom moru koji spaja italijansku, austrijsku i slovenačku kulturu. Naš kombi prevoz obezbeđuje udoban prevoz od vrata do vrata uz iskusne vozače i klimatizovana vozila.',
    highlights: ['Trst — luka na Jadranu', 'Italijanska gastronomija', 'Moda i dizajn'],
    image: damianoImg,
    popular: false,
    regions: [
      {
        name: 'Trst',
        cities: ['Trst'],
        oneWay: 85,
        roundTrip: 160,
      },
    ],
    departures: 'Svakodnevni polasci iz Beograda',
  },
  {
    id: 7,
    slug: 'srbija',
    name: 'Srbija',
    country: 'Srbija',
    flag: '🇷🇸',
    cities: ['Kopaonik'],
    priceFrom: 30,
    currency: 'EUR',
    description:
      'Kopaonik je najveće i najpopularnije planinsko odredište u Srbiji, poznato po izvrsnim ski stazama zimi i bujnoj prirodi leti. Uz udoban kombi prevoz od vrata do vrata, put do Kopaonika nikada nije bio lakši.',
    highlights: ['Ski staze', 'Planinska priroda', 'Zimski odmor'],
    image: dimitrijeImg,
    popular: false,
    regions: [
      {
        name: 'Kopaonik',
        cities: ['Kopaonik'],
        oneWay: 30,
        roundTrip: 50,
      },
    ],
    departures: 'Svakodnevni polasci iz Beograda',
  },
  {
    id: 3,
    slug: 'slovenija',
    name: 'Slovenija',
    country: 'Slovenija',
    flag: '🇸🇮',
    cities: ['Ljubljana', 'Maribor', 'Bled', 'Celje', 'Ptuj'],
    priceFrom: 70,
    currency: 'EUR',
    description:
      'Slovenija je mala zemlja velikih prirodnih lepota — od alpskih planina i bajkovitog jezera Bled do živopisne Ljubljane i istorijskih gradova poput Maribora, Celja i Ptuja. Naš kombi prevoz pokriva sve ključne destinacije uz direktan i udoban prevoz od vrata do vrata. Idealna za kratke odmore i vikend putovanja.',
    highlights: ['Alpske planine', 'Jezero Bled', 'Ljubljana'],
    image: joannaImg,
    popular: false,
    regions: [
      {
        name: 'Slovenija',
        cities: ['Ljubljana', 'Maribor', 'Celje', 'Ptuj', 'Novo Mesto', 'Brežice', 'Bled'],
        oneWay: 70,
        roundTrip: 130,
      },
    ],
    departures: 'Svakodnevni polasci iz Beograda',
  },
  {
    id: 4,
    slug: 'bih',
    name: 'Bosna i Hercegovina',
    country: 'Bosna i Hercegovina',
    flag: '🇧🇦',
    cities: ['Sarajevo', 'Jahorina'],
    priceFrom: 35,
    currency: 'EUR',
    description:
      'Bosna i Hercegovina fascinira spajanjem orijentalnih i evropskih uticaja. Sarajevo je grad posebne atmosfere, a Jahorina poznata skijaška destinacija.',
    highlights: ['Stari Grad Sarajevo', 'Jahorina ski centar', 'Bh. kuhinja'],
    image: christianImg,
    popular: false,
  },
];
