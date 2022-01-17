import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../moules/counter';

function CounterContainer() {
  const number = useSelector(state => state.counter.number)
  const dispatch = useDispatch()

  const onIncrease = () => {
    dispatch(increase())
  }

  const onDecrease = () => {
    dispatch(decrease())
  }

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
}

export default CounterContainer