import OIValidation from './oi/validation'
import OIForm from './oi/form.js'

import OCPValidation from './ocp/validation'
import OCPForm from './ocp/form.js'

import config from 'config'

const ratingProducts = {
    oi:{
        type: "oi",
        name:"Owner's Interest",
        description:"Owners of construction projects should have their own liability coverage. The Owner's Interest policy closes the gaps in the owner's liability insurance program and assure more adequate protection.",
        formJSON: OIForm,
        Validation:OIValidation,
        checkClearance:true
    },

    ocp:{
        type: "ocp",
        name:"Owners and Contractors Protective",
        description:"The Owners and Contractors Protective policy responds to liability arising out of the insured's own acts or omissions in connection with its general supervision of the contractor's operations.",
        formJSON: OCPForm,
        Validation:OCPValidation,
        checkClearance:true
    }
}

export default ratingProducts