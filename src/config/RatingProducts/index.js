import OiValidation from './oi/validation'
import OCPValidation from './oi/validation'

import config from 'config'

const ratingProducts = {
    "oi":{
        "name":"Owner's Interest",
        "description":"",

        "ratingEngine":`${config.ratingsUrl}/api/calcrating/oi`,
        "formJSON":`${config.formSetUrl}/questionSets/TEST`,
        "Validation":OiValidation,
        "checkClearance":true
    },

    "ocp":{
        "name":"Owner's Contractor Project",
        "description":"",
        
        "ratingEngine":`${config.ratingsUrl}/api/calcrating/oi`,
        "formJSON":`${config.formSetUrl}/questionSets/TEST`,
        "Validation":OCPValidation,
        "checkClearance":true
    }
}

export default ratingProducts