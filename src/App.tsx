import React,{useState} from 'react';
import { QuestionCard } from './components/QuestionCard';
import {fetchQuestions,Difficulty,QuestionState} from './API'; 
import { GlobalStyle, Wrapper } from './App.style';
import firebase from './firebase';

const TOTAL_QUESTIONS = 10;


function App() {
  const messaging = firebase.messaging();
    messaging.requestPermission().then(() => {
        return messaging.getToken();
    }).then((token) => {
        console.log("token", token)

    })

  type AnswerObject ={
    questions:string,
    answer:string,
    correct:boolean,
    correctAnswer:string
  }

  const[loading,setLoading] = useState(false);
  const[questions,setQuestions] = useState<QuestionState[]>([]);
  const[number,setNumber] = useState(0);
  const[userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const[score,setScore] = useState(0);
  const[gameOver,setGameOver] = useState(true);
  console.log(questions)

  const startQuiz=async()=>{
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS,Difficulty.EASY)
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    
  }
  const nextQuestion=async()=>{
    const nextQuestion = number+1;
    if(nextQuestion===TOTAL_QUESTIONS){
      setGameOver(true);

    }else{
      setNumber(nextQuestion);
    }
    
  }
  const checkAnswer=(e:React.MouseEvent<HTMLButtonElement>)=>{
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
    if(correct) setScore(prev=>prev+1);
    const answerObject = {
      questions:questions[number].question,
      answer,
      correct,
      correctAnswer:questions[number].correct_answer
    }
    setUserAnswers(prev =>[...prev,answerObject]);
  }
  };
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
     <h1>Quiz App By Syed Aashir Majeed</h1>
     {gameOver|| userAnswers.length ===TOTAL_QUESTIONS ?(
     <button className="start" onClick={startQuiz}>Begin Quiz</button>):
     null}
     {!gameOver?(
     <p className="score">Score: {score} </p>):null}
     {loading?(
     <p>Loading</p>):null}
     { !loading && !gameOver ?( 
     <QuestionCard 
     
      questionNumber={number+1}
      totalQuestons={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers?userAnswers[number]:undefined}
      callback={checkAnswer}
     />):null}
     {!gameOver && !loading && userAnswers.length ===number+1 && number !== TOTAL_QUESTIONS -1 ?(
     <button className="next" onClick={nextQuestion}>Next Question</button>):null}
    </Wrapper>
    </>
  );
}

export default App;
