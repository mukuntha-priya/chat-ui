import React from 'react';
import ChatBubble from 'react-chat-bubble';
import {connect} from "react-redux";
import {addMessage, getGroupChat} from "../actions/MessagingActions";
import UpdateGroupForm from "./UpdateGroupForm";
import {withRouter} from "react-router-dom";

class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        const groupId = props.match.params.groupId;
        this.state = {
            group: props.groups.filter((group) => group.id === +groupId)[0],
            showUpdateGroupForm: false
        };
    }

    componentDidMount() {
        getGroupChat(this.state.group.id, this.props.user.id, this.props.history)(this.props.dispatch);
    }

    componentWillReceiveProps(nextProps) {
        const groupId = nextProps.match.params.groupId;
        let updatedGroup = nextProps.groups.filter((group) => group.id === +groupId)[0];
        this.setState({group: updatedGroup});
        let newGroupId = nextProps.match.params.groupId;
        if (newGroupId !== this.props.match.params.groupId) {
            getGroupChat(newGroupId, this.props.user.id, this.props.history)(this.props.dispatch);
        }
    }

    sendMessage = (content) => {
        addMessage(content, this.props.user.id, null, this.state.group.id)(this.props.dispatch);
    };

    showPopup = () => {
        this.setState({showUpdateGroupForm: true});
    };

    hidePopup = () => {
        this.setState({showUpdateGroupForm: false});
    };

    render() {
        return (
            <div className="main">
                <div className="group-header">
                    <h2 className="group-name">{this.state.group.name}</h2>
                    <button className="btn settings" onClick={this.showPopup}>Settings</button>
                </div>
                <ChatBubble messages={this.props.chat} onNewMessage={this.sendMessage}/>
                {
                    this.state.showUpdateGroupForm &&
                    <UpdateGroupForm dispatch={this.props.dispatch} hidePopup={this.hidePopup}
                                     group={this.state.group}/>
                }
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
export default withRouter(GroupChatWrapper);