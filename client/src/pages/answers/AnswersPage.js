import "./answers.css"
import React from 'react';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import { AnswerData } from "../../db/sampleAnswers";
import Answer from "../../components/Answer";
import CountHeader from "../../components/shared/CountHeader";



const AnswerElements = AnswerData.map((question, index) => (
    <div key={index}>
        <Answer
            userId={question.id}
            content={question.content}
            date={question.date}
            author={question.author}
            profilePhoto={question.image}
            slug={question.slug}
            isPaid={question.isPaid}
        />
    </div>
));


function AnswersPage() {
    return (
        <LeftMainContainer>
            <CountHeader name="Answers" count={AnswerData.length} />
            {AnswerElements}
        </LeftMainContainer>
    );
}

export default AnswersPage;
