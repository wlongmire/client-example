import _ from 'lodash';
import matcher from 'jaro-winkler';
import request from 'request-promise';

function cleanInput(input) {
  const commonWords = [
    "street",
    "st"
  ]

  const rtn = input
    .replace(/[_+-.,!@#$%^&*();\\\/|<>]/g, "")
    .toLowerCase()
  
  return(
    _.trim(rtn)
  )
}

function getBusinessMatching(submissions) {
  return new Promise((resolve, reject) => {

    const inputs = submissions.map((c)=>({
      "compName":c.compName, "compAdd":c.compAddress,
      "webName":c.webName, "webAdd":c.webAddress
    }))

    const inputsCleaned = inputs.map((s)=>({
      "compName":   cleanInput(s.compName), 
      "compAdd":    cleanInput(s.compAdd),
      "webName":    cleanInput(s.webName), 
      "webAdd":     cleanInput(s.webAdd)
    }))

    

    const matches = _.sortBy(inputs.map((s, idx)=> ({
        name: s.webName,
        compName:s.compName,
        address: s.webAdd,
        compAddress:s.compAdd,
        nameProb: matcher(cleanInput(s.webName), cleanInput(s.compName)),
        addressProb: matcher(cleanInput(s.webAdd), cleanInput(s.compAdd))
      })
    ), ["nameProb", "addressProb"])
    .reverse()
    .filter((s)=>(s.nameProb > 0.9 && s.addressProb > 0.9))
    .slice(0,5)
    
    resolve({
      success:true,
      matches
    })
  })
}

export default {
  getBusinessMatching
}
