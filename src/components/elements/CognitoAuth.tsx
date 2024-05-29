import { CognitoAuthConfig } from '../elements/CognitoInterface';

const cognitoAuth: CognitoAuthConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_LpuMyywK9',
    userPoolWebClientId: '6q0n4an6a5et39gno7d8jf480n',
    oauth: {
      domain: 'legal-management.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code'
    }
  }
};

export default cognitoAuth;
