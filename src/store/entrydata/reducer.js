/* import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
  } from "./actionTypes"

  const INIT_STATE = {
    resp: {data: []},
    error: "",
  }

  const getData = (state = INIT_STATE, action) => {
    
    switch (action.type) {
      case GET_DATA:
        return {
          ...state,
        }

      case GET_DATA_SUCCESS:
        return {
          ...state,
          resp: action.payload,
        }
  
      case GET_DATA_ERROR:
        return {
          ...state,
          error: action.payload,
        }
  
      default:
        return state
    }
  }
  
  export default getData */

import * as actionType from "./actionTypes";

const initialState = {
  post: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionType.ADDED_POST: {
      return {
        ...state,
        post: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
}
