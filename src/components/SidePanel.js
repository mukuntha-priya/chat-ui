import React from 'react';
import {Link} from 'react-router-dom';

class SidePanel extends React.Component {
    render() {
        return (
            <div className="sidenav">
                <div className="group-list">
                    <div className="header">
                        <h3 className="title">Groups</h3>
                        <button className="btn" onClick={() => {
                        }}>Add
                        </button>
                    </div>
                    {
                        this.props.groups.map((group) => (
                            <div className="name">
                                <Link to={`/slack/groups/${group.id}`}>{group.name}</Link>
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
                            <div className="name">
                                <Link
                                    to={`/slack/direct-messages/${directMessage.id}`}>{directMessage.recipient.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default SidePanel;