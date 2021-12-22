import axios from "axios";
import { useCookies } from "react-cookie";

const APIURL__POST = "http://localhost:8080/api/v1/posts";

const checkCookie = (cookies) => {
    let config = {};
    if (cookies.login === undefined) {
        return;
    } else {
        config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: cookies.login.data.jwt,
            },
        };
    }
    return config;
};

const getRefresh = (cookies) => {
    let refresh = "";
    if (cookies.login === undefined) {
        return;
    } else {
        refresh = cookies.login.data.refresh;
    }
    return refresh;
};

const checkToken = async (
    apiAddress,
    config,
    logOut,
    saveResponseData,
    refresh
) => {
    try {
        await axios.get(apiAddress, config).then((response) => {
            const status = response.headers.status;
            switch (status) {
                case "tokenInvalid":
                    config === undefined
                        ? alert("토큰없음 로그인해")
                        : alert("유효하지않은 토큰");
                    logOut();
                    break;
                case "roleInvalid":
                    alert("회원가입좀해라~~~~~");
                    window.location.replace("/register");
                    break;
                case "tokenExpired":
                    axios
                        .get(
                            `http://localhost:8080/api/v1/auth?&refresh=${refresh}`
                        )
                        .then((res) => console.log(res));
                    break;
                default:
                    if (saveResponseData === null) {
                        return;
                    } else {
                        saveResponseData(response.data);
                    }
                    break;
            }
        });
    } catch (err) {
        alert("제발 ~~~")
        alert(err);
    }
};

export { checkCookie, checkToken, getRefresh, APIURL__POST };
