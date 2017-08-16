// ensure that submissions table shows up in the root url
function getToSubmissionsTable(browser) {
 return browser
      .useCss()
      .waitForElementVisible('.table', 30000, null, null, 'The Table shows Up!')
}

module.exports = getToSubmissionsTable;
