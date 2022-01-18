import React, { useEffect } from 'react';

const Counter = ({number, onIncrease, onDecrease, getPosts, posts}) => {
  
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      { posts && posts.map(item => (
        <h1 key={item.id}>{item.body}</h1>
      ))}
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;