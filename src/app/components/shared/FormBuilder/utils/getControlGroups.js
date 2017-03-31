export default function(originalQuestions) {
  //collect all groups if they exist
  let controlGroups = originalQuestions.map((question, index) => {
    return (question.attributes && question.attributes.controlGroup) || question.name
  })

  //create a copy of original json question set
  let questions = [].concat(originalQuestions)

  controlGroups = controlGroups.filter((item, index) => {
    return !(index > 0 && controlGroups[index - 1] === item)
  });

  controlGroups = controlGroups.map((value, index) => {
    if (controlGroups.indexOf(value) < index) {
      return `${value}_${index}`
    }
    return `${value}`
  })

  controlGroups = controlGroups.reduce((map, value) => {
    const valueToCompare = value.split('_')[0]
    let sameControlGoup = []
    let flip = false

    questions.forEach((item, index) => {
      if (flip) return
      if (valueToCompare === item.name && (!item.attributes || !item.attributes.controlGroup)) sameControlGoup.push(item)
      if (!item.attributes || !item.attributes.controlGroup) return
      if (item.attributes.controlGroup === valueToCompare) sameControlGoup.push(item)
      if (sameControlGoup.length > 0 && index < questions.length - 1 && questions[index + 1].attributes.controlGroup !== valueToCompare) flip = true
    })

    questions = questions.slice(sameControlGoup.length)

    if (!map[value]) map[value] = sameControlGoup || []
    return map
  }, {})

  return controlGroups
}