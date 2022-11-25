export interface district {
  id: number;
  name: string;
  talukas: number;
  population: number;
}

export const districts: district[] = [
  { id: 1, name: 'Mumbai', talukas: 0, population: 0 },
  { id: 2, name: 'Pune', talukas: 0, population: 0 },
  { id: 3, name: 'Satara', talukas: 9, population: 3481 },
  { id: 4, name: 'Solapur', talukas: 3, population: 0 },
  { id: 5, name: 'Sangli', talukas: 0, population: 0 },
  { id: 6, name: 'Kolhapur', talukas: 0, population: 0 },
];

export interface taluka {
  id: number;
  name: string;
  district: string;
  villages: number;
  population: number;
}

export const talukas: taluka[] = [
  { id: 1, name: 'Satara', district: 'Satara', villages: 3, population: 437 },
  { id: 2, name: 'Karad', district: 'Satara', villages: 23, population: 1565 },
  { id: 3, name: 'Patan', district: 'Satara', villages: 2, population: 13 },
  { id: 4, name: 'Koregaon', district: 'Satara', villages: 11, population: 366 },
  { id: 5, name: 'Khatav', district: 'Satara', villages: 17, population: 878 },
  { id: 6, name: 'Maan', district: 'Satara', villages: 5, population: 223 },
  { id: 7, name: 'Phaltan', district: 'Satara', villages: 1, population: 38 },
  { id: 8, name: 'Wai', district: 'Satara', villages: 1, population: 17 },
  { id: 9, name: 'Khandala', district: 'Satara', villages: 1, population: 35 },
];

export interface village {
  id: number;
  name: string;
  taluka: string;
  district: string;
  population: number;
  families: number;
}

export const villages = [
  {
    id: 1,
    name: 'Karad',
    taluka: 'Karad',
    district: 'Satara',
    population: 1,
    families: 1,
  },
];

export interface member {
  id: number;
  salutation: string;
  address?: string;
  name: string;
  taluka: string;
  memberType: string;
}

export const memberTypes = [
  'Founder Member',
  'President',
  'Vice-president',
  'Secretary',
  'Treasurer',
  'Director',
  'Volunteer',
  'Member',
];

export const members: member[] = [
  {
    id: 1,
    salutation: 'Mr.',
    name: 'Majjidbhai Shikalgar',
    address: '123, Yadogopal Peth, Satara 41502',
    taluka: 'Satara',
    memberType: 'Founder Member',
  },
  {
    id: 2,
    salutation: 'Mr.',
    name: 'Babubhai Shikalgar',
    taluka: 'Karad',
    memberType: 'President',
  },
  {
    id: 3,
    salutation: 'Mr.',
    name: 'Huseinbhai Shikalgar',
    taluka: 'Wardhangad',
    memberType: 'Vice-president',
  },
  {
    id: 4,
    salutation: 'Mr.',
    name: 'Rafiqbhai Shikalgar',
    taluka: 'Koregaon',
    memberType: 'Secretary',
  },
  {
    id: 5,
    salutation: 'Mr.',
    name: 'Shabbirbhai Shikalgar',
    taluka: 'Satara',
    memberType: 'Treasurer',
  },
  {
    id: 6,
    salutation: 'Mr.',
    name: 'Sirajbhai Shikalgar',
    taluka: 'Waduj',
    memberType: 'Director',
  },
  {
    id: 7,
    salutation: 'Mrs.',
    name: 'Hazarabi Shikalgar',
    taluka: 'Wathar',
    memberType: 'Director',
  },
  {
    id: 8,
    salutation: 'Mr.',
    name: 'Zhakirbhai Shikalgar',
    taluka: 'Malakapur',
    memberType: 'Director',
  },
  {
    id: 9,
    salutation: 'Mr.',
    name: 'Shabbirbhai Shikalgar',
    taluka: 'Rethare',
    memberType: 'Director',
  },
  {
    id: 10,
    salutation: 'Mr.',
    name: 'Nazirbhai Shikalgar',
    taluka: 'Virali',
    memberType: 'Director',
  },
  {
    id: 11,
    salutation: 'Mr.',
    name: 'Maulabhai Shikalgar',
    taluka: 'Nagthane',
    memberType: 'Director',
  },
  {
    id: 12,
    salutation: 'Mr.',
    name: 'Anis Nijamuddin Shikalgar',
    taluka: 'Satara',
    memberType: 'Advisor',
  },
  {
    id: 13,
    salutation: 'Mr.',
    name: 'Jameerbhai Shikalgar',
    taluka: 'Ogalewadi',
    memberType: 'Volunteer',
  },
  {
    id: 14,
    salutation: 'Mr.',
    name: 'Ramzaanbhai Shikalgar',
    taluka: 'Nagthane',
    memberType: 'Volunteer',
  },
  {
    id: 15,
    salutation: 'Mrs.',
    name: 'Shamimbi Shikalgar',
    taluka: 'Virali',
    memberType: 'Volunteer',
  },
  {
    id: 16,
    salutation: 'Mr.',
    name: 'Maulabhai Shikalgar',
    taluka: 'Shenoli',
    memberType: 'Volunteer',
  },
  {
    id: 17,
    salutation: 'Mrs.',
    name: 'Hajarabi Shikalgar',
    taluka: 'Satara',
    memberType: 'Volunteer',
  },
  {
    id: 18,
    salutation: 'Mr.',
    name: 'Nadimbhai Shikalgar',
    taluka: 'Kaledhon',
    memberType: 'Volunteer',
  },
  {
    id: 19,
    salutation: 'Mr.',
    name: 'Haroonbhai Shikalgar',
    taluka: 'Wathar',
    memberType: 'Volunteer',
  },
  {
    id: 20,
    salutation: 'Mr.',
    name: 'Mubarakbhai Shikalgar',
    taluka: 'Waduj',
    memberType: 'Volunteer',
  },
  {
    id: 21,
    salutation: 'Mr.',
    name: 'Rashidbhai Shikalgar',
    taluka: 'Khatav',
    memberType: 'Volunteer',
  },
  {
    id: 22,
    salutation: 'Mr.',
    name: 'Dilawarbhai Shikalgar',
    taluka: 'Karad',
    memberType: 'Volunteer',
  },
  {
    id: 23,
    salutation: 'Mr.',
    name: 'Salimbhai Shikalgar',
    taluka: 'Umbraj',
    memberType: 'Volunteer',
  },
  {
    id: 24,
    salutation: 'Mr.',
    name: 'Sameerbhai Shikalgar',
    taluka: 'Ubraj',
    memberType: 'Volunteer',
  },
  {
    id: 25,
    salutation: 'Mr.',
    name: 'Naushad Shikalgar',
    taluka: 'Karad',
    memberType: 'Volunteer',
  },
];

// color scheme ? blue - 0A5689 , yellow - F9D162, orange - F4944F,
// powder green - 6BC6A5, surf green - 21C393

//dreamy gradient = light white -F9FAFE, surf blue - 92B2FD, violet - AE7FFB
// heavy pink - F694B7, light purple - CCCFF7

//pestal color -
