function oiFormFillout(browser) {
  return browser
    .useXpath()
    .click('/html/body/div[1]/div/div/form/div/div[3]/div/div[1]/div/div[2]/label/input') // secondary Named Insured - NO
    .click('/html/body/div[1]/div/div/form/div/div[4]/div/div[1]/div/div[2]/label/input') // any additional insured - NO
    .click('/html/body/div[1]/div/div/form/div/div[6]/div/div[1]/div/div[2]/label/input') // project limited to specific floors - NO
    .click('/html/body/div[1]/div/div/form/div/div[7]/div/div/div/div[2]/label/input') // vertical expansion  - NO
    .click('/html/body/div[1]/div/div/form/div/div[8]/div/div/div/div[2]/label/input') // work over 5 stories being done? - NO
    .click('/html/body/div[1]/div/div/form/div/div[13]/div/div/div/div[2]/label/input') // tower crane - NO
    .click('/html/body/div[1]/div/div/form/div/div[14]/div/div[1]/div/div[2]/label/input') // general contractor - NO
    .click('/html/body/div[1]/div/div/form/div/div[15]/div/div[1]/div/div[2]/label/input') // occupancy during the project?  - NO
    .click('/html/body/div[1]/div/div/form/div/div[16]/div/div[1]/div/div[2]/label/input') // exterior walls/roof - No
    .click('/html/body/div[1]/div/div/form/div/div[17]/div/div[1]/div/div[2]/label/input') // - has work started - No
    .click('/html/body/div[1]/div/div/form/div/div[18]/div/div[1]/div/div[1]/label/input') // - is there required excess coverage? - YES
    .useCss()
    .setValue('#anticipatedStartDate', '10/17/2017')
    .setValue('#anticipatedFinishDate', '10/17/2019')
    .setValue('#totalCost', 5000000)
    .setValue('#email', 'andkulak@gmail.com')
    .setValue('#phone', 7182072578)
    .setValue('#projectScope', 'Random Project Scope')
    .setValue('#excessLimitAmount', '$5,000,000')
}

module.exports = oiFormFillout;