import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
const Logout = () => {
    const [cookies, removeCookie] = useCookies(["login"]);
    const [decode, setDecode] = useState("");
    const [realCookies, setRealCookies] = useState({});
    const [userLogged, setUserLogged] = useState(false);
    const sighOut = () => {
        let now = new Date();
        let yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        removeCookie("login", null, {
            path: "/",
            expires: yesterday,
            httpOnly: false,
        });
        window.location.replace("/");
    };
    useEffect(() => {
        if (cookies.login !== undefined) {
            setRealCookies(cookies.login);
            setDecode(jwt_decode(cookies.login.data));
            setUserLogged(true);
        } else {
            console.log("현재 쿠키에 아무것도 담겨있지 않음");
            setUserLogged(false);
        }
    }, [realCookies]);
    return (
        <>
            {userLogged !== true ? (
                <LogOutWrap>로그인해주세요</LogOutWrap>
            ) : (
                <>
                    <span>{decode.sub}</span>님 환영합니다{" "}
                    <button onClick={sighOut}>로그아웃</button>
                </>
            )}
        </>
    );
};
export default Logout;
const LogOutWrap = styled.div`
    border: 1px solid #999;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
