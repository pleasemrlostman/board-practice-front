import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import BoardContent from "routes/board-content/BoardContent";
import BoardUpdate from "routes/board-update/BoardUpdate";
import Board from "routes/board/Board";
import BoardWrite from "routes/boardWrite/BoardWrite";
import styled from "styled-components";

function App() {
    return (
        <AllWrap>
            <Router>
                <StyledLinkWrap>
                    <StyledLink to="/board">
                        게시판(리덕스 및 리액트 훅 폼 사용 x)
                    </StyledLink>
                    {/* <StyledLink to="/board-redux">
                        게시판(리덕스사용O)
                    </StyledLink> */}
                </StyledLinkWrap>
                <Switch>
                    <Route exact path="/board" component={Board}></Route>
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
