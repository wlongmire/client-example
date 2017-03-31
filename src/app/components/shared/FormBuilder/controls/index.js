import InputContainer from '../controls/InputContainer'
import LabelContainer from '../controls/LabelContainer'
import DropDownContainer from '../controls/DropDownContainer'
import MultiSelectContainer from '../controls/MultiSelectContainer'
import RadioContainer from '../controls/RadioContainer'

// use this object to map inputTypes to components
const maps = {
  'text': InputContainer,
  'freeform': InputContainer,
  'label': LabelContainer,
  'number': InputContainer,
  'dropdown-single': DropDownContainer,
  'dropdown-multi': MultiSelectContainer,
  'radio': RadioContainer
}



export default maps