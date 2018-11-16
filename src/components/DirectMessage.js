import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {connect} from "react-redux";
import {addMessage, getDirectMessageChat} from "../actions/MessagingActions";
import {pollInterval} from "../constants";

class DirectMessage extends React.Component {
    timeoutEntry = null;
    constructor(props) {
        super(props);
        const directMessageId = props.match.params.directMessageId;
        this.state = {
            directMessage: props.directMessages.filter((dm) => dm.id === +directMessageId)[0],
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
        addMessage(content, this.props.user.id, this.state.directMessage.id, null)(this.props.dispatch);
    };

    render() {
        return (
            <div className="main">
                <h2>{this.state.directMessage.recipient.name}</h2>
                <ChatBubble messages={this.props.chat} onNewMessage={this.sendMessage}/>
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