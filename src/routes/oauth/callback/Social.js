import axios from "axios";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loginChange } from "modules/login/login";
import { useHistory } from "react-router";

const Social = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    const dispatch = useDispatch();

    const history = useHistory();
    console.log("token")

    useEffect(() => {
        let config = {
            headers: {'Access-Control-Allow-Origin': '*'},
        };
        axios
            .get(`http://localhost:8080/api/v1/auth?code=${code}`, config)
            .then((res) => {
                return res;
            })
            .then((token) => {
                dispatch(loginChange(token));
                history.push("/board");
            })
            .catch((error) => console.log(error));
    }, [code]);

    return <div>로딩중</div>;
};

export default Social;
