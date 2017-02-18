import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';

function AdditionalInsuredInformationFieldSet(props) {
  const {
    additionalInsured: {
      name,
      relationship,
      role,
      greaterThanTwoAdditional
    }
  } = props;

  const options = [
    {value:'yes', text:'Yes'},
    {value:'no',  text:'No'},
  ];

  return (<fieldset className="sub-questions">
    <span className="area-label-sub">Tell us about them.</span>
      <ul>
        <li>
          <label>
            <PureInput
            type="text"
            field={name}
            placeholder="Name"
            validation_status="default"
            validation_message=''
          />
        </label>
      </li>

      <li>
        <label>
          <PureInput
            type="text"
            field={relationship}
            placeholder="Relationship to Primary"
            validation_status="default"
            validation_message=''
          />
        </label>
      </li>

      <li>
        <label>
          <PureInput
            type="text"
            field={role}
            placeholder="Role on Project?"
            validation_status="default"
            validation_message=''
          />
        </label>
      </li>

      <li>
        <PureRadioSet
          label={{text:"Any other additional Insured?",type:"subtitle"}}
          field={greaterThanTwoAdditional}
          options={options}
          validation_status='default'
          validation_message=''
          />

        {
          // <span className="area-label-sub">Any other additional insured?</span>
          // <radiogroup>
          //   <label>
          //     <PureRadio
          //       value="yes"
          //       field={greaterThanTwoAdditional}
          //     />
          //     Yes
          //   </label>
          //   <label>
          //     <PureRadio
          //       value="no"
          //       field={greaterThanTwoAdditional}
          //     />
          //     No
          //   </label>
          // </radiogroup>
        }
      </li>

    </ul>
  </fieldset>);
}

export default AdditionalInsuredInformationFieldSet;
