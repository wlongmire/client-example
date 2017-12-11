
import { APP_INITIALIZED } from '../constants/app'

/**
 * Application Initialized event action generator
 * @param {*} preloadedState - initial application state
 */
export const appInitialized = (preloadedState) => {
    return {
        type: APP_INITIALIZED,
        value: preloadedState
    }
}