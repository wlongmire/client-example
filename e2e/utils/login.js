function login(browser, username, password) {
  return browser
      // .url('http://ownersedge-dev.s3-website-us-east-1.amazonaws.com/')
      .url('http://localhost:7777/')
      .waitForElementVisible('body')
      .setValue('#username', username)
      .setValue('#password', [password, browser.Keys.ENTER])
      .useXpath()
      .waitForElementVisible('/html/body/div[1]/div/nav/div/div[2]/ul/li[2]/a', null, null, null, 'Login Successfull!')
}

module.exports = login
