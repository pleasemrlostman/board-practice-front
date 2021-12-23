import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { checkCookie, checkToken, APIURL__POST } from "modules/cookies/cookies";

const BoardWrite = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["login"]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postData, setPostData] = useState({
        title: title,
        content: content,
        count: 0,
    });
    const [realConfig, setRealConfig] = useState({});
    const history = useHistory();
    const titleChange = (e) => {
        const {
            target: { value },
        } = e;
        setTitle(value);
        setPostData((prev) => {
            return { ...prev, title: value };
        });
    };
    const contentChange = (e) => {
        const {
            target: { value },
        } = e;
        setContent(value);
        setPostData((prev) => {
            return { ...prev, content: value };
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        post();
    };
    const post = async () => {
        try {
            axios
                .post(
                    "https://localhost:8080/api/v1/posts",
                    postData,
                    realConfig
                )
                .then((response) => {
                    alert("글 작성이 완료됐습니다");
                    history.push("/board");
                });
        } catch (e) {
            console.log(e);
        }
    };
    const logOut = () => {
        let now = new Date();
        let yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        removeCookie("login", null, {
            path: "/",
            expires: yesterday,
            httpOnly: true,
            secure: true,
        });
        window.location.replace("/");
    };
    useEffect(() => {
        let config = checkCookie(cookies);
        setRealConfig(config);
        checkToken(APIURL__POST, config, logOut, null);
        return () => {};
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="제목을 입력해주세요"
                onChange={titleChange}
                value={title}
            />
            <input
                type="text"
                placeholder="내용을 입력해주세요"
                onChange={contentChange}
                value={content}
            />
            <input type="submit" value="전송하기" />
        </form>
    );
};
export default BoardWrite;
