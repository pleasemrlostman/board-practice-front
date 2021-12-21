const CONFIG_SAVE = "config/SAVE";

const saveConfig = (config) => {
    return {
        type: CONFIG_SAVE,
        payload: config,
    };
};

const saveConfigReducer = (
    loginInformation = {
        loginStatus: false,
        config: null,
    },
    action
) => {
    switch (action.type) {
        case CONFIG_SAVE:
            return {
                ...loginInformation,
                loginStatus: action.payload.loginStatus,
                config: action.payload.config,
            };
        default:
            return loginInformation;
    }
};

export { saveConfig };
export default saveConfigReducer;
