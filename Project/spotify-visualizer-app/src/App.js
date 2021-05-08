import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Bar, Pie, Line } from 'react-chartjs-2';

//data for horizontal bar chart #1
const bardata1 = {
  labels: [],
  datasets: [
    {
      label: '#',
      data: [],
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
      text: 'Sample bar chart',
    },
  },
};

//data for pie chart #1
const piedata1= {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [],
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
    },
  ],
};

//options for pie chart #1
const pieoptions1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Sample pie chart',
    },
  },
};

//data for horizontal bar chart #2
const bardata2 = {
  labels: [],
  datasets: [
    {
      label: '#',
      data: [],
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
      text: 'Sample bar chart',
    },
  },
};

//data for pie chart #2
const piedata2= {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: [],
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
    },
  ],
};

//options for pie chart #2
const pieoptions2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Sample pie chart',
    },
  },
};

const App = () => {  
  const [recent_artists, setRArtists] = useState(0);
  const [recent_played, setRPlayed] = useState(0);
  const [top_artists, setTArtists] = useState(0);

  useEffect(() => {
    const requestOptions = {
        mode: 'no-cors',
        method: 'GET',
    };
    fetch('http://localhost:8888/api/get_recently_added_artists', requestOptions).then(res => res.json()).then(data => {
      setRArtists(recent_artists);
    });
    fetch('http://localhost:8888/api/get_recently_played', requestOptions).then(res => res.json()).then(data => {
      setRPlayed(recent_played);
    });
    fetch('http://localhost:8888/api/get_top_artists', requestOptions).then(res => res.json()).then(data => {
      setTArtists(top_artists);
    });
  }, []);



  //visualization page
  const Visualization = ({history}) => (
    <div>

  //visualization page
  const Visualization = ({history}) => (
    <div>
      <h1>This is a sample data visualization page</h1>

      <br></br>
      <button className="go-home" onClick={() => history.push('/')}>Home</button>
      <a href="https://github.com/CS196Illinois/Group-12-SP21">
        <button className="github">GitHub</button>
      </a>
      <h1>This is a sample data visualization page</h1>
      <br></br>
      <div className="chart-container">
        <article className="horizontalbar-container">
          <Bar data={bardata1} options={baroptions1}/>
        </article>
        <article className="pie-container">
          <Pie data={piedata1} options={pieoptions1}/>
        </article>
        <article className="horizontalbar-container">
          <Bar data={bardata2} options={baroptions2}/>
        </article>
        <article className="pie-container">
          <Pie data={piedata2} options={pieoptions2}/>
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