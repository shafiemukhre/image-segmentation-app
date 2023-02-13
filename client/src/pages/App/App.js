import React from 'react';
import Layout from '../../components/Layout/Layout'
import './App.css';
//create indexedDB database at start
import '../../services/Database/Database';

function App() {
  return (
    <div className="App">
      <Layout/>
    </div>
  );
}

export default App;
