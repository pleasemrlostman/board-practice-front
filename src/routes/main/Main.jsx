import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
const Main = () => {
    let expireDate = new Date();
    const [cookies, setCookie, removeCookie] = useCookies(["loginState"]);
    const loginStatus = useSelector(
        (state) => state.saveConfigReducer.loginStatus
    );
    const loginSiteInformation = [
        {
            site: "kakao",
            href: "https://kauth.kakao.com/oauth/authorize?client_id=2ee064b6d89247a54fe4def4ca8e79ee&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code&state=",
            text: "카카오톡으로 시작하기",
            component: "LoginKakaoLogo",
            alt="카카오톡 로고"
        },
        {
            site: "naver",
            href: "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=_I5ydV36uupFgCHdJ_1x&redirect_uri=http://localhost:3000/api/v1/auth&state=",
            text: "네이버로 시작하기",
            component: "LoginNaverLogo",
            alt="네이버 로고"
        },
        {
            site: "google",
            href: "https://accounts.google.com/o/oauth2/v2/auth?client_id=916610963822-dr1b5jcj7d08urko9fmj4egh1m55fim1.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code&scope=email%20profile&prompt=consent&access_type=offline&state=",
            text: "구글로 시작하기",
            component: "LoginGoogleLogo",
            alt="구글로고 로고"
        },
        {
            site: "facebook",
            href: "",
            text: "페이스북으로 시작하기",
            component: "LoginFacebookLogo",
            alt="페이스북 로고"
        },
    ];

    const 로그인함수 = (siteInfor) => {
        expireDate.setMinutes(new Date().getMinutes() + 5);
        setCookie("loginState", siteInfor, {
            path: "/",
            expires: expireDate,
            httpOnly: true,
            secure: true,
        });
        window.location.replace(`${siteInfor.href}${siteInfor.uuid}`);
    };

    return (
        <>
            {!loginStatus ? (
                <StyledMain>
                    {/* <a
                        href={`https://kauth.kakao.com/oauth/authorize?client_id=2ee064b6d89247a54fe4def4ca8e79ee&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code&state=${sample}`}
                        role="button"
                    >
                        KakaoLogin
                    </a>
                    <a
                        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=_I5ydV36uupFgCHdJ_1x&redirect_uri=http://localhost:3000/api/v1/auth&state=${sample}`}
                        role="button"
                    >
                        NaverLogin
                    </a>
                    <a
                        href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=916610963822-dr1b5jcj7d08urko9fmj4egh1m55fim1.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/v1/auth&response_type=code&scope=email%20profile&prompt=consent&access_type=offline&state=${sample}`}
                        role="button"
                    >
                        GoogleLogin
                    </a> */}
                    {loginSiteInformation.map((value, id) => {
                        return (
                            <button
                                onClick={() => {
                                    const uuid = uuidv4();
                                    const clickedButtonInformation = {
                                        href: value.href,
                                        siteName: value.site,
                                        uuid,
                                    };
                                    로그인함수(clickedButtonInformation);
                                }}
                                key={id}
                            >
                                {value.text}
                            </button>
                        );
                    })}
                </StyledMain>
            ) : (
                <div>현재 로그인이 완료된 상태입니다.</div>
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
