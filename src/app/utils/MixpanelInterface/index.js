import mixPanelEvents from './events.json';

export default {
  loginEvent (name, email, params, register) {
    mixpanel.identify(name);

    mixpanel.people.set({
      '$name': name,
      '$email': email,
      '$login_time': new Date(),
      ...params
    });

    mixpanel.track(
      mixPanelEvents.authentication.login.eventName
    );

    register && mixpanel.register(register);
  },

  registrationEvent (name, email, params = {}) {
    mixpanel.track(
      mixPanelEvents.authentication.newAccount.eventName,
      Object.assign({
        'Email': email,
        'Name': name
      },
        params
      )
    );
  },

  customEvent (eventCategory, eventType, params, register) {

    try {
      mixpanel.track(
       mixPanelEvents[eventCategory][eventType].eventName,
       params
      );

      register && mixpanel.register(register);

    } catch (e) {
      const error_message = `Mixpanel event ${eventCategory}:${eventType} not found.`;

      console.error(error_message);
      alert(error_message);
    }


  }
};