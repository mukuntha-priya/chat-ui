import React from 'react';
import SidePanel from "./SidePanel";
import {connect} from "react-redux";
import { getChatListForUser } from '../actions/MessagingActions';
import {Route} from "react-router-dom";
import DirectMessageWrapper from "./DirectMessage";
import GroupChatWrapper from "./GroupChat";

class App extends React.Component {

    componentDidMount() {
        getChatListForUser(this.props.user.id)(this.props.dispatch);
    }

    render() {
        return (
          <div>
              <SidePanel
                  directMessages={this.props.directMessages}
                  groups={this.props.groups}
              />
              <Route path={`${this.props.match.url}/direct-messages/:directMessageId`} component={DirectMessageWrapper}/>
              <Route path={`${this.props.match.url}/groups/:groupId`} component={GroupChatWrapper}/>
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


