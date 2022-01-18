import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, decreaseAsync, increase, increaseAsync } from '../moules/counter';
import { getPosts } from '../moules/posts';

function CounterContainer() {
  const number = useSelector(state => state.counter);
  const posts = useSelector((state) => state.post.payload)

  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  const getPostss = () => {
    dispatch(getPosts())
  }

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} getPosts={getPostss} posts={posts}/>
}

export default CounterContainer