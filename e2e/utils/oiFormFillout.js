function oiFormFillout(browser) {
  return browser
    .useXpath()
    .click('/html/body/div[1]/div/div/form/div/div[3]/div[2]/div/div[1]/div[1]/div[2]/label/input') // secondary Named Insured - NO
    .click('/html/body/div[1]/div/div/form/div/div[4]/div[2]/div/div[1]/div[1]/div[2]/label/input') // any additional insured - NO
    .click('/html/body/div[1]/div/div/form/div/div[6]/div[2]/div/div[1]/div[1]/div[2]/label/input') // project limited to specific floors - NO
    .click('/html/body/div[1]/div/div/form/div/div[14]/div[2]/div/div/div[1]/div[2]/label/input') // vertical expansion  - NO
    .click('/html/body/div[1]/div/div/form/div/div[13]/div[2]/div/div/div[1]/div[2]/label/input') // work over 5 stories being done? - NO
    .click('/html/body/div[1]/div/div/form/div/div[16]/div[2]/div/div/div[1]/div[2]/label/input') // tower crane - NO
    .click('/html/body/div[1]/div/div/form/div/div[11]/div[2]/div/div[1]/div[1]/div[2]/label/input') // general contractor - NO
    .click('/html/body/div[1]/div/div/form/div/div[12]/div[2]/div/div/div[1]/div[2]/label/input') // occupancy during the project?  - NO
    .click('/html/body/div[1]/div/div/form/div/div[15]/div[2]/div/div[1]/div[1]/div[2]/label/input') // exterior walls/roof - No   
    .click('/html/body/div[1]/div/div/form/div/div[17]/div[2]/div/div[1]/div[1]/div[2]/label/input') // - has work started - No
    .click('/html/body/div[1]/div/div/form/div/div[21]/div[2]/div/div/div[1]/label[2]/input') // - is there required excess coverage? - YES
    .useCss()
    .setValue('#anticipatedStartDate', '10/17/2017')
    .setValue('#anticipatedFinishDate', '10/17/2019')
    .setValue('#totalCost', 5000000)
    .setValue('#email', 'andkulak@gmail.com')
    .setValue('#phone', 7182072578)
    .setValue('#projectScope', 'Random Project Scope')
}

module.exports = oiFormFillout