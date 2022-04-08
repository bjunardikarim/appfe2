import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import GetData from "./donwloaddata/reducer"


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  GetData,
})

export default rootReducer
