import { QuestionData } from "../../db/sampleQuestion"
import Question from "../../pages/instructor/question";
import { AnswerData } from "../../db/sampleAnswers";
import Answer from "../../pages/student/Answer";
import Hero from "../hero";
import CoreHero from "../corehero";


function SectionContainer(props) {
    const totalQuestion = QuestionData.length;
    const totalAnswer = AnswerData.length;

    const QuestionElements = QuestionData.map(question => (
        <Question 
            key={question.id}
            id={question.id}
            slug={question.slug}
            content={question.content} 
            date={question.date} 
            author={question.author}
            image={question.image}
        />
    ));
    

    const AnswerElements = AnswerData.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
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

    return(
        <section className="questions-display-container">
            {props.section === "instructor" && (
                <h3 className="questions-container-header">Questions ({totalQuestion})</h3>
            )}
            {props.section === "student" && (
                <h3 className="questions-container-header">Answers ({totalAnswer})</h3>
            )}
            <div className="hr"></div>
            {props.section === "instructor" && (
                <div className="inner-container">
                    {QuestionElements}
                </div>
            )}
            {props.section === "student" && (
                <div className="inner-container">
                    <CoreHero/>
                    {AnswerElements}
                </div>
            )}         
        </section>
    )
}

export default SectionContainer;