import { all, fork, put } from 'redux-saga/effects'
import amplitudeInstrumentationSaga from './amplitude/sagas'
import mixpanelInstrumentationSaga from './mixpanel/sagas'
import { appInitialized } from './actions/appActions'

export default function* root(initialState) {
    yield all([
        fork(amplitudeInstrumentationSaga),
        fork(mixpanelInstrumentationSaga),
        put(appInitialized(initialState))
    ])
}