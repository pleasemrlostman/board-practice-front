import React from "react";

import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [회원가입정보, set회원가입정보] = useState({});

    const onSubmit = (data) => {
        if (아이디중복 === false) {
            alert("아이디 중복확인을 받아주세요");
        } else if (닉네임중복 === false) {
            alert("닉네임 중복확인을 받아주세요");
        } else if (이메일중복 === false) {
            alert("이메일 중복확인을 받아주세요");
        } else if (data.password !== data.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            console.log(data);
            alert("로그인 정보를 보냈습니다!");
        }
    };
    const onError = (error) => {
        console.log(error);
    };

    const [아이디중복, set아이디중복확인] = useState(false);
    const [닉네임중복, set닉네임중복확인] = useState(false);
    const [이메일중복, set이메일중복확인] = useState(false);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                    <input
                        type="text"
                        placeholder="아이디작성"
                        {...register("userID", {
                            required: "아이디를 작성해주세요",
                            minLength: {
                                value: 5,
                                message:
                                    "아이디를 5글자 이상으로 작성하셔야 합니다.",
                            },
                            maxLength: {
                                value: 12,
                                message:
                                    "아이디를 12글자 이하로 작성하셔야 합니다.",
                            },
                        })}
                    />
                    <button
                        onClick={() => {
                            set아이디중복확인((prev) => !prev);
                        }}
                    >
                        중복확인
                    </button>
                    {errors?.userID?.message}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="닉네임작성"
                        {...register("nickname", {
                            required: "닉네임을 작성해주세요",
                            minLength: {
                                value: 5,
                                message:
                                    "닉네임을 5글자 이상으로 작성하셔야 합니다.",
                            },
                            maxLength: {
                                value: 12,
                                message:
                                    "닉네임을 12글자 이하로 작성하셔야 합니다.",
                            },
                        })}
                    />
                    <button
                        onClick={() => {
                            set닉네임중복확인((prev) => !prev);
                        }}
                    >
                        중복확인
                    </button>
                    {errors?.nickname?.message}
                </div>

                <div>
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
                    <button>중복확인</button>
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
                </div>
            </form>
            <button>회원가입하기</button>
        </div>
    );
};

export default Register;
