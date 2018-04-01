import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBntJVZJU-Qvnmk6KTiRISRojGeqj3DuX4",
  authDomain: "tunite-3a985.firebaseapp.com",
  databaseURL: "https://tunite-3a985.firebaseio.com",
  projectId: "tunite-3a985",
  storageBucket: "tunite-3a985.appspot.com",
  messagingSenderId: "208605072574"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
