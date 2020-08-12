import React from 'react';
import './App.scss';
import Header from './components/Header';
import Body from './components/Body';

function App() {
  return (
    <div className="contentWrapper d-flex flex-column align-items-center">
      <div className="content">
        <Header />
      </div>
      <div className="bodyContainer">
        <Body />
      </div>
    </div>
  );
}

export default App;
