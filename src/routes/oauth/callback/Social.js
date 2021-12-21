import axios from "axios";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loginChange } from "modules/login/login";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";

const Social = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    let sns = new URL(window.location.href).searchParams.get("state");

    let now = new Date();
    let after1m = new Date();

    const dispatch = useDispatch();
    const history = useHistory();

    const [cookies, setCookie, removeCookie] = useCookies(["login"]);

    useEffect(() => {
        let config = {
            headers: { "Access-Control-Allow-Origin": "*" },
        };
        axios
            .get(
                `http://localhost:8080/api/v1/auth?&code=${code}&state=${sns}`,
                config
            )
            .then((token) => {
                if (token) {
                    after1m.setMinutes(now.getMinutes() + 1440);
                    setCookie("login", token, {
                        path: "/",
                        expires: after1m,
                        httpOnly: false,
                    });
                    alert("로그인이 성공적으로 됐으니까 이건의미없다");
                    return token;
                } else {
                    alert("로그인이 실패했습니다");
                    history.push("/");
                }
            })
            .then((res) => {
                if (res.headers.status === "roleInvalid") {
                    alert("회원가입이 필요합니다!");
                    window.location.replace("/register");
                    return;
                } else {
                    alert("로그인과 회원가입이 완료됐습니다.");
                    window.location.replace("/board");
                }
            })
            .catch((error) => console.log(error));
    }, [code]);

    return <div>로딩중</div>;
};

export default Social;
