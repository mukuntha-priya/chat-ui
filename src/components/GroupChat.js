import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {connect} from "react-redux";
import {addMessage, getGroupChat, openDirectMessage} from "../actions/MessagingActions";
import UpdateGroupForm from "./UpdateGroupForm";
import {withRouter} from "react-router-dom";
import {pollInterval} from "../constants";
import {getMessageContent} from "../util/MessageUtil";
import ThreadChat from "./ThreadChat";

class GroupChat extends React.Component {
    timeoutEntry = null;

    constructor(props) {
        super(props);
        const groupId = props.match.params.groupId;
        this.state = {
            group: props.groups.filter((group) => group.id === +groupId)[0],
            showUpdateGroupForm: false,
            originalMessageId: null,
            showThreadView: false
        };
    }

    componentDidMount() {
        this.timeoutEntry = setTimeout(() => this.pollChat());
    }

    componentWillReceiveProps(nextProps) {
        const newGroupId = nextProps.match.params.groupId;
        let updatedGroup = nextProps.groups.filter((group) => group.id === +newGroupId)[0];
        this.setState({group: updatedGroup});
        if (newGroupId !== this.props.match.params.groupId) {
            this.fetchChat(newGroupId);
        }
    }

    pollChat = () => {
        this.fetchChat(this.state.group.id);
        this.timeoutEntry = setTimeout(() => this.pollChat(), pollInterval);
    };

    fetchChat = (groupId) => {
        getGroupChat(groupId, this.props.user.id)(this.props.dispatch);
    };

    sendMessage = (content) => {
        const newMessage = this.getNewMessage(content);
        addMessage(newMessage)(this.props.dispatch);
    };

    getNewMessage = (content) => {
        return {
            content,
            userId: this.props.user.id,
            directMessageId: null,
            groupId: this.state.group.id
        };
    };

    showPopup = () => {
        this.setState({showUpdateGroupForm: true});
    };

    hidePopup = () => {
        this.setState({showUpdateGroupForm: false});
    };

    onOpenDirectMessage = (userId2) => {
        openDirectMessage(this.props.user.id, userId2, this.props.history)(this.props.dispatch);
    };

    onReplyTo = (messageId) => {
        this.setState({
            originalMessageId: messageId,
            showThreadView: true
        });
    };

    exitThreadView = () => this.setState({ originalMessageId: null, showThreadView: false });

    render() {
        const messages = getMessageContent(this.props.chat, this.props.user.id, true, this.onOpenDirectMessage, this.onReplyTo);
        return (
            <div className="main">
                <div className="group-header">
                    <h2 className="group-name">{this.state.group.name}</h2>
                    <button className="btn settings" onClick={this.showPopup}>Settings</button>
                </div>
                {this.state.showThreadView ?
                    <ThreadChat
                        originalMessageId={this.state.originalMessageId}
                        messages={this.props.chat}
                        userId={this.props.user.id}
                        getNewMessage={this.getNewMessage}
                        exitThreadView={this.exitThreadView}
                        onAddNewMessage={() => { this.fetchChat(this.state.group.id); }}
                    /> :
                    <ChatBubble
                        messages={messages}
                        onNewMessage={this.sendMessage}
                    />
                }
                {
                    this.state.showUpdateGroupForm &&
                    <UpdateGroupForm dispatch={this.props.dispatch} hidePopup={this.hidePopup}
                                     group={this.state.group}/>
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
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({dispatch});

const GroupChatWrapper = connect(mapStateToProps, mapDispatchToProps)(GroupChat);
export default withRouter(GroupChatWrapper);