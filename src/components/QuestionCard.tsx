import React from 'react';
import {Wrapper,ButtonWrapper} from './QuestionCard.style';

type Props = {
    question:string,
    answers:string[],
    callback:any,
    userAnswer:any,
    questionNumber:number,
    totalQuestons:number
}

export const QuestionCard:React.FC<Props>=({question,answers,callback,userAnswer,questionNumber,totalQuestons})=>{
    return(
        <Wrapper>
            <p>
            Question:{questionNumber} / {totalQuestons}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {answers.map(answer=>(
                    <ButtonWrapper 
                        correct = {userAnswer?.correctAnswer ===answer}
                        userClicked ={userAnswer?.answer ===answer}
                    >
                        <button disabled={userAnswer} value={answer} onClick={callback}><span dangerouslySetInnerHTML={{__html:answer}}/></button>
                    </ButtonWrapper>
                ))}
            </div>
            </Wrapper>
    )
}