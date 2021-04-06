import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldTextInput } from '../../components';
import css from './EditListingHouseRulesForm.module.css';

const { Money } = sdkTypes;

export const EditListingHouseRulesFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey1 = isNightly
        ? 'EditListingHouseRulesForm.pricePerNight'
        : isDaily
        ? 'EditListingHouseRulesForm.pricePerDay'
        : 'EditListingHouseRulesForm.HouseRules1';
      const translationKey = isNightly
        ? 'EditListingHouseRulesForm.pricePerNight'
        : isDaily
        ? 'EditListingHouseRulesForm.pricePerDay'
        : 'EditListingHouseRulesForm.HouseRules';

      const HouseRules = intl.formatMessage({
        id: translationKey,
      });

      const HouseRulesPlaceholderMessage = intl.formatMessage({
        id: 'EditListingHouseRulesForm.priceInputPlaceholder',
      });
      const HouseRules1 = intl.formatMessage({
        id: translationKey1,
      });

      const HouseRulesPlaceholderMessage1 = intl.formatMessage({
        id: 'EditListingHouseRulesForm.priceInputPlaceholder1',
      });

//       const priceRequired = validators.required(
//         intl.formatMessage({
//           id: 'EditListingHouseRulesForm.priceRequired',
//         })
//       );
//       const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
//       const minPriceRequired = validators.moneySubUnitAmountAtLeast(
//         intl.formatMessage(
//           {
//             id: 'EditListingHouseRulesForm.priceTooLow',
//           },
//           {
//             minPrice: formatMoney(intl, minPrice),
//           }
//         ),
//         config.listingMinimumPriceSubUnits
//       );
//       const priceValidators = config.listingMinimumPriceSubUnits
//         ? validators.composeValidators(priceRequired, minPriceRequired)
//         : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingHouseRulesForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingHouseRulesForm.showListingFailed" />
            </p>
          ) : null}
            <FieldTextInput
            id="HouseRules"
            name="HouseRules"
            className={css.priceInput}
            autoFocus
            label={HouseRules}
            placeholder={HouseRulesPlaceholderMessage}
            type="textarea"
            />
            
            <FieldTextInput
            id="HouseRules1"
            name="HouseRules1"
            className={css.priceInput}
            autoFocus
            label={HouseRules1}
            placeholder={HouseRulesPlaceholderMessage1}
            type="textarea"
            />
            
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingHouseRulesFormComponent.defaultProps = { fetchErrors: null };

EditListingHouseRulesFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingHouseRulesFormComponent);
