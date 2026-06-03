import spencerImg    from '../assets/images/spencer-davis-fWtJvFqyUQQ-unsplash.jpg';
import ryanImg       from '../assets/images/ryan-spencer-XGKaRnWjv1c-unsplash.jpg';
import joannaImg     from '../assets/images/joanna-chmielova-HcLbTGJ7_JI-unsplash.jpg';
import christianImg  from '../assets/images/christian-lue-AeUkq4YKvHU-unsplash.jpg';
import hendrikImg    from '../assets/images/hendrik-morkel-002kiku-xOM-unsplash.jpg';
import damianoImg    from '../assets/images/damiano-baschiera-hFXZ5cNfkOk-unsplash.jpg';
import dimitrijeImg  from '../assets/images/dimitrije-milenkovic-Wa9gkmHOTf8-unsplash.jpg';

export const destinations = [
  {
    id: 1,
    slug: 'hrvatska',
    name: 'Hrvatska',
    country: 'Hrvatska',
    flag: '🇭🇷',
    cities: ['Zagreb', 'Rijeka', 'Split'],
    priceFrom: 50,
    currency: 'EUR',
    description:
      'Hrvatska nudi predivnu jadransku obalu, istorijske gradove i kristalno čisto more. Idealna destinacija za porodična putovanja i ljetovanje uz udoban kombi prevoz.',
    highlights: ['Jadransko more', 'Stari gradovi', 'Nacionalni parkovi'],
    image: spencerImg,
    popular: true,
  },
  {
    id: 2,
    slug: 'grcka',
    name: 'Grčka',
    country: 'Grčka',
    flag: '🇬🇷',
    cities: ['Halkidiki', 'Atina'],
    priceFrom: 75,
    currency: 'EUR',
    description:
      'Grčka je zemlja bogata istorijom, mitologijom i prelepim plažama Egejskog mora. Halkidiki je posebno popularan odred za letnji odmor sa porodicom.',
    highlights: ['Plaže Halkidikija', 'Antička Atina', 'Mediteranska kuhinja'],
    image: ryanImg,
    popular: true,
  },
  {
    id: 3,
    slug: 'slovenija',
    name: 'Slovenija',
    country: 'Slovenija',
    flag: '🇸🇮',
    cities: ['Ljubljana', 'Maribor'],
    priceFrom: 75,
    currency: 'EUR',
    description:
      'Slovenija je mala zemlja velikh prirodnih lepota — od alpskih planina do Jadranskog mora. Ljubljana je jedan od najlepših malih gradova Evrope.',
    highlights: ['Alpske planine', 'Jezero Bled', 'Ljubljana'],
    image: joannaImg,
    popular: false,
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
  {
    id: 5,
    slug: 'makedonija',
    name: 'Makedonija',
    country: 'Severna Makedonija',
    flag: '🇲🇰',
    cities: ['Skoplje'],
    priceFrom: 70,
    currency: 'EUR',
    description:
      'Severna Makedonija je zemlja bogate istorije, živopisne kulture i pristupačnih cena. Skoplje je moderan balkanski grad koji se brzo razvija kao turistička destinacija.',
    highlights: ['Skoplje', 'Ohridsko jezero', 'Balkanska kuhinja'],
    image: hendrikImg,
    popular: false,
  },
  {
    id: 6,
    slug: 'italija',
    name: 'Italija',
    country: 'Italija',
    flag: '🇮🇹',
    cities: ['Trst', 'Venecija'],
    priceFrom: 75,
    currency: 'EUR',
    description:
      'Italija je zemlja umetnosti, mode, gastonomije i nezaboravnih pejzaža. Venecija i Trst su idealne polazne tačke za istraživanje severne Italije.',
    highlights: ['Venecija', 'Italijanska kuhinja', 'Moda i dizajn'],
    image: damianoImg,
    popular: false,
  },
  {
    id: 7,
    slug: 'srbija',
    name: 'Srbija',
    country: 'Srbija',
    flag: '🇷🇸',
    cities: ['Beograd', 'Novi Sad', 'Niš'],
    priceFrom: 30,
    currency: 'EUR',
    description:
      'Srbija nudi živopisni noćni život, bogatu istoriju i toplo gostoprimstvo. Beograd je jedan od najdinamičnijih gradova regiona.',
    highlights: ['Beograd noćni život', 'Exit Festival', 'Srpska kuhinja'],
    image: dimitrijeImg,
    popular: false,
  },
];
