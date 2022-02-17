import { render } from 'react-dom';
import { Provider } from 'jotai';

import App from './App';

import './global.scss';

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
