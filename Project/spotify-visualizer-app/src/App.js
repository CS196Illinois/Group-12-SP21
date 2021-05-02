import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';

//data for barchart
const bardata = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '#',
      data: [12, 19, 3, 5, 2, 3],
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

//options for barchart
const baroptions = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
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

//data for piechart
const piedata= {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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

const App = () => {  

  //visualization page
  const Visualization = ({history}) => (
    <div>
      <h1>Hi!</h1>
      <button onClick={() => history.push('/')}>Go to home</button>
      <div>
        <Bar data={bardata} options={baroptions}/>
        <Pie data={piedata}/>
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
                <h1>Spotify Data Visualization</h1>

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
