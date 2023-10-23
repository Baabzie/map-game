import React from 'react';

// Define the prop type for the Question component
interface QuestionProps {
  questionLocation: { latitude: number | null; longitude: number | null; questionSwe: string | null; };
}

function Question(props: QuestionProps) {

  const questionLocation = props.questionLocation;

  if (questionLocation.questionSwe) {
    return (
      <div>
        <div className='question-div'>
          <p>En plats 0-2 km bort:</p>
          <p>{questionLocation.questionSwe}</p>
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