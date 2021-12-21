import axios from "axios";

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
            if (response.headers.status === "tokenInvalid") {
                config === undefined
                    ? alert("애초에 토큰이 없으니까 로그인부터해라")
                    : alert(
                          "토근은 있는데 토큰값이 유효하지 않으니까 재로그인해라"
                      );
                logOut();
            } else if (response.headers.status === "roleInvalid") {
                alert("회원가입좀해라~~~~~");
                window.location.replace("/register");
            } else if (response.headers.status === "tokenExpired") {
                axios
                    .get(
                        `http://localhost:8080/api/v1/auth?&refresh=${refresh}`
                    )
                    .then((res) => console.log(res));
            } else {
                console.log("인벨리드아님");
                if (saveResponseData === null) {
                    return;
                } else {
                    saveResponseData(response.data);
                }
            }
        });
    } catch (err) {
        alert("여기서뜨는거맞지?");
        alert(err);
        window.location.replace("/");
    }
};

export { checkCookie, checkToken, getRefresh, APIURL__POST };
