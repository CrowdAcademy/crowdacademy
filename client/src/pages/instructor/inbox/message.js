import React from 'react';

function Message(props) {
    
    return(
        <div className = "message-item-container">
            <input type = "checkbox" id = {props.id}/>
            <label>{props.name}</label>
            <label>{props.slug}</label>
            <label>{props.date}</label>
        </div>
    );
}

export default Message;
