import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";

const Logout = () => {
    const [cookies, removeCookie] = useCookies(["login"]);
    const [decode, setDecode] = useState("");
    const history = useHistory();

    useEffect(() => {
        if(cookies.login === undefined) {
            console.log(cookies);
            console.log("현재 토큰 비어있다");
        } else {
            console.log(cookies);
            console.log(cookies.login);
            setDecode(jwt_decode(cookies.login.data));
        }
    }, [cookies])


    const sighOut = () => {
        console.log("로그아웃");
        alert("로그아웃이 완료됐습니다");
        removeCookie("login");
    }

    return (
        <>
        {
            decode === "" ? "로그인해주세요" : <><span>{decode.sub}</span>님 환영합니다 <button onClick={sighOut}>로그아웃</button></>
        }
        </>
    )
}

export default Logout