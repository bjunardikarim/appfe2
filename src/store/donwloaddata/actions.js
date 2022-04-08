import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR,
    GET_DATA_IMAGE,
    RESET_DONWLOAD,
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

  export const getDataImage = (req) => ({
    type: GET_DATA_IMAGE,
    payload: { req },
  })

  export const resetDonwload = error => {
    return {
      type: RESET_DONWLOAD,
    }
  }