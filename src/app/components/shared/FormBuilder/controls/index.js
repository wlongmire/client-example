import InputContainerC from '../controls/InputContainer'
import LabelContainer from '../controls/LabelContainer'
import DropDownContainerC from '../controls/DropDownContainer'
import MultiSelectContainer from '../controls/MultiSelectContainer'
import RadioContainerC from '../controls/RadioContainer'

// use this object to map inputTypes to components
const maps = {
  text: InputContainerC,
  freeform: InputContainerC,
  label: LabelContainer,
  number: InputContainerC,
  password: InputContainerC,
  'dropdown-single': DropDownContainerC,
  'dropdown-multi': MultiSelectContainer,
  radio: RadioContainerC
}

export default maps