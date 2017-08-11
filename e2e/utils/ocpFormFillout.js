function ocpFormFillout(browser) {
  return browser
      .useCss()
      .setValue('#totalCost', 5000000)
      .setValue('#anticipatedStartDate', '10/17/2017')
      .setValue('#anticipatedFinishDate', '10/17/2019')
      .setValue('#projectScope', 'Random Project Scope')
      .setValue('#email', 'andkulak@gmail.com')
      .setValue('#phone', 7182072578)
      .setValue('#limitsRequested', '1/2')
      .useXpath()
      .click('/html/body/div[1]/div/div/form/div/div[9]/div/div/div/div[2]/label/input') // vertical expansion - NO
      .click('/html/body/div[1]/div/div/form/div/div[16]/div/div/div/div[2]/label/input') // project requirements - NO
      .click('/html/body/div[1]/div/div/form/div/div[18]/div/div/div/div[2]/label/input') // exterior Work over 4 stories - NO
      .click('/html/body/div[1]/div/div/form/div/div[19]/div/div[1]/div/div[2]/label/input') // servicingServeralLocations - NO
      
}

module.exports = ocpFormFillout;