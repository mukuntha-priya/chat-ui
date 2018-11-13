import React from 'react';
import {connect} from "react-redux";
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import {fetchAllUsers, selectUser} from "../actions/UserActions";

class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
          selectedUser: {}
        };
    }

    componentDidMount() {
        fetchAllUsers()(this.props.dispatch);
    }

    handleChange = (selectedUser) => {
      this.setState({
          selectedUser
      });
    };

    onSelect = () => {
        selectUser(this.state.selectedUser)(this.props.dispatch);
        this.props.history.push('/slack');
    };

    render() {
        return (
            <div className="user-list">
                <label>Choose user:</label>
                <div className="dropdown">
                    <Select
                    value={this.state.selectedUser}
                    onChange={this.handleChange}
                    options={this.props.allUsers}
                    />
                </div>
                <button className="btn" onClick={this.onSelect}>Go</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allUsers: state.userInfo.allUsers,
});

const mapDispatchToProps = dispatch => ({dispatch});

const UserListWrapper = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default withRouter(UserListWrapper);
