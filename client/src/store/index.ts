import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';

import createRootReducer from './reducers';
import { IS_DEV_CLIENT } from '../util/constants';

export const history = createHashHistory();

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  if (IS_DEV_CLIENT) {
    const store = createStore(
      createRootReducer(history), // root reducer with router state
      composeEnhancers(
        applyMiddleware(
          routerMiddleware(history), // for dispatching history actions
          ReduxThunk,
        ),
      ),
    );

    return store;
  } else {
    const store = createStore(
      createRootReducer(history), // root reducer with router state
      compose(
        applyMiddleware(
          routerMiddleware(history), // for dispatching history actions
          ReduxThunk,
        ),
      ),
    );

    return store;
  }
}
