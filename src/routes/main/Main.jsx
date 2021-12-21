import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
const Main = () => {
    const [cookies] = useCookies(["login"]);
    return (
        <>
            {cookies.login === undefined ? (
                <StyledMain>
                    <a
                        href="https://kauth.kakao.com/oauth/authorize?client_id=2ee064b6d89247a54fe4def4ca8e79ee&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code&state=kakao"
                        role="button"
                    >
                        KakaoLogin
                    </a>
                    <a
                        href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=_I5ydV36uupFgCHdJ_1x&redirect_uri=http://localhost:3000/api/v1/auth&state=naver"
                        role="button"
                    >
                        NaverLogin
                    </a>
                    <a
                        href="https://accounts.google.com/o/oauth2/v2/auth?client_id=916610963822-dr1b5jcj7d08urko9fmj4egh1m55fim1.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code&scope=email%20profile&prompt=consent&access_type=offline"
                        role="button"
                    >
                        GoogleLogin
                    </a>
                </StyledMain>
            ) : (
                <div>로그인!</div>
            )}
        </>
    );
};
export default Main;
const StyledMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    button,
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 1px solid #999;
        font-size: 24px;
        cursor: pointer;
        text-decoration: none;
        color: #171717;
    }
`;
