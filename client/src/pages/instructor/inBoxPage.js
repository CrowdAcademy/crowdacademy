import React from 'react';
import './homePage.css';
import './inbox.css';
import { MessageData } from '../../db/sampleInboxData';
import Message from './message';
import LeftMainContainer from '../../components/shared/leftmaincontainer';
import CountHeader from '../../components/shared/CountHeader';



function InstructorInboxPage() {

    const MessageElement = MessageData.map(message => (
        <Message 
            key={message.id}
            id={message.id}
            slug={message.slug}
            content={message.content} 
            date={message.date} 
            author={message.author}
        />
    ));

    return (
        <LeftMainContainer>
            <CountHeader name="Messages" count={MessageData.length} />
            {MessageElement}
        </LeftMainContainer>
    )
}

export default InstructorInboxPage;