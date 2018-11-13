import React from 'react';
import SidePanel from "./SidePanel";
import {connect} from "react-redux";
import { getChatListForUser } from '../actions/MessagingActions';
import {Route} from "react-router-dom";
import DirectMessageWrapper from "./DirectMessage";
import GroupChatWrapper from "./GroupChat";
import CreateGroupForm from "./CreateGroupForm";
import Modal from "./Modal";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateGroupForm: false
        }
    }

    componentDidMount() {
        getChatListForUser(this.props.user.id)(this.props.dispatch);
    }

    createNewGroup = () => {
        this.setState({ showCreateGroupForm: true });
    };

    hidePopup = () => { this.setState({ showCreateGroupForm: false })};

    render() {
        return (
          <div>
              <SidePanel
                  directMessages={this.props.directMessages}
                  groups={this.props.groups}
                  createNewGroup={this.createNewGroup}
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
}

const mapStateToProps = state => ({
    groups: state.groups,
    directMessages: state.directMessages,
    user: state.userInfo.user
});

const mapDispatchToProps = dispatch => ({ dispatch });

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppWrapper;


