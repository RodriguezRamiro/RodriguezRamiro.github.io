import React from 'react';
import ReactDOM from 'react-dom';
import '/index.css';
import App from '/App';
import * as serviceWorker from '/ServiceWorker';
import BlackjackGame from '/BlackJackGame';


ReactDOM.render(
  <React.StrictMode>
    <BlackjackGame />
  </React.StrictMode>,
  document.getElementById('react-blackjack') // Point to the div in your HTML file
);
// ReactDOM.render(<App />, document.getElementById('root'));


// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
