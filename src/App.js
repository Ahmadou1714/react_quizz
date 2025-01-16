import React, { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  question: [],

  // Statue de l'application ('loading', 'error', 'ready', 'active', 'finished')
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        question: action.payload,
        status: 'ready',
      };
    case 'dataFailded':
      return {
        ...state,
        status: 'error',
      };

    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailded' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {console.log(state)}
        <p>{state.question.length}/15</p>
        <p>{state.status === 'ready' ? 'Questions?' : 'Loading...'}</p>
      </Main>
    </div>
  );
}
