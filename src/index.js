import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './moules';
import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import createSagaMiddleware from '@redux-saga/core';
const customHistory = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk,
      sagaMiddleware,
      logger
    )
  )
); // 여러개의 미들웨어를 적용 할 수 있습니다.
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  // <Router history={customHistory}>
  // </Router>,
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
