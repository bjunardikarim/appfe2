/* import { call, put, takeEvery, all, takeLatest, fork } from "redux-saga/effects"

// Crypto Redux States
// import { GET_DATA_SUCCESS } from "./actionTypes"
// import { getDataSuccess, getDataFail } from "./actions"
// import { uploadData } from "helpers/backend_helper";

// Include Both Helper File with needed methods
// import { getData, getDataImage} from "helpers/backend_helper"

function* fetchUploadData({ payload: req }) {
  try {
    console.log("CALL API : ");
    const response = yield call(uploadData, req)
    if(response.status == 1){
      yield put(getDataSuccess(response))
    }else{
      yield put(getDataFail("Error Get Data"))
    }
  } catch (error) {
    console.log(error);
    yield put(getDataFail("Error Get Data"))
  }
}

function* getDataSaga() {
  yield takeEvery(GET_DATA_SUCCESS, fetchUploadData)
}

function* downloadSaga() {
  console.log('CALL SAGA RESET');
  yield all([fork(getDataSaga)])
}

export default getDataSaga
 */

import { all, put, call, takeEvery } from "redux-saga/effects";
import * as actionType from "./actionTypes";

export default function* addPostSaga() {
    yield takeEvery(actionType.ADD_POST, addPost);
}

function* addPost(action) {
    console.log(action)
    try {
        const postResponse = yield call(postsblogPostApi.add, action.payload);
        yield put({ type: actionType.ADDED_POST, payload: postResponse });
    } catch (err) {
        console.log(err);
    }
}