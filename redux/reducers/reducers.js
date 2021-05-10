import { combineReducers } from 'redux';
import   tasks   from './tasks';
import   modalState   from './modal';

export default combineReducers({
  tasks,
  modalState
});