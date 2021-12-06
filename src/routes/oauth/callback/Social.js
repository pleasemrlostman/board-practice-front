import axios from "axios";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loginChange } from "modules/login/login";
import { useHistory } from "react-router";
import { useCookies  } from "react-cookie";



const Social = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    let sns = new URL(window.location.href).searchParams.get("state");
    const dispatch = useDispatch();
    const history = useHistory();

    const [cookies, setCookie, removeCookie] = useCookies(["login"]);

    useEffect(() => {
        let config = {
            headers: {'Access-Control-Allow-Origin': '*'},
        };
        axios
            .get(`http://localhost:8080/api/v1/auth?code=${code}&state=${sns}`, config)
            .then((res) => {
                return res;
            })
            .then((token) => {
                if(token) {
                    setCookie("login", token ,{
                        path: "/",
                        httpOnly: false,
                    });
                    alert("로그인 성공 !!!!");
                } else {
                    alert("로그인이 실패했습니다");
                    history.push("/");
                }
            })
            .then(() => {
                // 리턴값부재
                dispatch(loginChange(true));
                history.push("/board");
            })
            .catch((error) => console.log(error));
    }, [code]);

    return <div>로딩중</div>;
};

export default Social;
