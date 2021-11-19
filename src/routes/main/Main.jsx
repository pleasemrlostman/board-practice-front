import React from "react";
import styled from "styled-components";

const Main = () => {
    return (
        <StyledMain>
            <a href="#">로그인</a>
        </StyledMain>
    );
};

export default Main;

const StyledMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        width: 20%;
        height: 100px;
        border: 1px solid #ebee33;
        background-color: #ebee33;
        font-size: 36px;
        cursor: pointer;
        text-decoration: none;
        color: #171717;
    }
`;
