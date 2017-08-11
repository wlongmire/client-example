// navigate to ocp clearance form
function navToOcpClearance(browser) {
  return browser
      .click('/html/body/div[1]/div/nav/div/div[2]/ul/li[2]/a')
      .click('/html/body/div[1]/div/div/div/div[2]')
}

module.exports = navToOcpClearance;