import React from 'react';
import { FieldSelect } from '../../components';

import css from './EditListingDescriptionForm.module.css';

const CustomCertificateSelectFieldMaybe = props => {
  const { name, id, certificateOptions, intl } = props;
  const certificateLabel = intl.formatMessage({
    id: 'EditListingDescriptionForm.certificateLabel',
  });

  return certificateOptions ? (
    <FieldSelect className={css.certificate} name={name} id={id} label={certificateLabel}>
      {certificateOptions.map(c => (
        <label key={c.key} value={c.key}>
          {c.label}
        </label>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomCertificateSelectFieldMaybe;
