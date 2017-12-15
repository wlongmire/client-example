import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { APP_INITIALIZED } from '../constants/app'
import config from 'config'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants/user'
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

const events = {
    auth: {
        login: 'Authentication: Logged in',
        logout: 'Authentication: Logged out'
    },
    submission: {
        new: 'Submission: New',
        clearance: {
            pass: 'Submission: Pass Clearance',
            fail: 'Submission: Fail Clearance',
            pending: 'Submission: Pending Clearance'
        },
        quote: 'Submission: Quote',
        nonQuote: 'Submission: Non Quote',
        error: 'Submission: Error Quote/Knockout',
        create: 'Submission: Created',
        edit: 'Submission: Editing'
    },
    onboarding: {
        referralInvite: 'Referral: Invite',
        referralInviteAccept: 'Referral: Invite Accept',
        referralInviteCancel: 'Referral: Invite Cancel'
    }
}

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

function* watchForUserLogin() {
    yield takeEvery(USER_LOGGED_IN, action => {
        configureMixPanel(action.payload)
        mixpanel.track(events.auth.login)
    })
}

function* watchForUserLogout() {
    yield takeEvery(USER_LOGGED_OUT, action => {})
}

function* watchForAppInitialized() {
    yield takeEvery(APP_INITIALIZED, action => configureMixPanel(action.value))
}

function* watchForSubmissionClearancePassed() {
    yield takeEvery(SUBMISSION_CLEARANCE_PASSED, action => {
        const { submissionType } = action.value
        mixpanel.track(events.submission.clearance.pass, {
            Type: action.value.submisionType
        })
    })
}

function* watchForSubmissionClearanceFailed() {
    yield takeEvery(SUBMISSION_CLEARANCE_FAILED, action => {
        const { submissionType, matches } = action.value
        mixpanel.track(events.submission.clearance.fail, {
            Type: submissionType,
            Matches: matches
        })
    })
}

function* watchForSubmissionClearancePending() {
    yield takeEvery(SUBMISSION_CLEARANCE_PENDING, action => {
        const { submissionType, matches } = action.value
        mixpanel.track(events.submission.clearance.pending, {
            Type: submissionType,
            Matches: matches
        })
    })
}

function* watchForSubmissionQuoted() {
    yield takeEvery(events.submission.quote, action => mixpanel.track(SUBMISSION_QUOTE_EVENT, action.value))
}

function* watchForSubmissionKnockedOut() { 
    yield takeEvery(events.submission.nonQuote, action => mixpanel.track(SUBMISSION_NON_QUOTE_EVENT, action.value))
}

function* watchForSubmissionFailed() {
    yield takeEvery(events.submission.clearance.fail, action => mixpanel.track(SUBMISSION_ERROR_EVENT, action.value))
}

function* watchForSubmissionCreate() {
    yield takeEvery(events.submission.create, action => mixpanel.track(SUBMISSION_CREATE_EVENT, action.value))
}

function* watchForSubmissionEdit() {
    yield takeEvery(events.submission.edit, action => mixpanel.track(SUBMISSION_EDIT_EVENT, action.value))
}

export default function* root() {
    yield all([
        fork(watchForAppInitialized),
        fork(watchForSubmissionClearancePassed),
        fork(watchForSubmissionClearanceFailed),
        fork(watchForSubmissionClearancePending),
        fork(watchForSubmissionFailed),
        fork(watchForSubmissionKnockedOut),
        fork(watchForSubmissionQuoted),
        fork(watchForUserLogin),
        fork(watchForUserLogout)
    ])
}