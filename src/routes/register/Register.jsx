import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { useCookies, setCookie } from "react-cookie";
import { useHistory } from "react-router";
import { checkCookie } from "modules/cookies/cookies";


const Register = () => {
    const history = useHistory()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [cookies] = useCookies(["login"]);
    const [token, setToken] = useState({});
    const [config, setConfig] = useState({});
    const [회원가입정보, set회원가입정보] = useState({});
    const fetchRegistrationData = async (data, config) => {
            await axios.post("http://localhost:8080/api/v1/user", data, config)
            .then((response) => {
                console.log(data);
                console.log(response);
                alert("회원가입이 완료됐습니다");
                window.location.replace("/board");
            })
            .catch((err) => {
                console.log("안가고있음");
                console.log(err);
            })
        }
    const onSubmit = (data) => {
        fetchRegistrationData(data, config);
    };
    const onError = (error) => {
        console.log(error);
    };


    useEffect(() => {
        let returnConfig = checkCookie(cookies);
        setConfig(returnConfig);
    }
    ,[])

    return (
        <div>
            {
                cookies.login === undefined
                ? <div>토큰이 없으므로 로그인 해주시길 바랍니다 
                    <button onClick={() => {
                    history.push("/");
                }}>로그인창으로 돌아가기</button></div> 
                :             
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                    <input
                        type="text"
                        placeholder="이름"
                        {...register("name", {
                            required: "이름을 작성해주세요",
                            minLength: {
                                value: 2,
                                message:
                                    "이름을 2글자 이상으로 작성하셔야 합니다.",
                            },
                            maxLength: {
                                value: 10,
                                message:
                                    "이름을 10글자 이하로 작성하셔야 합니다.",
                            },
                        })}
                    />
                    {errors?.name?.message}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="주소작성"
                        {...register("address", {
                            required: "주소를 작성해주세요",
                        })}
                    />
                    {errors?.address?.message}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="핸드폰 번호 작성"
                        {...register("phone", {
                            required: "휴대폰 번호를 작성해주세요",
                        })}
                    />
                    {errors?.phone?.message}
                </div>
                <button>회원가입하기</button>
            </form> 
            }
        </div>
    );
};

export default Register;
