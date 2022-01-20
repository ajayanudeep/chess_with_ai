import Chessboard from './components/Chessboard';
import './App.css';
import Start from './components/Start';
import { BrowserRouter,Route } from 'react-router-dom';
import React from 'react';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/"><Start /></Route> 
        <Route path="/game"><Chessboard /></Route>
      {/* <Start></Start>
      <Chessboard /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
