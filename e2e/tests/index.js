const config = require('../nightwatch.conf.js')
const login = require('../utils/login')
const clearanceFormFillout = require('../utils/clearanceFormFillout')
const navToOcpClearance = require('../utils/navToOcpClearance')
const navToOiClearance = require('../utils/navToOiClearance')
const clearancePassAndContinue = require('../utils/clearancePassAndContinue')
const ocpFormFillout = require('../utils/ocpFormFillout')
const oiFormFillout = require('../utils/oiFormFillout')
const clearanceFail = require('../utils/clearanceFail')
const submitForm = require('../utils/submitForm')
const getToSubmissionsTable = require('../utils/getToSubmissionsTable')
const editSubmission = require('../utils/editSubmission')
const checkEditSubmission = require('../utils/checkEditSubmission')
const checkSaveSubmission = require('../utils/checkSaveSubmission')
const uid = require('uid-safe')

// enter your username and password here
const username = 'ownersedgesubmissions@gmail.com'
const password = 'Argopass1!'

const ocpPrimaryInsuredName = `${uid.sync(15)}Test`
const oiPrimaryInsuredName = `${uid.sync(15)}Test`
const randomTotalCost = Math.floor(Math.random() * 10000000)
const randomPhoneNumber = Math.floor(Math.random() * 10000000)
const editSearchValue = 'x8xfu__0w0-7TSLGBMBzTest'

module.exports = {
  'OI Fail Clearance': (browser) => {
    login(browser, username, password)
    navToOiClearance(browser)
    clearanceFormFillout(browser, false)
    clearanceFail(browser)
    .end()
  },
  'OCP Fail Clearance': (browser) => {
    login(browser, username, password)
    navToOcpClearance(browser)
    clearanceFormFillout(browser, false)
    clearanceFail(browser)
    .end()
  },
  'OCP Successful Form Fillout': (browser) => {
    login(browser, username, password)
    navToOcpClearance(browser)
    clearanceFormFillout(browser, true, ocpPrimaryInsuredName)
    clearancePassAndContinue(browser)
    ocpFormFillout(browser)
    submitForm(browser)
    checkSaveSubmission(browser, ocpPrimaryInsuredName)
    .end()
  },
  'OI Successful Form Fillout': (browser) => {
    login(browser, username, password)
    navToOiClearance(browser)
    clearanceFormFillout(browser, true, oiPrimaryInsuredName)
    clearancePassAndContinue(browser)
    oiFormFillout(browser)
    submitForm(browser)
    checkSaveSubmission(browser, oiPrimaryInsuredName)
    .end()
  },
  'OCP Successful *~ Edit ~* Form Fillout': (browser) => {
    login(browser, username, password)
    getToSubmissionsTable(browser)
    editSubmission(browser, randomTotalCost, randomPhoneNumber, editSearchValue)
    submitForm(browser)
    checkEditSubmission(browser, randomPhoneNumber, randomTotalCost, editSearchValue)
    .end()
  }
}