import _ from 'lodash';
import request from 'request-promise';

function getBusinessMatching(key, compare) {
  return new Promise((resolve, reject) => {

    const inputs = compare.map((c)=>(
      {
        "compName":key.name,
        "compAdd":key.address,
        "webName":c.name,
        "webAdd":c.address
      }
    )).slice(0,10);

    const url = `http://35.167.95.103:7070/SmartSearch/getHerculesData?`;
    const requestBody = {
      "authToken":"1231213",
      "functionality":"businessMatching",
      "input":inputs
    };

    console.log(inputs);

    request({
      url,
      method: 'POST',
      body:requestBody,
      json: true
    }).then((resp)=>{
      let comparisons = [];
      
      console.log(resp);
      
      resp.map((comp, idx)=>{

        
        if (comp.result === '1') {
          comparisons.push(
            {
              'name':inputs[idx].webName,
              'address':inputs[idx].webAdd,
              'prob':comp.prob
            });
        }
        
      });

      comparisons = _.sortBy(comparisons, ['prod']);
      console.log(comparisons);

      resolve({
        success:true
      });
    })
  })
}

export default {
  getBusinessMatching
}
