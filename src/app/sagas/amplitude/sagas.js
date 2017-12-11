import { all, call, fork, put, takeEvery } from 'redux-saga/effects'

import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../../constants/user'

function* userLogin(action) {
    console.log('Log user login action in amplitude', action)
}

function userLogout(action) {
    console.log('Log user logout action in amplitude', action)
}

function* watchUserLogin() {
    yield takeEvery(USER_LOGGED_IN, userLogin)
}

function* watchUserLogout() {
    yield takeEvery(USER_LOGGED_OUT, userLogout)
}

export default function* root() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout)
    ])
}