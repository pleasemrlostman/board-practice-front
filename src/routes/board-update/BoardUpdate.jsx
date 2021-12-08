import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useCookies, setCookie } from "react-cookie";


const BoardUpdate = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postData, setPostData] = useState({
        title: title,
        content: content,
        count: 0,
    });
    const [config, setConfig] = useState({});
    const [cookies, removeCookie] = useCookies(["login"]);

    useEffect(() => {
        if(cookies.login !== undefined) {
            setConfig(
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Authorization" : cookies.login.data ,
                    },
                }
            )

        }
    }
    , [])

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

    const accessToken = useSelector((state) => state.loginChangeReducer);


    const dataUpdate = async () => {
        try {
            axios
                .put(
                    `http://localhost:8080/api/v1/posts/${params.id}`, postData, config)
                .then((response) => {
                    alert("수정이 완료됐습니다!");
                    history.push("/board");
                    console.log(response);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const deleteBoard = async () => {
        try {
            axios
                .delete(
                    `http://192.168.0.21:3000/api/v1/posts/${params.id}`,
                    data.pno
                )
                .then((response) => {
                    alert("삭제가 완료됐습니다!");
                    history.push("/board");
                    console.log(response);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const getDate = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.0.21:3000/api/v1/posts/${params.id}`
                );
                setData(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setPostData(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        getDate();
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
