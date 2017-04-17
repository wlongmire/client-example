import _ from 'lodash';
import matcher from 'jaro-winkler';
import request from 'request-promise';

function getBusinessMatching(submissions) {
  return new Promise((resolve, reject) => {

    const inputs = submissions.map((c)=>({
      "compName":c.compName.toLowerCase(), "compAdd":c.compAddress.toLowerCase(),
      "webName":c.webName.toLowerCase(), "webAdd":c.webAddress.toLowerCase()
    }))

    const matches = _.sortBy(inputs.map((m)=>({
      name: m.webName,
      compName:m.compName,
      address: m.webAdd,
      compAddress:m.compAdd,
      nameProb: matcher(`${m.compName.toLower()}`, `${m.webName.toLower()}`),
      addressProb: matcher(`${m.compAdd.toLower()}`, `${m.webAdd.toLower()}`)
    })), ["nameProb", "addressProb"])
    .reverse()
    .filter((s)=>(s.nameProb > 0.9 && s.addressProb > 0.9))
    .slice(0,3)
    
    console.log("matches", matches)

    resolve({
      success:true,
      matches
    })
  })
}

export default {
  getBusinessMatching
}
