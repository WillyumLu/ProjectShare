import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { startLogging } from "statezero";
import { setEmptyState } from "./actions/helpers";


// Initially set all state paths needed in app as empy
setEmptyState()
startLogging()

ReactDOM.render(<App />, document.getElementById('root'));