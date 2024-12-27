import React, { useEffect, useState } from 'react';
import { useAppDispatch } from './store/store';
import { register } from './store/features/userSlice';

const App = () => {
  const dispatch = useAppDispatch();
  //test
  useEffect(() => {
    dispatch((dispatch, getState) => {
      dispatch(register({ email: 'abc@gmail.com', password: '123456' }));
    });
  }, [dispatch]);
  return (
    <div>
      <h1>hiiiii</h1>
    </div>
  );
};

export default App;
