import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loginChange } from "modules/login/login";

const Main = () => {
    const dispatch = useDispatch();
    const loginActive = useSelector((state) => state.loginChangeReducer);
    console.log("지금 로그인 상태값은?" + loginActive);

    const LoginButton = () => {
        dispatch(loginChange(true));
    };

    return (
        <StyledMain>
            {/* <a href="#">로그인</a> */}
            <button
                onClick={() => {
                    LoginButton();
                }}
            >
                로그인
            </button>
        </StyledMain>
    );
};

export default Main;

const StyledMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button,
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
