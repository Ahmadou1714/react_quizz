import React from 'react';
import Option from './components/Option';

export default function Question({ question, dispatch, answer }) {
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Option
        option={question.options}
        dispatch={dispatch}
        answer={answer}
        hasAnswer={answer !== null}
        question={question}
      />
    </div>
  );
}
