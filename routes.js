import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import AppWrapper from "./src/components/App";
import UserListWrapper from "./src/components/UserList";

class Routes extends React.Component {
    render() {
        return (<BrowserRouter>
            <Switch>
                <Route path="/" exact component={UserListWrapper}/>
                <Route path="/slack" component={AppWrapper}/>
            </Switch>
        </BrowserRouter>);
    }
}

export default Routes;