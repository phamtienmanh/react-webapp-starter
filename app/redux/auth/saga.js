import { all, takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../utils/helpers/utility';
import actions from './actions';
import Config from '../../config';
import ApiService from '../../utils/apiService';

export function* doLogin(action) {
  try {
    const res = yield call(login, action.payload);

    if (res.status) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        access_token: res.token,
        refresh_token: res.refreshToken,
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR, message: res.message });
    }
  } catch (e) {
    yield put({ type: actions.LOGIN_ERROR, message: e.message });
  }
}

export function* loginSuccess(state) {
  yield localStorage.setItem('access_token', state.access_token);
  yield localStorage.setItem('refresh_token', state.refresh_token);
  yield put({
    type: actions.SET_TOKEN_SUCCESS,
    isLoggedIn: true,
  });
}

export function* loginError({ message }) {
  console.log('loginError', message);
}

export function* logout() {
  clearToken();
  yield put(push('/'));
}

export default function* rootSaga() {
  yield all([
    yield takeEvery('LOGIN_REQUEST', doLogin),
    yield takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    yield takeEvery(actions.LOGIN_ERROR, loginError),
    yield takeEvery(actions.LOGOUT, logout),
  ]);
}

const login = (body) => ApiService.post('api/auth/login', body)
  .then((response) => response.data)
  .catch((err) => {
    throw err;
  });
