import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer as HotLoader} from 'react-hot-loader';
import {HashRouter as Router, Route} from 'react-router-dom';

import App from './components/App';

const renderApp = () => {
  ReactDOM.render(
    <HotLoader>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </HotLoader>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/App', renderApp);
}