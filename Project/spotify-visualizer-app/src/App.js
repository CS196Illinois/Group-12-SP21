import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {  
	const [username, setUsername] = useState('');

  const Visualization = ({history}) => (
    <div>
      <h1>Hi {username}!</h1>
      <button onClick={() => history.push('/')}>Go to home</button>
    </div>
  );

  return (
    <div>
      <Router>
        <main>
          <Switch>
            <Route path="/" exact render={() =>
              <div className='container'>
                <h1>Spotify Data Visualization</h1>

                <br></br>

                <label id='label' for='username'><b>Username</b></label>
                <input id='box' type='text' value={username} onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter Username' name='username' required/>

        
          
                <nav>
                  <a href={`/user/${username}`}><button id='button'>Sign In</button></a>
                </nav>
              </div>
            }/>
            
            <Route path="/:username" component={ Visualization }/>
          </Switch>
        </main>
      </Router>

    </div>
	  )
  }

export default App;
