import { call, put, takeLatest } from 'redux-saga/effects';

import { meApi } from '@/core/api/me.api';

import { userActions } from './index';

function* getCurrentUser(): any {
    try {
        const user = yield call(meApi.v1Get);

        yield put(userActions.setUser({ ...user }));
    } catch (error) {
        yield put(userActions.setLoginFailed());
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.setToken, getCurrentUser);
}
