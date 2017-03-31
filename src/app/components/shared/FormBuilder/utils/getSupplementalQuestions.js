export default function(item, originalSupplementalQuestions) {
    let supplementalQuestions
    let supplementalQuestionIds = []

    if (item.attributes && item.attributes.options) {
      item.attributes.options.forEach((option) => {
        if (option.supplementalquestionIds)  supplementalQuestionIds = supplementalQuestionIds.concat(option.supplementalquestionIds)
      })
    }

    supplementalQuestions = supplementalQuestionIds.map((questionId) => {
      return originalSupplementalQuestions.find((element) => {
        return element.questionId === questionId
      })
    })

    supplementalQuestions = supplementalQuestions.filter(item => item)

    return Array.from(new Set(supplementalQuestions))
}