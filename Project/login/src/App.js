import './App.css';
import React, { useState } from 'react';
	
const App = () => {
  
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	

const login = () => {
	

}
	

return (
    <div class="container" className='login'>
      <form onSubmit={login}>
        <h1>Spotify Data Visualization</h1>

        <br></br>

        <label id='label' for='username'><b>Username</b></label>
        <input id='box' type='text' value={username} onChange={(e) => setUsername(e.target.value)}
         placeholder='Enter Username' name='username' required/>
	        
        <label for='username'><b>Password</b></label>
        <input id='box' type='text' value={password} onChange={(e) => setPassword(e.target.value)}
         placeholder='Enter Password' name='password' required/>
	        
        <button type='submit'>Sign In</button>

        <label id='label' for='remember'><b>Remember Me</b></label>
        <input type='checkbox' name='remember'/>
      </form>
    </div>
	)
}
	

export default App;