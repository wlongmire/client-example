export default function(state) {
  let names = state.questions.map(question => question.name)
  let controlGroups = state.questions.map(question=> (question.attributes && question.attributes.controlGroup))
  let supplementalQuestions = state.supplementalQuestions.map(question => question.name)

  names = names.concat(supplementalQuestions)

  let values = names.reduce((obj, name, idx) => {
    
    let val

    if (!document.getElementById(name) && !document.querySelector(`.${name} input`)) return obj

    //Read radio buttons
    if (document.querySelector(`.${name} input`)) {
      
      let option = document.querySelector(`.${name} input:checked`)
      if (!option) return obj
      val = option.value
    } else if (document.getElementById(name).classList.contains('dropdown')) {
      val = document.getElementById(name).value;

    } else {
    //Else read form elements by id
      val = document.getElementById(name).value


      if (document.getElementById(name).classList.contains('number-control')) {
        val = val.replace(/,/g, '')
      }

      //get all select values
      if (document.getElementById(name).type === 'select-multiple') {
        val = Array.from(document.querySelector('#excessLimit').children)
                    .filter(child => child.selected)
                    .map(child => child.value)
      }
      
    }

    const controlGroup = state.questions[idx] && state.questions[idx].attributes && state.questions[idx].attributes.controlGroup

    if (controlGroup) {
      if (!obj[controlGroup]) obj[controlGroup] = {}
      obj[controlGroup][name] = val
    } else {
      obj[name] = val
    }

    return obj;
  }, {})

  return values
}