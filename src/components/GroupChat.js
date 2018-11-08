import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {connect} from "react-redux";
import {addMessage, getGroupChat} from "../actions/MessagingActions";

class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        const groupId = props.match.params.groupId;
        this.state = {
            group: props.groups.filter((group) => group.id === +groupId)[0]
        };
    }

    componentDidMount() {
        getGroupChat(this.state.group.id, this.props.user.id)(this.props.dispatch);
    }

    sendMessage = (content) => {
        addMessage(content, this.props.user.id, null, this.state.group.id)(this.props.dispatch);
    };

    render() {
        return (
            <div>
                <h2>{this.state.group.name}</h2>
                <ChatBubble messages={this.props.chat} onNewMessage={this.sendMessage}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userInfo.user,
    chat: state.chat,
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({dispatch});

const GroupChatWrapper = connect(mapStateToProps, mapDispatchToProps)(GroupChat);
export default GroupChatWrapper;