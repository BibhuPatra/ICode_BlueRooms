import PropertyGroup from './PropertyGroup';

const exampleOptions = [
  { key: 'backyard', label: 'Backyard' },
  { key: 'barbecue/grill', label: 'Barbecue/Grill' },
  { key: 'air conditioning', label: 'Air conditioning' },
  { key: 'dish washer', label: 'Dish Washer' },
  { key: 'pets allowed', label: 'Pets Allowed' },
];

export const WithSomeSelected = {
  component: PropertyGroup,
  props: {
    id: 'yogaStyles',
    options: exampleOptions,
    selectedOptions: ['hatha', 'vinyasa', 'yin'],
    twoColumns: true,
  },
  group: 'misc',
};
