/* eslint-disable no-console */
import EditListingHouseRulesForm from './EditListingHouseRulesForm';

export const Empty = {
  component: EditListingHouseRulesForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingHouseRulesForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save price',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};
