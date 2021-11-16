import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Board from "routes/board/board";
import styled from "styled-components";

function App() {
    return (
        <AllWrap>
            <Router>
                <StyledLinkWrap>
                    <StyledLink to="/board">게시판(리덕스사용X)</StyledLink>
                    {/* <StyledLink to="/board-redux">
                        게시판(리덕스사용O)
                    </StyledLink> */}
                </StyledLinkWrap>
                <Switch>
                    <Route path="/board" component={Board}></Route>
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
