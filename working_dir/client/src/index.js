import React from 'react';
import ReactDOM from 'react-dom';
import { startLogging } from "statezero";

import App from './App';
import { setEmptyState } from "./actions/helpers";


// Initially set all state paths needed in app as empy
setEmptyState()

// displays states defined in helper.js
startLogging()

ReactDOM.render(<App />, document.getElementById('root'));