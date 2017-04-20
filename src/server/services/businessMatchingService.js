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
      compName:m.compName,
      address: m.webAdd,
      compAddress:m.compAdd,
      nameProb: matcher(`${m.compName}`, `${m.webName}`),
      addressProb: matcher(`${m.compAdd}`, `${m.webAdd}`)
    })), ["nameProb", "addressProb"])
    .reverse()
    .filter((s)=>(s.nameProb > 0.9 && s.addressProb > 0.9))
    .slice(0,3)

    resolve({
      success:true,
      matches
    })
  })
}

function getBusinessMatchingHercules(key, compare) {
  return new Promise((resolve, reject) => {

    var params = {
      "authToken": "1231213",
      "functionality": "clearanceMatching",
      "input": [{
        "compName": "Argo Group right in Soho", 
        "compAddress": "600 Broadway Street, 10019", 
        "webName": "Argo Group on top of Soho | ArgoGroup on Mars | Argo Group right in Soho", 
        "webAddress": "600 Broadway Street, 10019 | 600 Houston, NY | 600 Broadway Street, 10019"
      }]
    }

    var options = {
        method: 'POST',
        uri: 'http://35.167.95.103:7070/SmartSearch/getHerculesData',
        body: params,
        headers: {
          "Content-Type":"application/json"
        }
    };

    request(options).then((resp)=>{
      resolve({
        success:true,
        matches:[]
      })
    });

    // const inputs = compare.map((c)=>({
    //   "compName":key.name, "compAdd":key.address,
    //   "webName":c.name, "webAdd":c.address
    // }))

    // const matches = _.sortBy(inputs.map((m)=>({
    //   name: m.webName,
    //   compName:m.compName,
    //   address: m.webAdd,
    //   compAddress:m.compAdd,
    //   nameProb: matcher(`${m.compName}`, `${m.webName}`),
    //   addressProb: matcher(`${m.compAdd}`, `${m.webAdd}`)
    // })), ["nameProb", "addressProb"])
    // .reverse()
    // .filter((s)=>(s.nameProb > 0.9 && s.addressProb > 0.9))
    // .slice(0,3)

    // resolve({
    //   success:true,
    //   matches
    // })
  })
}

export default {
  getBusinessMatching,
  getBusinessMatchingHercules
}
