import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import accountReducer from '../reducer/accountReducer'
import notesReducer from '../reducer/notesReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        accountInfo: accountReducer,
        notes: notesReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore