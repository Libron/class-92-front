import React from 'react';
import './App.css';
import Auth from "./containers/Auth/Auth";
import Chat from "./containers/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Auth/>

      <Chat/>
    </div>
  );
}

export default App;