import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { loginChange } from "modules/login/login";
import BoardContent from "routes/board-content/BoardContent";
import BoardUpdate from "routes/board-update/BoardUpdate";
import Board from "routes/board/Board";
import BoardWrite from "routes/boardWrite/BoardWrite";
import Main from "routes/main/Main";
import Social from "routes/oauth/callback/Social";
import styled from "styled-components";
import Logout from "routes/logout/logut";
import Register from "routes/register/Register";

function App() {
    return (
        <AllWrap>
            <Router>
                <Logout />
                <Switch>
                    <Route exact path="/" component={Main}></Route>
                    <Route exact path="/board/" component={Board}></Route>
                    <Route
                        exact
                        path="/board/:id"
                        component={BoardContent}
                    ></Route>
                    <Route
                        exact
                        path="/board-write"
                        component={BoardWrite}
                    ></Route>
                    <Route
                        exact
                        path="/board/:id/update"
                        component={BoardUpdate}
                    ></Route>
                    <Route exact path="/api/v1/auth" component={Social}></Route>
                    <Route exact path="/register" component={Register} />
                </Switch>
            </Router>
        </AllWrap>
    );
}

export default App;
const StyledLinkWrap = styled.div`
    border: 1px solid red;
    display: flex;
    align-items: center;
    gap: 15px;
`;

const StyledLink = styled(Link)`
    border: 1px solid #337aee;
    background-color: #337aee;
    color: #fff;
    padding: 10px;
    text-decoration: none;
`;

const AllWrap = styled.div`
    border: 1px solid blue;
    max-width: 1440px;
    margin: auto;
`;
