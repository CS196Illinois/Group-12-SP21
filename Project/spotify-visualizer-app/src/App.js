import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';

//options for horizontal bar chart #1
const baroptions1 = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Popularity Value of Listened Artists',
    },
  },
};

//options for horizontal bar chart #2
const baroptions2 = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Top Tracks by Popularity',
    },
  },
};

//data for pie chart #2


const App = () => {  
  //const [recent_artists, setRArtists] = useState(0);
  //const [recent_played, setRPlayed] = useState(0);
  //const [top_artists, setTArtists] = useState(0);
  const [bardata1_data, setBardata1_data] = useState([]);
  const [bardata1_labels, setBardata1_labels] = useState([]);
  const [bardata2_data, setBardata2_data] =useState([]);
  const [bardata2_labels, setBardata2_labels] =useState([]);

  useEffect(() => {
    const requestOptions = {
        mode: 'no-cors',
        method:'GET',
        headers: {"Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": {"Origin": "X-Requested-With", "Content-Type": "Accept"},
                  'Content-Type': 'application/json'}
    };    
    fetch('/api/get_recently_added_artists', requestOptions)
      .then(res => res.json()).then(data => {
          //console.log(Object.keys(data))
    });
    fetch('/api/get_recently_played', requestOptions)
      .then(res => res.json()).then(data => {
          //console.log({recent_played},data)
    });
    fetch('/api/get_top_tracks', requestOptions)
      .then(res => res.json()).then(data => {
          console.log(data)
          setBardata2_data(Object.values(data))
          setBardata2_labels(Object.keys(data))
      });
    fetch('/api/get_top_artists', requestOptions)
      .then(res => res.json()).then(data => {
          setBardata1_data(Object.values(data))
          setBardata1_labels(Object.keys(data))
    });
  }, []);
  const bardata1 = {
    labels: bardata1_labels,
    datasets: [
      {
        label: 'Artists',
        data: bardata1_data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }


    const bardata2 = {
    labels: bardata2_labels,
    datasets: [
      {
        label: 'Tracks',
        data: bardata2_data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  //visualization page
  const Visualization = ({history}) => (
    <div>
      <button className="go-home" onClick={() => history.push('/')}>Home</button>
      <button className="logout" onClick={() => history.push('/logout')}>Logout</button>
      <a href="https://github.com/CS196Illinois/Group-12-SP21">
        <button className="github">GitHub</button>
      </a>
      <h1></h1>
      <br></br>
      <div className="chart-container">
        <article className="horizontalbar-container">
          <Bar data={bardata1} options={baroptions1}/>
        </article>
        <article className="horizontalbar-container">
          <Bar data={bardata2} options={baroptions2}/>
        </article>
      </div>
    </div>
  );

  //Sign in page with routing
  return (
    <div>
      <Router>
        <main>
          <Switch>
            <Route path="/" exact render={() =>
              <div className='container'>
                <h1>Spotify Data Visualizer</h1>

                <br></br>

                <nav>
                  <a href={`/user/`}><button id='button'>Sign In With Spotify</button></a>
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