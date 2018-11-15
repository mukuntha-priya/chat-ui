import React from 'react';
import {Link} from 'react-router-dom';

class SidePanel extends React.Component {
    render() {
        const selectedChat = this.props.selectedChat;
        return (
            <div className="sidenav">
                <div className="group-list">
                    <div className="header">
                        <h3 className="title">Groups</h3>
                        <button className="btn" onClick={this.props.createNewGroup}>Add</button>
                    </div>
                    {
                        this.props.groups.map((group) => (
                            <div className={ selectedChat.type === 'GROUP' && selectedChat.id === group.id ? "name selected": "name"}>
                                <Link to={`/slack/groups/${group.id}`}>{group.name}</Link>
                                {
                                    group.unreadCount > 0 && <span> ({group.unreadCount})</span>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="direct-messages-list">
                    <div className="header">
                        <h3>Direct Messages</h3>
                    </div>
                    {
                        this.props.directMessages.map((directMessage) => (
                            <div className={ selectedChat.type === 'DIRECT_MESSAGE' && selectedChat.id === directMessage.id ? "name selected": "name"}>
                                <Link
                                    to={`/slack/direct-messages/${directMessage.id}`}>{directMessage.recipient.name}</Link>
                                {
                                    directMessage.unreadCount > 0 && <span> ({directMessage.unreadCount})</span>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default SidePanel;