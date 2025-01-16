import React, { useEffect, useReducer } from 'react';
import Error from '../Error';
import Header from '../Header';
import Loader from '../Loader';
import Main from '../Main';
import Question from '../Question';
import StartScreen from '../StartScreen';

const initialState = {
  question: [],

  // Statue de l'application ('loading', 'error', 'ready', 'active', 'finished')
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        question: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer':
      const question = state.question.at(state.index); // Récupère la question actuelle (index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + 1
            : state.points,
      };

    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [{ question, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = question.length;

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />} {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'acti ve' && (
          <Question
            question={question[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
