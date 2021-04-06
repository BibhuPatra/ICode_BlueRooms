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
import { Button, FieldRadioButton, Form, FieldCurrencyInput } from '../../components';
import css from './EditListingPricingForm.module.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        formId,
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

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder1',
      });
      const pricePerUnitMessage1 = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage1 = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder1',
      });
      const pricePerUnitMessage2 = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage2 = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder2',
      });
        const pricePerUnitMessage3 = intl.formatMessage({
        id: translationKey,
      });
        const pricePerToatalMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceTotalLabel',
      });

      const pricePlaceholderMessage3 = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder3',
      });
      const pricePlaceholderMessage4 = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder4',
      });
      const radioButtonsLable = intl.formatMessage({
        id: 'EditListingPricingForm.radioButtonInput',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;
      const priceValidators1 = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;
      const priceValidators2 = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;
      const priceValidators3 = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError} = fetchErrors || {};
      const idPrefix = `${formId}` || 'EditListingAvailabilityExceptionForm';

      
      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
          {/* {showListingsUtilities ? (
            <p className={css.root1}>
              <FormattedMessage id="EditListingPricingForm.showListingUtilities" />
            </p>
          ) : null} */}
          
          {/* //Radio Button */}
          <p>Are Utilitis included in your rent?</p>
          <div className={css.radioButtons}>
              <FieldRadioButton
                id={`${idPrefix}.available`}
                name="availability"
                label={intl.formatMessage({ id: 'EditListingPricingForm.radioButtonInputYes'})}
                value="available"
                checkedClassName={css.checkedAvailable}
                showAsRequired={pristine}
              />
              <FieldRadioButton
                id={`${idPrefix}.not-available`}
                name="availability"
                label={intl.formatMessage({
                  id: 'EditListingPricingForm.radioButtonInputNo',
                })}
                value="not-available"
                checkedClassName={css.checkedNotAvailable}
                showAsRequired={pristine}
              />
            </div>
          <br></br>
          <h2>Monthly Rent</h2>
          <FieldCurrencyInput
            id="price"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage}
            placeholder={pricePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            // validate={priceValidators}
          />
          <p className = {css.root1}>
            <FormattedMessage id="EditListingPricingForm.showUtilities" />
          <FieldCurrencyInput
            id="price1"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage1}
            placeholder={pricePlaceholderMessage1}
            currencyConfig={config.currencyConfig}
            // validate={priceValidators1}
          />
          <FieldCurrencyInput
            id="price2"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage2}
            placeholder={pricePlaceholderMessage2}
            currencyConfig={config.currencyConfig}
            // validate={priceValidators2}
          />
          <FieldCurrencyInput
            id="price3"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage3}
            placeholder={pricePlaceholderMessage3}
            currencyConfig={config.currencyConfig}
            // validate={priceValidators3}
          />
          </p>
          <FieldCurrencyInput
            id="Total"
            name="total"
            className={css.priceInput}
            autoFocus
            label={pricePerToatalMessage}
            placeholder={pricePlaceholderMessage4}
            currencyConfig={config.currencyConfig}
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

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingPricingFormComponent);
