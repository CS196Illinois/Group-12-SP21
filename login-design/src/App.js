import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {

  }

  return (
      <div className='Login'>
        <h1>Enter your username and password to login</h1>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button type="button" onClick={login}>Login</button>
      </div>
  )
}

export default App;
