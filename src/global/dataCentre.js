const features = [
  {
    icoff: 'address-book',
    id: 1,
    name: 'Waitlist',
    status: 'off',
  },
  {
    icoff: 'eercast',
    id: 2,
    name: 'Waitlist',
    status: 'off',
  },
  {
    icoff: 'grav',
    id: 3,
    name: 'Waitlist',
    status: 'off',
  },
  {
    icoff: 'id-card',
    id: 4,
    name: 'Direct Debit Facility',
    status: 'off',
  },
  {
    icoff: 'shower',
    id: 5,
    name: 'All Meals Provided',
    status: 'off',
  },
  {
    icoff: 'user-o',
    id: 6,
    name: 'Nappies Provided',
    status: 'off',
  },
  {
    icoff: 'anchor',
    id: 7,
    name: 'Bed Linen Provided',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 8,
    name: 'Educatioff & Development Programs',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 9,
    name: 'Some Meals Provided',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 10,
    name: 'Car Parking',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 11,
    name: 'Pram Parking',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 12,
    name: 'Outdoor Play Area',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 13,
    name: 'Indoor Play Area',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 14,
    name: 'Music Lessoffs',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 15,
    name: 'Sandpit',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 16,
    name: 'Cooking Lessoffs',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 17,
    name: 'Incursioffs',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 18,
    name: 'Excursioffs',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 19,
    name: 'Allergy Aware',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 20,
    name: 'Credit Card Payments Accepted',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 21,
    name: 'Tertiary Qualified Staff',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 22,
    name: 'Occasioffal Care',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 23,
    name: 'Shaded Outdoor Area',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 24,
    name: 'Breastfeeding Area',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 25,
    name: 'Vegetable Garden',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 26,
    name: 'Bilingual Educators',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 26,
    name: 'Can Accommodate Special Needs',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 28,
    name: 'Air Coffditioffed',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 29,
    name: 'Heated',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 30,
    name: 'In House Cook',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 31,
    name: 'Formula Provided',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 32,
    name: 'Milk Provided',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 33,
    name: 'Sunscreen Provided',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 34,
    name: 'Insect Repellent Provided',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 35,
    name: 'Weekly Updates',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 36,
    name: 'SunSafe aware',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 37,
    name: 'Daily Activity Updates',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 38,
    name: 'Approved Preschool Program',
    status: 'off',
  },
  {
    icoff: 'list',
    id: 39,
    name: 'Language Lessoffs',
    status: 'off',
  },
];
const hours = {
  normal: {
    'mon-fri': {
      afternoon: {
        from: '14:00',
        to: '17:00',
      },
      morning: {
        from: '9:00',
        to: '12:00',
      },
    },
    sat: 'Day off',
    sun: 'Day off',
  },
  'scholl-term': {
    'mon-fri': {
      afternoon: {
        from: '14:00',
        to: '17:00',
      },
      morning: {
        from: '8:00',
        to: '12:00',
      },
    },
    sat: 'Day off',
    sun: 'Day off',
  },
  'school-holidays': {
    'mon-fri': {
      afternoon: {
        from: '14:00',
        to: '17:00',
      },
      morning: {
        from: '8:00',
        to: '12:00',
      },
    },
    sat: 'Day off',
    sun: 'Day off',
  },
};
const marketing = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo erat tempor scelerisque sit adipiscing velit. Commodo erat tempor scelerisque sit adipiscing velit.',
    name: 'Featured Listing',
    price: '50',
    status: 'on',
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo erat tempor scelerisque sit adipiscing velit. Commodo erat tempor scelerisque sit adipiscing velit.',
    name: 'Featured Listing1',
    price: '30',
    status: 'on',
  },
];
const services = [
  {
    icon: 'school',
    name: 'Long Day Care1',
    price: '$112.00',
    time: '0 to 12 months',
  },
  {
    icon: 'school',
    name: 'Pre-School/ KindergartenLong Day Care',
    price: '$112.00',
    time: '0 to 12 months',
  },
  {
    icon: 'shopping-bag',
    name: 'Before & After School Care',
    price: '$112.00',
    time: '0 to 12 months',
  },
  {
    icon: 'home',
    name: 'Family Day Care',
    price: '$112.00',
    time: '0 to 12 months',
  },
  {
    icon: 'luggage',
    name: 'Vacation Care',
    price: '$112.00',
    time: '0 to 12 months',
  },
];

export { features, hours, marketing, services };
