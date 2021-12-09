import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import axios from "axios";


const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [회원가입정보, set회원가입정보] = useState({});

    const fetchRegistrationData = async (data) => {
            console.log(data);
            await axios.post("", data)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        }

    const onSubmit = (data) => {
        fetchRegistrationData(data);
    };
    const onError = (error) => {
        console.log(error);
    };
    return (
        <div>
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
                {/* <div>
                    <input
                        type="text"
                        placeholder="이메일작성"
                        {...register("userEmail", {
                            required: "아이디(이메일)을 작성해주세요",
                            pattern: {
                                // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                value: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                message: "유효하지 않은 이메일 형식입니다.",
                            },
                        })}
                    />
                    {errors?.userEmail?.message}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호입력"
                        {...register("password")}
                    />
                </div>
                <div>
                    <input
                        placeholder="비밀번호재입력"
                        type="password"
                        {...register("passwordCheck")}
                    />
                </div> */}
                <button>회원가입하기</button>
            </form>
        </div>
    );
};

export default Register;
