import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

/* createRoot(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
); */

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App />);