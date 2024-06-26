
function Question(props) {
    return(
        <div className = "question-card">
            <div className = "question-card-details">
                <p className = "question-card-content">{props.content}</p>
                <p className = "question-card-date">{props.date}</p>
                <address className = "question-card-author">From {props.author}</address>
            </div>
            <img className = "question-author-image" src = {props.image}/>
            <a className = "question-card-respond-btn" href = "/respond">Respond</a>
        </div>
    )
}

export default Question;
