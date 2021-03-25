import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getSampleResponse } from './utils/apiWrapper';

const App = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const getTime = async () => {
      const time = await getSampleResponse();
      if (!time.error) {
        setTime(time.data.time);
      }
    };

    getTime();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {time}</p>
      </header>
    </div>
  );
}

export default App;
