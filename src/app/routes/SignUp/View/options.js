import fetch from 'isomorphic-fetch';
import config from 'config';

const Options = {

  brokers:()=> {
    let baseURL = config.apiserver.url;

    return new Promise((resolve, reject) => {
      fetch(baseURL + '/um/listBrokers', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => {

        if (!res.success) {
          return Promise.reject(res.message);
        }

        resolve(
          [{
            "optionId":"0",
            "text": "Please Select a Broker",
            "value":""
          }].concat(res.brokers.map((broker, idx)=>({
            "optionId": String(idx + 1),
            "text":broker.name,
            "value":broker._id
          })
        )))
        
      })
      
    })
  }

}

export default Options