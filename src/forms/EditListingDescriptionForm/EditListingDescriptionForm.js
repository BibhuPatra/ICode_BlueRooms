import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldNumberInput } from '../../components';
import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';
// import { FieldNumberInput } from '../../components/FieldNumberInput/FieldNumberInput'
import css from './EditListingDescriptionForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        certificateOptions,
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

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });
      
      const descriptionMessage1 = intl.formatMessage({
        id: 'EditListingDescriptionForm.description1',
      });
      const descriptionPlaceholderMessage1 = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder1',
      });
      const numberMessage = intl.formatMessage({
        id: 'EditListingNumberForm.number',
      });
      const numberPlaceholderMessage = intl.formatMessage({
        id: 'EditListingNumberForm.numberPlaceholder',
      });
      const numberMessage1 = intl.formatMessage({
        id: 'EditListingNumberForm.number1',
      });
      const numberPlaceholderMessage1 = intl.formatMessage({
        id: 'EditListingNumberForm.numberPlaceholder1',
      });
      const numberMessage2 = intl.formatMessage({
        id: 'EditListingNumberForm.number2',
      });
      const numberPlaceholderMessage2 = intl.formatMessage({
        id: 'EditListingNumberForm.numberPlaceholder2',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />
          <FieldNumberInput
            id="number"
            name="Number"
            className={css.description}
            type="textarea"
            label={numberMessage2}
            placeholder={numberPlaceholderMessage2}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          <FieldNumberInput
            id="number1"
            name="Number1"
            className={css.description}
            type="textarea"
            label={numberMessage1}
            placeholder={numberPlaceholderMessage1}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          <FieldNumberInput
            id="number2"
            name="Number2"
            className={css.description}
            type="textarea"
            label={numberMessage}
            placeholder={numberPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage1}
            placeholder={descriptionPlaceholderMessage1}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          
          <FieldTextInput
            id="description1"
            name="description1"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
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

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  certificateOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
