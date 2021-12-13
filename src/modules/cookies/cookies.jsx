import axios from "axios";

const checkCookie = (cookies) => {
    let config = {};
    if(cookies.login === undefined) {
        return;
    } else {
        config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Authorization" : cookies.login.data ,
            },
        };
    }
    return config;
}


const getDate = async (apiAddress, config, removeCookies, saveResponseData) => {            
    try {
        const response = await axios
        .get(apiAddress, config)
        .then((response) => {
            if(response.headers.status === "tokenInvalid") {
                removeCookies();
                if(config === undefined) {
                    alert("애초에 토큰이 없으니까 로그인부터해라");
                } else {
                    alert("토근은 있는데 토큰값이 유효하지 않으니까 재로그인해라")
                }
                window.location.replace("/")
            } else if (response.headers.status === "roleInvalid") {
                alert("회원가입좀해라~~~~~");
                window.location.replace("/register");
            } else {
                console.log("인벨리드아님")
                saveResponseData(response.data);
            }

        });
    } catch (e) {
        console.log(e);
    }
};

export { checkCookie, getDate };