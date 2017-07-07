import mixPanelEvents from './events.json';
import config from '../../../config'

export default {
  customEvent(eventCategory, eventType, params, register) {
    try {
      mixpanel.track(
       mixPanelEvents[eventCategory][eventType].eventName,
        { ...params,
          Environment: config.mixPanelEnvironment
        }
      )

      register && mixpanel.register(register)
    } catch (e) {
      const errorMessage = `Mixpanel event ${eventCategory}:${eventType} not found.`

      console.error(errorMessage)
      alert(errorMessage)
    }
  }
}