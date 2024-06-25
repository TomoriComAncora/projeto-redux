import { all, takeEvery, call, put, delay, takeLatest} from "redux-saga/effects";
import {fetchUsersSucesso, fetchUsersFalha, fetchUserByIdSucesso, fetchUserByIdFalha} from "./slice"
import axios from "axios";
//https://jsonplaceholder.typicode.com/users

function* fetchUsers() {
  try{
    yield delay(2000)
    const resp = yield call(axios.get, "https://jsonplaceholder.typicode.com/users");
    yield put(fetchUsersSucesso(resp.data));
  }catch(err){
    yield put(fetchUsersFalha(err.message));
  }
}

function* fetchUserById(action){
  try{
    const id = action.payload;
    const resp = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${id}`);
    yield put(fetchUserByIdSucesso(resp.data));
  }catch(err){
    yield put(fetchUserByIdFalha(err.message))
  }
}

export default all([
    takeLatest("user/fetchUsers", fetchUsers),
    takeEvery("user/fetchUserById", fetchUserById)
])