import { CognitoUserPool } from 'amazon-cognito-identity-js';

import CognitoService from './service';

export default function Cognito(config) {
  const pool = new CognitoUserPool({
    UserPoolId: config.pool_id,
    ClientId: config.client_id,
  });
  const user = pool.getCurrentUser()
  return new Promise((resolve, reject) => {
    if (user === null) return resolve(new CognitoService(pool, null, null));
    return user.getSession((error, session) => {
      return resolve(new CognitoService(pool, user, session));
    })
  })
}