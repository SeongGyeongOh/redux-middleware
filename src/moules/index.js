import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import post from './posts'
import { all } from 'redux-saga/effects';
import { postSaga } from './posts';

const rootReducer = combineReducers({ counter, post });
export function* rootSaga() {
  yield all([counterSaga(), postSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;

// saga에 자주 쓰이는 함수
/*
call: 함수의 동기적인 호출을 할 때 사용 - 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수 call(delay, 1000) === delay(1000)
      const res = yield call(api 호출 함수, 해당 함수의 파라미터)
      yield put(someAction({value: res})) <== 요런 형식으로 사용할 수 있음!
fork: 함수의 비동기적인 호출을 할 때 사용
put: 액션 함수(dispatch)로 진행시킬 때 사용
takeEvery: 모든 액션을 유효하게 인정
takeLatest: 마지막 액션 하나만 유효하게 인정
 */   