import React from 'react';
import logo from './logo.svg';
import './App.css';

import UserProfiles from './components/UserProfiles'
import Header from './components/Header'


function App() {
  return (
    <div className="application">
	  <Header/>
      <UserProfiles/>
    </div>
  );
}

export default App;
