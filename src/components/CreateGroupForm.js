import React from 'react';
import Select from 'react-select';

class CreateGroupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: [],
            filteredUsers: []
        }
    }

    componentWillReceiveProps() {

    }

    render() {
        return (
          <div>
              <label>Group Name</label>

          </div>
        );
    }
}