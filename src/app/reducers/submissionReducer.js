import {
    reducer as formReducer
}
from 'redux-form';

import {formatDollars} from '../utils/utilities';

export default formReducer.normalize({
  RatingForm: {
    costs: formatDollars
  }
});