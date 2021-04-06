import EditListingFeaturesForm from './EditListingFeaturesForm';

const NAME = 'yogaStyles';

const initialValueArray = ['hatha', 'vinyasa', 'yin'];
const initialValues = { [NAME]: initialValueArray };

const filterConfig = [
  {
    id: 'yogaStyles',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_yogaStyles'],
    config: {
      mode: 'has_all',
      options: [
        { key: 'backyard', label: 'Backyard' },
        { key: 'barbecue/grill', label: 'Barbecue/Grill' },
        { key: 'air conditioning', label: 'Air conditioning' },
        { key: 'dish washer', label: 'Dish Washer' },
        { key: 'pets allowed', label: 'Pets Allowed' },
      ],
    },
  },
];

export const YogaStyles = {
  component: EditListingFeaturesForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save yoga styles',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
    filterConfig,
  },
  group: 'forms',
};
