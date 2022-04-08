import { call, put, takeEvery, all, takeLatest, fork } from "redux-saga/effects"

// Crypto Redux States
import { GET_DATA, GET_DATA_IMAGE } from "./actionTypes"
import { getDataSuccess, getDataFail } from "./actions"

//Include Both Helper File with needed methods
import { getData, getDataImage} from "helpers/backend_helper"

function* fetchGetData({ payload: req }) {
  try {
    console.log("CALL API : ");
    const response = yield call(getData, req)
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

function* fetchGetDataImage({ payload: { req } }) {
  try {
    console.log("CALL API IMAGE");
    const response = yield call(getDataImage, {file_name: req.file_name, file_location: req.file_location })
    if(response.size != 0){
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', req.file_name);
        document.body.appendChild(link);
        console.log(link);
        link.click();
        link.parentNode.removeChild(link);
        yield put(getDataFail(""))
    }else{
      yield put(getDataFail("Error Get Image Data"))
    }
  } catch (error) {
    console.log(error);
    yield put(getDataFail("Error Get Image Data"))
  }
}


function* getDataSaga() {
    
  yield takeEvery(GET_DATA, fetchGetData)
  yield takeLatest(GET_DATA_IMAGE, fetchGetDataImage)
}

function* downloadSaga() {
  console.log('CALL SAGA RESET');
  yield all([fork(getDataSaga)])
}

export default getDataSaga
