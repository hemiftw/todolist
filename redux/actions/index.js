import * as types from "../actionTypes";
export const storeTasks = tasks => ({
    type : types.STORE_TASKS ,
    tasks
})
export const storeModalState = modalState => ({
    type : types.STORE_MODAL_STATE ,
    modalState
})

