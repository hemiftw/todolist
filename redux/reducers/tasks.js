import {
    STORE_TASKS
   } from '../actionTypes';
  const tasks = (state = {}, action) => {
      switch (action.type) {
  
      case STORE_TASKS:
        return {
        
           ...action.tasks,
        };
    
      default:
        return state;
    }
  };
  
  export default tasks;
  