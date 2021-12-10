import { useHistory } from "react-router";


const checkCookie = (cookie) => {
    let config = {};
    if(cookie === null) {
        alert("로그인해라 세훈아")
        history.push("/")
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


export {checkCookie};