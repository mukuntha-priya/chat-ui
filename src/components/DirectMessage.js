import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {connect} from "react-redux";
import {addMessage, getDirectMessageChat} from "../actions/MessagingActions";
import {pollInterval} from "../constants";
import { getMessageContent } from "../util/MessageUtil";
import ThreadChat from "./ThreadChat";

class DirectMessage extends React.Component {
    timeoutEntry = null;
    constructor(props) {
        super(props);
        const directMessageId = props.match.params.directMessageId;
        this.state = {
            directMessage: props.directMessages.filter((dm) => dm.id === +directMessageId)[0],
            originalMessageId: null,
            showThreadView: false
        };
    }

    componentDidMount() {
        this.timeoutEntry = setTimeout(() => this.pollChat());
    }

    componentWillReceiveProps(nextProps) {
        let newDirectMessageId = nextProps.match.params.directMessageId;
        if (newDirectMessageId !== this.props.match.params.directMessageId) {
            const directMessage = this.props.directMessages.filter((dm) => dm.id === +newDirectMessageId)[0];
            this.setState({ directMessage });
            this.fetchChat(directMessage.id);
        }
    }

    pollChat = () => {
        this.fetchChat(this.state.directMessage.id);
        this.timeoutEntry = setTimeout(() => this.pollChat(), pollInterval);
    };

    fetchChat = (directMessageId) => {
        getDirectMessageChat(directMessageId, this.props.user.id)(this.props.dispatch);
    };

    sendMessage = (content) => {
        const newMessage = this.getNewMessage(content);
        addMessage(newMessage)(this.props.dispatch);
    };

    getNewMessage = (content) => {
        return {
            content,
            userId: this.props.user.id,
            directMessageId: this.state.directMessage.id,
            groupId: null
        };
    };

    onReplyTo = (messageId) => {
        this.setState({
            originalMessageId: messageId,
            showThreadView: true
        });
    };

    exitThreadView = () => this.setState({ originalMessageId: null, showThreadView: false });

    render() {
        const messages = getMessageContent(this.props.chat, this.props.user.id, false, {}, this.onReplyTo);
        return (
            <div className="main">
                <h2>{this.state.directMessage.recipient.name}</h2>
                {this.state.showThreadView ?
                    <ThreadChat
                        originalMessageId={this.state.originalMessageId}
                        messages={this.props.chat}
                        userId={this.props.user.id}
                        getNewMessage={this.getNewMessage}
                        exitThreadView={this.exitThreadView}
                        onAddNewMessage={() => { this.fetchChat(this.state.directMessage.id); }}
                    /> :
                    <ChatBubble
                        messages={messages}
                        onNewMessage={this.sendMessage}
                    />
                }
            </div>
        );
    }

    componentWillUnmount() {
        this.timeoutEntry && clearTimeout(this.timeoutEntry);
    }
}

const mapStateToProps = state => ({
    user: state.userInfo.user,
    chat: state.chat.messages,
    directMessages: state.directMessages
});

const mapDispatchToProps = dispatch => ({dispatch});

const DirectMessageWrapper = connect(mapStateToProps, mapDispatchToProps)(DirectMessage);
export default DirectMessageWrapper;