import React from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList';
import FilterPannel from './components/FilterPannel/FilterPannel'

function App() {
  return (
    <div className="App">
      <ItemsList />
      <FilterPannel />
    </div>
  );
}

export default App;
