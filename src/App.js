import React, { Component } from 'react';
import './App.css';
import CarCapabilityChart from './CarCapabilityChart/CarCapabilityChart.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Car Components Chart</h1>
        </header>
        <div className="App-content">
        <CarCapabilityChart/>
        </div>
      </div>
    );
  }
}

export default App;
