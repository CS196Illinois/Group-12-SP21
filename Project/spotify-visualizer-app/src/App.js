import React, { useState } from 'react';
import './App.css';

const App = () => {  
	const [username, setUsername] = useState('');
	
  const login = () => { }

  return (
    <div className='container'>
      <form onSubmit={login}>
        <h1>Spotify Data Visualization</h1>

        <br></br>

        <label id='label' for='username'><b>Username</b></label>
        <input id='box' type='text' value={username} onChange={(e) => setUsername(e.target.value)}
         placeholder='Enter Username' name='username' required/>
	      
        <button id='button' type='submit'>Sign In</button>
      </form>
    </div>
	  )
  }

export default App;
