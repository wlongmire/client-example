import mixPanelEvents from './events.json';

export default {
  loginEvent (email, name, params) {
    mixpanel.identify(name);

    mixpanel.people.set(email, Object.assign({
      '$name': name,
      '$email': email,
      '$login_time': new Date(),
      params
    }));

    mixpanel.track(
      mixPanelEvents.authentication.login.eventName
    );
  },

  registrationEvent (email, params = {}) {
    mixpanel.track(
      mixPanelEvents.authentication.newAccount.eventName,
      Object.assign({ 'Email': params.email }, params)
    );
  },

  customEvent (eventCategory, eventType, params, register) {

    try {
      console.log(params)
      mixpanel.track(
       mixPanelEvents[eventCategory][eventType].eventName,
       params
      );

      register || mixpanel.register(register);

    } catch (e) {
      const error_message = `Mixpanel event ${eventCategory}:${eventType} not found.`;

      console.error(error_message);
      alert(error_message);
    }


  }
};
