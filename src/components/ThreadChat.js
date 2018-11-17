import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {getMessagesInThread, getOriginalMessage} from "../util/MessageUtil";
import {addToThread, createThread} from "../actions/MessagingActions";

class ThreadChat extends React.Component {

    getMessages = () => {
        const {originalMessageId, messages, userId} = this.props;
        const originalMessage = messages.filter((message) => message.id === originalMessageId)[0];
        return originalMessage.thread_id ? getMessagesInThread(messages, userId, originalMessage.thread_id) :
            getOriginalMessage(messages, userId, originalMessageId);
    };

    sendMessage = (content) => {
        const {originalMessageId, messages} = this.props;
        const originalMessage = messages.filter((message) => message.id === originalMessageId)[0];
        if (originalMessage.thread_id) {
            const data = {
                ...this.props.getNewMessage(content),
                threadId: originalMessage.thread_id
            };
            return addToThread(data).then((response) => this.props.onAddNewMessage());
        } else {
            const data = {
                ...this.props.getNewMessage(content),
                originalMessageId
            };
            return createThread(data).then((response) => this.props.onAddNewMessage());
        }
    };

    render() {
        const messages = this.getMessages();
        return (
            <div className="thread-view">
                <h3>Viewing thread: </h3>
                <button className="btn" onClick={this.props.exitThreadView}>Back</button>
                <ChatBubble messages={messages} onNewMessage={this.sendMessage}/>
            </div>
        );
    }
}

export default ThreadChat;