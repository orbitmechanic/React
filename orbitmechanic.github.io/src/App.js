import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Jumbotron fluid = 'true'>
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal space of its parent.
          </p>
      </Jumbotron>
      </header>
    </div>
  );
}

export default App;
