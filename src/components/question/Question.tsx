import React from 'react';

// Define the prop type for the Question component
interface QuestionProps {
  questionLocation: {
    latitude: number | null;
    longitude: number | null;
    questionSwe: string | null;
  };
  handleCorrectLocation: () => void;
  eraseActiveQuestion: () => void;
}

function Question(props: QuestionProps) {

  const questionLocation = props.questionLocation;
  const handleCorrectLocation = props.handleCorrectLocation;
  const eraseActiveQuestion = props.eraseActiveQuestion;

  if (questionLocation.questionSwe) {
    return (
      <div>
        <div className='question-div'>
          <p>{questionLocation.questionSwe}</p>
          <div className="btn-div">
            <button onClick={() => { handleCorrectLocation() }}>Är jag rätt?</button>
            <button className='new-question-btn' onClick={() => { eraseActiveQuestion() }}>Ny fråga</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='question-div'>
          <p>Hittade ingen plats 0-2km bort.</p>
        </div>
      </div>
    );
  }
}

export default Question;