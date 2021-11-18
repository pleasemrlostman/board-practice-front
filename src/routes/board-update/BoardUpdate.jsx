import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { useParams } from "react-router";

const BoardUpdate = () => {
    const params = useParams();
    console.log(params);
    const [data, setData] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postData, setPostData] = useState({
        title: title,
        content: content,
        count: 0,
        // pno: parseInt(params.id),
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
        dataUpdate();
    };

    const dataUpdate = async () => {
        try {
            axios
                .put(
                    `http://192.168.0.21:3000/api/v1/posts/${params.id}`,
                    postData
                )
                .then((response) => {
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
                    console.log(response);
                });
        } catch (e) {
            // console.log(e);
        }
    };

    useEffect(() => {
        const getDate = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.0.21:3000/api/v1/posts/${params.id}`
                );
                console.log(response.data);
                setData(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (e) {
                console.log(e);
            }
        };
        getDate();
    }, []);

    return (
        <>
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
            <button onClick={deleteBoard}>삭제하기</button>
        </>
    );
};

export default BoardUpdate;
