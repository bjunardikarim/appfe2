import axios from "axios"
import { del, get, post, put, getWithParam } from "./api_helper"

// get tasks
export const getData = req => post("/app001/get-all", req) 

export const getDataImage = req => getWithParam("/app001/get-file-image", req)

export const uploadData = req => post("/app001/upload", req)

