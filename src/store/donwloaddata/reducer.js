import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR,
    GET_DATA_IMAGE,
    RESET_DONWLOAD
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

        case GET_DATA_IMAGE:
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
      case RESET_DONWLOAD :
        return {
           ...state, 
           error: action.payload,
        }
  
      default:
        return state
    }
  }
  
  export default getData