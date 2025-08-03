import React, { useRef, useState } from 'react'
import './quiz.css'
import {data} from '../../assets/data'

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_arr = [option1, option2, option3, option4];

  const next = () => {
    if(index === data.length - 1) {
      setResult(true);
      return 0;
    }
    if(lock === true) {
      setIndex(++index);
      setQuestion(data[index])
      setLock(false);
      option_arr.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      })
    }
  }

  const checkAns = (e, ans) => {
    if(lock === false) {
      if(question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(score + 1);
      }
      else {
        e.target.classList.add("wrong");
        setLock(true);
        option_arr[question.ans - 1].current.classList.add("correct");
      }
    } 
  }

  const restart = () => {
    setIndex(0);
    setLock(false);
    setScore(0);
    setResult(false);
  }

  return (
    <div className='container'>
      <h1>React Quiz</h1>
      <hr />
      {result ? <>
        
      </> : 
      <>
        <h2>{index + 1}. {question.question}</h2>
        <ul>
          <li ref={option1} onClick={(e) => {checkAns(e, 1)}}>{question.option1}</li>
          <li ref={option2} onClick={(e) => {checkAns(e, 2)}}>{question.option2}</li>
          <li ref={option3} onClick={(e) => {checkAns(e, 3)}}>{question.option3}</li>
          <li ref={option4} onClick={(e) => {checkAns(e, 4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>next</button>
        <div className='index'>{index + 1} of {data.length} Questions</div>
      </>
      }
      {result ? 
      <>
        <h3>Your Score is {score} out of {data.length}</h3>
        <button onClick={restart}>Restart</button>
      </>
        : 
      <></>
      }
    </div>
  )
}

export default Quiz