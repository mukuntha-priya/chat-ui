import React from 'react';
import {URL} from "../constants";
import axios from "axios/index";
import AsyncSelect from 'react-select/lib/Async';
import {createGroup} from "../actions/MessagingActions";

class CreateGroupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
            groupName: ''
        }
    }

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue});
        return inputValue;
    };

    onChange = (options) => {
      this.setState({ selectedUsers: options });
    };

    createGroup = () => {
        createGroup(this.state.groupName, this.state.selectedUsers)(this.props.dispatch);
        this.props.hidePopup();
    };

    render() {
        const promiseOptions = inputValue => axios.get(URL.getMatchingUsers(inputValue))
            .then((response) => response.data.map((user) => {
                return {label: user.name, value: user.id};
            }));
        return (
            <div className="create-group-form">
                <h3>Create Group</h3>
                <div>
                    <label>Group Name:   </label>
                    <input type='text'
                           name='name'
                           onChange={(e) => this.setState({ groupName: e.target.value })}
                           placeholder='Name'
                           autoFocus
                    />
                </div>
                <h3>Select Users</h3>
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
                    <span className="cancel"><button className="btn" onClick={this.props.hidePopup}>Cancel</button></span>
                    <span><button className="btn" onClick={this.createGroup}>Create</button></span>
                </div>
            </div>
        );
    }
}

export default CreateGroupForm;