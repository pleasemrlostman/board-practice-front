import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";


const BoardWrite = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postData, setPostData] = useState({
        title: title,
        content: content,
        count: 0,
    });
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
        console.log(value);
        setContent(value);
        setPostData((prev) => {
            return { ...prev, content: value };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post();
    };
    
    const accessToken = useSelector((state) => state.loginChangeReducer);
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Authorization" : accessToken.data ,
        },
    };

    const post = async () => {
        try {
            axios
                .post("http://localhost:8080/api/v1/posts", postData, config)
                .then((response) => {
                    console.log(response);
                })
                .then(() => {
                    alert("글 작성이 완료됐습니다");
                    history.push("/board");
                });
        } catch (e) {
            console.log(e);
        }
    };

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
                onChange={ContentChange}
                value={content}
            />
            <input type="submit" value="전송하기" />
        </form>
    );
};

export default BoardWrite;
