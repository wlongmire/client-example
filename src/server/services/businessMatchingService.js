import _ from 'lodash';
import matcher from 'jaro-winkler';
import rp from 'request-promise';

function cleanInput(input) {
  const rtn = input

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
      "compName":   cleanInput(s.compName), "compAdd":    cleanInput(s.compAdd),
      "webName":    cleanInput(s.webName), "webAdd":     cleanInput(s.webAdd)
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

function getBusinessMatchingHercules(submissions) {
  return new Promise((resolve, reject) => {

    if (submissions.length <= 0) {
      resolve({ success:true, matches:[] })
    }

    var params = {
      "authToken": "1231213",
      "functionality": "clearanceMatching",
      "input": [{
        "compName":     cleanInput(submissions[0].compName),
        "compAddress":  cleanInput(submissions[0].compAddress),
        "webName":      submissions.reduce( (result, s)=> (`${result}|${cleanInput(s.webName)}`), "" ).slice(1),
        "webAddress":   submissions.reduce( (result, s)=> (`${result}|${cleanInput(s.webAddress)}`), "" ).slice(1)
      }]
    }

    var options = {
        method:"POST",
        uri:"http://35.167.95.103:7070/SmartSearch/getHerculesData",
        body:JSON.stringify(params)
    }
    console.log('Sending request to Hercules')
    return rp(options).then((resp)=>{
      console.log('Received response from Hercules')
      const respConverted = JSON.parse(resp)
      console.log('Parsed the JSON');
      resolve({
        success:respConverted.success,
        matches:respConverted.response
      })

    }, (error) => {
      console.log('errored after parsing');
      resolve({ success:false, matches:[] })
    });

  })
}

export default {
  getBusinessMatching,
  getBusinessMatchingHercules
}
