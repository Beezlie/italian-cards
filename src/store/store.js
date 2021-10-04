import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { updateUsername } from './actions/UserActions';
import rootReducer from './reducers';

const saveAuthData = store => next => action => {
    if (action.type === 'LOG_IN') {
        const { username } = action.payload;
        updateUsername({ username });
    }

    // continue processing this action
    return next(action);
};

const middlewareEnhancer = applyMiddleware(logger, saveAuthData);

export default function configureStore() {
    const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
    return store;
}