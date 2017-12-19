import {
    SIGNUP_NEW_PASSWORD_INITIALIZED,
    SIGNUP_NEW_PASSWORD_SAVED,
    SIGNUP_PROFILE_INITIALIZED,
    SIGNUP_PROFILE_SAVED
} from '../constants/signup'

export function newPasswordInitialized(email) {
    return {
        type: SIGNUP_NEW_PASSWORD_INITIALIZED,
        value: email
    }
}

export function newPasswordSaved(email) {
    return {
        type: SIGNUP_NEW_PASSWORD_SAVED,
        value: email
    }
}

export function profileInitialized(email) {
    return {
        type: SIGNUP_PROFILE_INITIALIZED,
        value: email
    }
}

export function profileSaved(email) {
    return {
        type: SIGNUP_PROFILE_SAVED,
        value: email
    }
}