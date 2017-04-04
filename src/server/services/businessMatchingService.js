import _ from 'lodash';
import matcher from 'jaro-winkler';
import request from 'request-promise';

function getBusinessMatching(key, compare) {
  return new Promise((resolve, reject) => {

    const inputs = compare.map((c)=>({
      "compName":key.name, "compAdd":key.address,
      "webName":c.name, "webAdd":c.address
    }))

    const matches = _.sortBy(inputs.map((m)=>({
      name: m.webName,
      address: m.webAdd,
      nameProb: matcher(`${m.compName}`, `${m.webName}`),
      addressProb: matcher(`${m.compAdd}`, `${m.webAdd}`)
    })), ["nameProb", "addressProb"])
    .reverse()
    .slice(0,3)
    .filter((s)=>(s.nameProb > 0.98 || s.addressProb > 0.98))
    
    resolve({
      success:true,
      matches
    })
  })
}

export default {
  getBusinessMatching
}
