import axios from "axios";
import React, { useEffect } from "react";
const Social = () => {
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    useEffect(() => {
        axios
            .get(`http://192.168.0.21:8080/api/v1/auth?code=${code}`)
            .then((res) => {
                console.log(res);
                const ACCESS_TOKEN = res.data.accessToken;
                console.log(ACCESS_TOKEN);
            })
            .catch((error) => console.log(error));
    }, [code]);

    return <div>왜안되는걸까요</div>;
};

export default Social;
