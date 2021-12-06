const LOGIN = "login/LOGIN";

const loginChange = (login) => {
    return {
        type: LOGIN,
        login: login,
    };
};

const loginChangeReducer = (state = true, action) => {
    switch (action.type) {
        case LOGIN:
            return action.login;
        default:
            return state;
    }
};

export { loginChange };
export default loginChangeReducer;
