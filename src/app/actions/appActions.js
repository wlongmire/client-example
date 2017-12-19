
import { APP_INITIALIZED } from '../constants/app'

export const appInitialized = (preloadedState) => {
    return {
        type: APP_INITIALIZED,
        value: preloadedState
    }
}