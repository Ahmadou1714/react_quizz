import React from 'react';

export default function Option({ option, dispatch, answer, question }) {
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {option.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswer
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() =>
            dispatch({
              type: 'newAnswer',
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
