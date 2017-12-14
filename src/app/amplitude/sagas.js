import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { APP_INITIALIZED } from '../constants/app'
import config from 'config'
import capitalize from 'lodash/capitalize'

import { USER_LOGGED_IN } from '../constants/user'

import {
    SUBMISSION_CLEARANCE_PASSED,
    SUBMISSION_CLEARANCE_FAILED,
    SUBMISSION_CLEARANCE_PENDING,
    SUBMISSION_KNOCKED_OUT,
    SUBMISSION_FAILED,
    SUBMISSION_CREATE,
    SUBMISSION_EDIT,
    SUBMISSION_CREATE_SUCCESS,
    SUBMISSION_EDIT_SUCCESS
} from '../constants/submission'

const events = {
    auth: {
        login: 'Authentication: Login',
        logout: 'Authentication: Logout',
        resetPassword: 'Authentication: Reset Password'
    },
    submission: {
        new: 'Submission: New',
        clearance: 'Submission: Clearance',
        submit: 'Submission: Submit',
        edit: 'Submission: Edit'
    },
    onboarding: {
        referralInvite: 'Referral: Invite',
        referralInviteAccept: 'Referral: Invite Accept',
        referralInviteCancel: 'Referral: Invite Cancel'
    }
}

const configureAmplitude = ({
    brokerName,
    username,
    email,
    role,
    brokerId,
    id
}) => {
    const userProperties = {
        User: {
            Email: email,
            BrokerageName: brokerName,
            BrokerId: brokerId,
            Role: role
        },
        Session: {
            Environment: config.env // TODO: change to env variable
        }        
    }
    amplitude.getInstance().setUserProperties(userProperties)
}

function* watchForSubmissionCreateSuccess() {
    yield takeEvery(SUBMISSION_CREATE_SUCCESS, action => {
        const eventData = transformSubmissionToEventData(action.value)
        amplitude.getInstance().logEvent(events.submission.new, eventData)
    })
}

function* watchForSubmissionEditSuccess() {
    yield takeEvery(SUBMISSION_EDIT_SUCCESS, action => {
        const eventData = transformSubmissionToEventData(action.value)
        amplitude.getInstance().logEvent(events.submission.edit, eventData)
    })
}

function* watchForSubmissionClearancePassed() {
    yield takeEvery(SUBMISSION_CLEARANCE_PASSED, action => {
        const { submissionType } = action.value
        const eventData = {
            Product: submissionType ? submissionType.toUpperCase() : '',
            ClearanceStatus: 'Pass' 
        }
        amplitude.getInstance().logEvent(events.submission.clearance, eventData)
    })
}

function* watchForSubmissionClearanceFailed() {
    yield takeEvery(SUBMISSION_CLEARANCE_FAILED, action => {
        const { submissionType, matches } = action.value
        const eventData = {
            Product: submissionType ? submissionType.toUpperCase() : '',
            ClearanceStatus: 'Fail',
            Matches: transformMatches(matches)
        }
        amplitude.getInstance().logEvent(events.submission.clearance, eventData)
    })
}

function* watchForSubmissionClearancePending() {
    yield takeEvery(SUBMISSION_CLEARANCE_PENDING, action => {
        const { submissionType, matches } = action.value
        const eventData = {
            Product: submissionType ? submissionType.toUpperCase() : '',
            ClearanceStatus: 'Pending',
            Matches: transformMatches(matches)
        }
        amplitude.getInstance().logEvent(events.submission.clearance, eventData)
    })
}

function* watchForUserLogin() {
    yield takeEvery(USER_LOGGED_IN, action => {
        configureAmplitude(action.payload)
        const eventData = { Email: action.payload.email }
        amplitude.getInstance().logEvent(events.auth.login, eventData)
    })
}

/**
 * Transforms submission data into an amplitude submission event
 * @param {*} submission The submission to transform
 * @returns {object} 
 */
const transformSubmissionToEventData = submission => {
    if (!submission) 
        return {}

    const rating = submission.rating[submission.type]
    const { 
        additionalCoverage,
        anticipatedProjectLength,
        excessPremium,
        excessTerrorPremium,
        instantQuote,
        premium,
        rate,
        terrorPremium,
        totalExcessPremium,
        totalPremium
    } = rating

    return {
        SubmissionId: submission.id,
        SubmissionStatus: 'new',
        ClearanceStatus: submission.clearanceStatus ? capitalize(submission.clearanceStatus) : '',
        Type: submission.type ? submission.type.toUpperCase() : '',
        Outcome: instantQuote ? 'Quoted' : 'Referral',
        AdditionalCoverage: additionalCoverage,
        AnticipatedProjectLength: anticipatedProjectLength,
        ExcessPremium: excessPremium,
        ExcessTerrorPremium: excessTerrorPremium,
        InstantQuote: instantQuote,
        Premium: premium,
        Rate: rate,
        TerrorPremium: terrorPremium,
        TotalExcessPremium: totalExcessPremium,
        TotalPremium: totalPremium,
        NamedInsured: submission.primaryInsuredName,
        ProjectAddressState: submission.projectAddress.projectState,
        ReferralReasons: rating.reason ? rating.reason : []
    }
}

/**
 * Amplitude only supports primitive types as nested items in arrays.
 * 
 * As a workaround, this function converts the matches to an object with the index
 * of the match being the key:
 * 
 * ex: [{name: '', address: '', ...}] => { '0': {name: '', address: ''}, '1': {...}}
 * @param {*} matches 
 * @returns {array} array of transformed matches
 */
function transformMatches(matches) {
    return matches.reduce((prev, curr, idx) => {
        prev[idx.toString()] = curr
        return prev
    }, {})
}

export default function* root() {
    yield all([
        fork(watchForUserLogin),
        fork(watchForSubmissionCreateSuccess),
        fork(watchForSubmissionEditSuccess),
        fork(watchForSubmissionClearancePassed),
        fork(watchForSubmissionClearanceFailed),
        fork(watchForSubmissionClearancePending)
    ])
}