/* import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
  } from "./actionTypes"

  export const getData = req => ({
    type: GET_DATA,
    payload: req,
  })
  
  export const getDataSuccess = resp => ({
    type: GET_DATA_SUCCESS,
    payload: resp,
  })
  
  export const getDataFail = error => ({
    type: GET_DATA_ERROR,
    payload: error,
  })
 */

import {
  GET_POSTS,
  ADD_POST
} from "./actionTypes";

export const getPosts = () => {
  return {
    type: GET_POSTS,
  };
};
export const addPost = (data) => {
  return {
    type: ADD_POST, payload: data
  };
};