import produce from 'immer';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.

export const getPosts = () => ({type: GET_POSTS})
export const getPost = (id) => ({type: GET_POST, payload: IdleDeadline, meta: id})

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
};

function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts) // call은 동기적으로 함수를 처리함(call 이 끝날 때 까지 밑에줄이 실행되지 않음)
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts
    })
  } catch(e) {
    yield put({
      type: GET_POST_ERROR,
      error: true,
      payload: e
    })
  }
}


function* getPostSaga(action) {
  const param = action.payload
  const id = action.meta

  try {
    const post = yield call(postsAPI.getPostById, param) // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩
    // saga put: 특정 액션을 dispatch
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id
    })
  } catch(e) {
    yield put({
      type: GET_POSTS_ERROR,
      error: true,
      payload: e,
      meta: id
    })
  }
}

export function* postSaga() {
  // saga takeEvery : 들어오는 모든 액션에 대해 특정 작업을 처리해줌
  yield takeEvery(GET_POSTS, getPostsSaga)
  yield takeEvery(GET_POST, getPostSaga)
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
      return produce(state, draft => { // immer를 사용해서 데이터 불변성 유지하기!!
        draft.payload = action.payload
      })
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
    default:
      return state;
  }
}