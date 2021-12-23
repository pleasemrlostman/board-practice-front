import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { checkCookie, checkToken } from "modules/cookies/cookies";

const BoardUpdate = () => {
    const params = useParams();
    const boardIndex = params.id;
    const [allData, setAllData] = useState({});
    // const [data, setData] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postData, setPostData] = useState({
        title: title,
        content: content,
        count: 0,
    });
    const [realConfig, setRealConfig] = useState({});
    const [cookies, removeCookie] = useCookies(["login"]);
    const history = useHistory();
    const titleChange = (e) => {
        const {
            target: { value },
        } = e;
        console.log(value);
        setTitle(value);
        setPostData((prev) => {
            return { ...prev, title: value };
        });
    };
    const ContentChange = (e) => {
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
        dataUpdate();
    };
    const dataUpdate = async () => {
        try {
            axios
                .put(
                    `https://localhost:8080/api/v1/posts/${boardIndex}`,
                    postData,
                    realConfig
                )
                .then((response) => {
                    alert("수정이 완료됐습니다!");
                    history.push("/board");
                });
        } catch (e) {
            console.log(e);
        }
    };
    const deleteBoard = async () => {
        try {
            axios
                .delete(
                    `https://localhost:8080/api/v1/posts/${boardIndex}`,
                    realConfig
                )
                .then((response) => {
                    alert("삭제가 완료됐습니다!~~~~~~");
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
    const dataScatter = (allData) => {
        setTitle(allData.title);
        setContent(allData.content);
        setPostData(allData);
    };
    useEffect(() => {
        const APIURL__POST = `https://localhost:8080/api/v1/posts/${boardIndex}`;
        let config = checkCookie(cookies);
        setRealConfig(config);
        checkToken(APIURL__POST, config, logOut, setAllData);
        dataScatter(allData);
    }, []);

    return (
        <>
            <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    onChange={titleChange}
                    value={title}
                />
                <input
                    type="text"
                    placeholder="내용을 입력해주세요"
                    onChange={ContentChange}
                    value={content}
                />
                <input type="submit" value="전송하기" />
            </form>
            <BTN onClick={deleteBoard}>삭제하기</BTN>
        </>
    );
};

export default BoardUpdate;
const BTN = styled.button`
    display: block;
    width: fit-content;
    background-color: #337aee;
    padding: 0.25rem;
    border: 1px solid #337aee;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
`;
