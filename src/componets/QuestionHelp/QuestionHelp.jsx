import "./QuestionHelp.css"

// HelpQuestion.js
import React from 'react';

function HelpQuestion({ question, answer }) {
  return (
    <div className="question-help">
      <h6>{question}</h6>
      <p>{answer}</p>
    </div>
  );
}

export default HelpQuestion;
