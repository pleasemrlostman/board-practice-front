import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies, setCookie } from "react-cookie";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";

const Logout = () => {
    const [cookies, removeCookie] = useCookies(["login"]);
    const [decode, setDecode] = useState("");
    const [realCookies, setRealCookies] = useState({});
    const [config, setConfig] = useState({});
    const history = useHistory();


    let now = new Date();
    let yesterday = new Date();

    useEffect(() => {
        if(cookies.login === undefined) {
            console.log(cookies);
            console.log("현재 토큰 비어있다");
        } else {
            setConfig(
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Authorization" : cookies.login.data ,
                    },
                }
            )
            setRealCookies(cookies.login);    
            setDecode(jwt_decode(cookies.login.data));
        }
    }, [realCookies])



    const sighOut =  () => {
        yesterday.setDate(now.getDate() - 1);
        console.log(yesterday);
        removeCookie("login", null , {
            path: "/",
            expires: yesterday,
            httpOnly: false,
        });
        window.location.replace("/");
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