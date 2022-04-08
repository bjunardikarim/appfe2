import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      try {
        if(user.email == "adminpoc@gmail.com" && user.password == "1234"){
          localStorage.setItem("authUser", JSON.stringify("Wh3OyLBmjv7UcF93VSEU/cztR8aoeEE9bFrzeRkdEe+"))
          //yield put(loginSuccess(response))
          history.push("/dashboard")
        }else{
          yield put(apiError("Username and password are invalid. Please enter correct username and password"))
        }
        
      } catch (e) {
        console.log(e.message)
      }
      // const response = yield call(postFakeLogin, {
      //   email: user.email,
      //   password: user.password,
      // });

      // localStorage.setItem("authUser", JSON.stringify(response));
      // yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
