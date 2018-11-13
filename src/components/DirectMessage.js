import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {connect} from "react-redux";
import {addMessage, getDirectMessageChat} from "../actions/MessagingActions";

class DirectMessage extends React.Component {
    constructor(props) {
        super(props);
        const directMessageId = props.match.params.directMessageId;
        this.state = {
            directMessage: props.directMessages.filter((dm) => dm.id === +directMessageId)[0],
        };
    }

    componentDidMount() {
        getDirectMessageChat(this.state.directMessage.id, this.props.user.id)(this.props.dispatch);
    }

    componentWillReceiveProps(nextProps) {
        let newDirectMessageId = nextProps.match.params.directMessageId;
        if (newDirectMessageId !== this.props.match.params.directMessageId) {
            const directMessage = this.props.directMessages.filter((dm) => dm.id === +newDirectMessageId)[0];
            getDirectMessageChat(directMessage.id, this.props.user.id)(this.props.dispatch);
            this.setState({ directMessage });
        }
    }

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
}

const mapStateToProps = state => ({
    user: state.userInfo.user,
    chat: state.chat,
    directMessages: state.directMessages
});

const mapDispatchToProps = dispatch => ({dispatch});

const DirectMessageWrapper = connect(mapStateToProps, mapDispatchToProps)(DirectMessage);
export default DirectMessageWrapper;