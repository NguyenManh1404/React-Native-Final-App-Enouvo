import { createStore, combineReducers } from 'redux';
import centreReducer from '../../reducers/CentreReducer';
const rootReducer = combineReducers({
  data: centreReducer,
  detail: centreReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
