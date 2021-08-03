import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(() => {}, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

if (window.Cypress) {
  window.store = store;
}

export default store;
