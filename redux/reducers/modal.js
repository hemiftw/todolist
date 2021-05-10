import { STORE_MODAL_STATE } from "../actionTypes";
const modalState = (state = {status:true}, action) => {
  switch (action.type) {
    case STORE_MODAL_STATE:
       return {
        status:action.modalState,
      };

    default:
      return state;
  }
};

export default modalState;
