import _ from 'lodash';
import matcher from 'jaro-winkler';
import request from 'request-promise';

function getBusinessMatching(submissions) {
  return new Promise((resolve, reject) => {

    const inputs = submissions.map((c)=>({
      "compName":c.compName, "compAdd":c.compAddress,
      "webName":c.webName, "webAdd":c.webAddress
    }))

    const matches = _.sortBy(inputs.map((m)=> ({
        name: m.webName,
        compName:m.compName,
        address: m.webAdd,
        compAddress:m.compAdd,
        nameProb: matcher(`${m.compName.toLowerCase()}`, `${m.webName.toLowerCase()}`),
        addressProb: matcher(`${m.compAdd.toLowerCase()}`, `${m.webAdd.toLowerCase()}`)
      })
    ), ["nameProb", "addressProb"])
    .reverse()
    .filter((s)=>(s.nameProb > 0.9 && s.addressProb > 0.9))
    .slice(0,3)
    

    resolve({
      success:true,
      matches
    })
  })
}

export default {
  getBusinessMatching
}
