import React from 'react';
import {Link} from 'react-router-dom';

class SidePanel extends React.Component {
    render() {
        return (
            <div>
                <div className="group-list">
                    <div className="header">
                        <h3>Groups</h3>
                        <button onClick={() => {
                        }}>Add
                        </button>
                    </div>
                    <ul>
                        {
                            this.props.groups.map((group) => (
                                <li>
                                    <Link to={`/slack/groups/${group.id}`}>{group.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="direct-messages-list">
                    <div className="header">
                        <h3>Direct Messages</h3>
                    </div>
                    <ul>
                        {
                            this.props.directMessages.map((directMessage) => (
                                <li>
                                    <Link to={`/slack/direct-messages/${directMessage.id}`}>{directMessage.recipient.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default SidePanel;