import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const Logout = () => {
    const [cookies] = useCookies(["login"]);
    const [decode, setDecode] = useState("");

    let docodedToken;
    useEffect(() => {
        if(cookies.login == null) {
            console.log("현재 토큰 비어있다");
            console.log(cookies);
        } else {
            docodedToken = jwt_decode(cookies.login.data);
            setDecode(docodedToken);
        }
    }, [cookies])
    return (
        <>
        {
            decode === "" ? "로그인해주세요" : <><span>{decode.sub}</span>님 환영합니다 <button>로그아웃</button></>
        }
        </>
    )
}

export default Logout