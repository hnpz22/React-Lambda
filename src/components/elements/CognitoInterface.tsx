export interface CognitoAuthConfig {
  Auth: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
    // oauth: {
    //   domain: string;
    //   scope: string[];
    //   redirectSignIn: string;
    //   redirectSignOut: string;
    //   responseType: string;
    // };
  };
}

export interface CognitoAuthConfig  {}