import React from 'react';
import PureOptionSelect from 'components/shared/PureOptionSelect';

function LimitsFieldSet(props) {
  const {
    limitsRequested,
    errors
  } = props;

  const limits = [{12:'1m/2m'},{22:'2m/2m'},{24:'2m/4m'},{33:'3m/3m'},{44:'4m/4m'},{55:'5m/5m'} ];

  return (
    <fieldset>
      <span
        className="area-label">
        What limits are being requested for this OCP?
      </span>

      <PureOptionSelect
        field={limitsRequested}
        className="select"
        validation_status='default'
        validation_message=''>
        <option value=""></option>
        {
          limits.map((limit, key) => (
            <option key={key} value={Object.keys(limit)[0]}>{limit[Object.keys(limit)[0]]}</option>
          ))
        }
      </PureOptionSelect>

    </fieldset>);
}

export default LimitsFieldSet;
