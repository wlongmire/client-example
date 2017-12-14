import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { APP_INITIALIZED } from '../constants/app'
import config from 'config'

import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../constants/user'

import {
    SUBMISSION_CLEARANCE_PASSED,
    SUBMISSION_CLEARANCE_FAILED,
    SUBMISSION_CLEARANCE_PENDING,
    SUBMISSION_QUOTED,
    SUBMISSION_KNOCKED_OUT,
    SUBMISSION_FAILED,
    SUBMISSION_CREATE,
    SUBMISSION_EDIT
} from '../constants/submission'

const LOGIN_EVENT = 'Authentication: Logged in'
const LOGOUT_EVENT = 'Authentication: Logged out'
const SUBMISSION_CLEARANCE_PASS_EVENT = 'Submission: Pass Clearance'
const SUBMISSION_CLEARANCE_FAIL_EVENT = 'Submission: Fail Clearance'
const SUBMISSION_CLEARANCE_PENDING_EVENT = 'Submission: Pending Clearance'
const SUBMISSION_QUOTE_EVENT = 'Submission: Quote'
const SUBMISSION_NON_QUOTE_EVENT = 'Submission: Non Quote'
const SUBMISSION_ERROR_EVENT = 'Submission: Error Quote/Knockout'
const SUBMISSION_CREATE_EVENT = 'Submission: Created'
const SUBMISSION_EDIT_EVENT = 'Submission: Editing'

const configureMixPanel = ({
    brokerName,
    username,
    email,
    role,
    brokerId,
    id
}) => {
    mixpanel.register({ 
        BrokerName: brokerName,
        User: username,
        Email: email,
        Role: role,
        Broker: brokerId,
        SubId: id,
        Environment: config.env
    })
    mixpanel.identify(username)
    mixpanel.people.set({
        Broker: brokerId,
        BrokerName: brokerName,
        first_name: username
    })
}

function* watchUserLogin() {
    yield takeEvery(USER_LOGGED_IN, action => {
        configureMixPanel(action.payload)
        mixpanel.track(LOGIN_EVENT)
    })
}

function* watchUserLogout() {
    yield takeEvery(USER_LOGGED_OUT, action => {})
}

function* watchAppInitialized() {
    yield takeEvery(APP_INITIALIZED, action => configureMixPanel(action.value))
}

function* watchSubmissionClearancePassed() {
    yield takeEvery(SUBMISSION_CLEARANCE_PASSED, action => {
        const { submissionType } = action.value
        mixpanel.track(SUBMISSION_CLEARANCE_PASS_EVENT, {
            Type: action.value.submisionType
        })
    })
}

function* watchSubmissionClearanceFailed() {
    yield takeEvery(SUBMISSION_CLEARANCE_FAILED, action => {
        const { submissionType, matches } = action.value
        mixpanel.track(SUBMISSION_CLEARANCE_FAIL_EVENT, {
            Type: submissionType,
            Matches: matches
        })
    })
}

function* watchSubmissionClearancePending() {
    yield takeEvery(SUBMISSION_CLEARANCE_PENDING, action => {
        const { submissionType, matches } = action.value
        mixpanel.track(SUBMISSION_CLEARANCE_PENDING_EVENT, {
            Type: submissionType,
            Matches: matches
        })
    })
}

function* watchSubmissionQuoted() {
    yield takeEvery(SUBMISSION_QUOTED, action => {
        mixpanel.track(SUBMISSION_QUOTE_EVENT, action.value)
    })
}

function* watchSubmissionKnockedOut() { 
    yield takeEvery(SUBMISSION_KNOCKED_OUT, action => {
        mixpanel.track(SUBMISSION_NON_QUOTE_EVENT, action.value)
    })
}

function* watchSubmissionFailed() {
    yield takeEvery(SUBMISSION_CLEARANCE_FAILED, action => {
        mixpanel.track(SUBMISSION_ERROR_EVENT, action.value)
    })
}

function* watchSubmissionCreate() {
    yield takeEvery(SUBMISSION_CREATE, action => {
        mixpanel.track(SUBMISSION_CREATE_EVENT, action.value)
    })
}

function* watchSubmissionEdit() {
    yield takeEvery(SUBMISSION_EDIT, action => {
        mixpanel.track(SUBMISSION_EDIT_EVENT, action.value)
    })
}

export default function* root() {
    yield all([
        fork(watchAppInitialized),
        fork(watchSubmissionClearancePassed),
        fork(watchSubmissionClearanceFailed),
        fork(watchSubmissionClearancePending),
        fork(watchSubmissionFailed),
        fork(watchSubmissionKnockedOut),
        fork(watchSubmissionQuoted),
        fork(watchUserLogin),
        fork(watchUserLogout)
    ])
}