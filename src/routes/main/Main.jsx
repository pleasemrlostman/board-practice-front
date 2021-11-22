import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { loginChange } from "modules/login/login";

const Main = () => {
    const dispatch = useDispatch();
    const loginActive = useSelector(
        (state) => state.loginChangeReducer,
        shallowEqual
    );
    console.log("지금 로그인 상태값은?" + loginActive);

    const LoginButton = () => {
        dispatch(loginChange(true));
    };

    return (
        <StyledMain>
            <a
                href="https://kauth.kakao.com/oauth/authorize?client_id=2ee064b6d89247a54fe4def4ca8e79ee&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code"
                role="button"
            >
                KakaoLogin 8000
            </a>
            <a
                href="http://192.168.0.21:3000/oauth2/authorization/kakao"
                role="button"
            >
                KakaoLogin 3000
            </a>
        </StyledMain>
    );
};

export default Main;

const StyledMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
