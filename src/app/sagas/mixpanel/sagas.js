import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { APP_INITIALIZED } from '../../constants/app'
import config from 'config'
import events from './events'

import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../../constants/user'

import {
    SUBMISSION_CLEARANCE_PASSED,
    SUBMISSION_CLEARANCE_FAILED,
    SUBMISSION_CLEARANCE_PENDING,
    SUBMISSION_QUOTED,
    SUBMISSION_KNOCKED_OUT,
    SUBMISSION_FAILED,
    SUBMISSION_CREATE,
    SUBMISSION_EDIT
} from '../../constants/submission'

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
        configureMixPanel(action.value)
        mixpanel.track(events.auth.login.eventName)
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
        mixpanel.track(events.submission.passClearance.eventName, {
            Type: action.value.submisionType
        })
    })
}

function* watchSubmissionClearanceFailed() {
    yield takeEvery(SUBMISSION_CLEARANCE_FAILED, action => {
        const { submissionType, matches } = action.value
        mixpanel.track(events.submission.failClearance.eventName, {
            Type: submissionType,
            Matches: matches
        })
    })
}

function* watchSubmissionClearancePending() {
    yield takeEvery(SUBMISSION_CLEARANCE_PENDING, action => {
        const { submissionType, matches } = action.value
        mixpanel.track(events.submission.pendingClearance.eventName, {
            Type: submissionType,
            Matches: matches
        })
    })
}

function* watchSubmissionQuoted() {
    yield takeEvery(SUBMISSION_QUOTED, action => {
        mixpanel.track(events.submission.quoted.eventName, action.value)
    })
}

function* watchSubmissionKnockedOut() {
    yield takeEvery(SUBMISSION_KNOCKED_OUT, action => {
        mixpanel.track(events.submission.knockout.eventName, action.value)
    })
}

function* watchSubmissionFailed() {
    yield takeEvery(SUBMISSION_CLEARANCE_FAILED, action => {
        mixpanel.track(events.submission.error.eventName, action.value)
    })
}

function* watchSubmissionCreate() {
    yield takeEvery(SUBMISSION_CREATE, action => {
        mixpanel.track(events.submission.create.eventName, action.value)
    })
}

function* watchSubmissionEdit() {
    yield takeEvery(SUBMISSION_EDIT, action => {
        mixpanel.track(events.submission.edit.eventName, action.value)
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
        fork(watchUserLogout),
    ])
}