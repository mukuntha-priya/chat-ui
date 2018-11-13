import React from 'react';
import {URL} from "../constants";
import axios from "axios/index";
import AsyncSelect from 'react-select/lib/Async';
import {addUsersToGroup} from "../actions/MessagingActions";

class UpdateGroupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
        }
    }

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue});
        return inputValue;
    };

    onChange = (options) => {
        this.setState({selectedUsers: options});
    };

    updateGroup = () => {
        addUsersToGroup(this.props.group.id, this.state.selectedUsers)(this.props.dispatch);
        this.props.hidePopup();
    };

    render() {
        const userIds = this.props.group.users.map((user) => +user.id);
        const promiseOptions = inputValue => axios.get(URL.getMatchingUsers(inputValue))
            .then((response) => {
                    let matchingUsers = response.data.filter((user) => !userIds.includes(+user.id));
                    matchingUsers = matchingUsers.map((user) => {
                        return {label: user.name, value: user.id};
                    });
                    return matchingUsers;
                }
            );
        return (
            <div className="create-group-form">
                <h3>Group {this.props.group.name}</h3>
                <h4>Existing Users</h4>
                <ul>
                    {
                        this.props.group.users.map((user) => <li>{user.name}</li>)
                    }
                </ul>
                <h3>Add Users</h3>
                <div className="dropdown">
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={promiseOptions}
                        onInputChange={this.handleInputChange}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <span className="cancel"><button className="btn"
                                                     onClick={this.props.hidePopup}>Cancel</button></span>
                    <span><button className="btn" onClick={this.updateGroup}>Add</button></span>
                </div>
            </div>
        );
    }
}

export default UpdateGroupForm;