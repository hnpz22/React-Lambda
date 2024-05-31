import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await Auth.signIn(email, password);
      alert('Sign-in successful!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignIn;