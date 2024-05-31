import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Amplify from 'aws-amplify';
import cognitoAuth from './components/elements/CognitoAuth';

(Amplify as any).configure(cognitoAuth);

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
} else {
  console.error('Root element not found');
}


