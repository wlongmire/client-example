import OiValidation from './oi/validation'
import OCPValidation from './oi/validation'

import config from 'config'

const ratingProducts = {
    "oi":{
        "name":"Owner's Interest",
        "description":"Mi eu a mattis parturient vel phasellus parturient parturient vestibulum tellus fusce ante nisl dictum facilisis nam ridiculus ornare purus et. Montes fermentum duis quisque vivamus iaculis tempor et ad nunc mus nibh vulputate libero a tellus laoreet condimentum.",

        "ratingEngine":`${config.ratingsUrl}/api/calcrating/oi`,
        "formJSON":`${config.formSetUrl}/questionSets/TEST`,
        "Validation":OiValidation,
        "checkClearance":true
    },

    "ocp":{
        "name":"Owner's Contractor Project",
        "description":"Montes fermentum duis quisque vivamus iaculis tempor et ad nunc mus nibh vulputate libero a tellus laoreet condimentum.",
        
        "ratingEngine":`${config.ratingsUrl}/api/calcrating/oi`,
        "formJSON":`${config.formSetUrl}/questionSets/TEST`,
        "Validation":OCPValidation,
        "checkClearance":true
    }
}

export default ratingProducts