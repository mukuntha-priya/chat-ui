import React from 'react';
import SidePanel from "./SidePanel";
import {connect} from "react-redux";
import { getChatListForUser } from '../actions/MessagingActions';
import {Route} from "react-router-dom";
import DirectMessageWrapper from "./DirectMessage";
import GroupChatWrapper from "./GroupChat";
import CreateGroupForm from "./CreateGroupForm";
import Modal from "./Modal";
import {pollInterval} from "../constants";

class App extends React.Component {
    timeoutEntry = null;
    constructor(props) {
        super(props);
        this.state = {
            showCreateGroupForm: false
        }
    }

    componentDidMount() {
        this.timeoutEntry = setTimeout(() => this.pollChatList());
    }

    pollChatList = () => {
        getChatListForUser(this.props.user.id)(this.props.dispatch);
        this.timeoutEntry = setTimeout(() => this.pollChatList(), pollInterval);
    };

    createNewGroup = () => {
        this.setState({ showCreateGroupForm: true });
    };

    hidePopup = () => { this.setState({ showCreateGroupForm: false })};

    render() {
        const selectedChat = { type: this.props.chat.type, id: this.props.chat.id };
        return (
          <div>
              <SidePanel
                  directMessages={this.props.directMessages}
                  groups={this.props.groups}
                  createNewGroup={this.createNewGroup}
                  selectedChat={selectedChat}
              />
              <Route path={`${this.props.match.url}/direct-messages/:directMessageId`} component={DirectMessageWrapper}/>
              <Route path={`${this.props.match.url}/groups/:groupId`} component={GroupChatWrapper}/>
              <div className="group-form" id="group-form"/>
              {
                  this.state.showCreateGroupForm &&
                      <Modal>
                          <CreateGroupForm dispatch={this.props.dispatch} hidePopup={this.hidePopup}/>
                      </Modal>
              }
          </div>
        );
    }

    componentWillUnmount() {
        this.timeoutEntry && clearTimeout(this.timeoutEntry);
    }
}

const mapStateToProps = state => ({
    groups: state.groups,
    directMessages: state.directMessages,
    user: state.userInfo.user,
    chat: state.chat
});

const mapDispatchToProps = dispatch => ({ dispatch });

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppWrapper;


