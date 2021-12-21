import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { checkCookie, checkToken } from "modules/cookies/cookies";

const BoardContent = ({ location }) => {
    const [cookies, removeCookie] = useCookies(["login"]);
    const [decode, setDecode] = useState("");
    const [tableContentData, setTableContentData] = useState({});
    const [loading, setLoading] = useState(false);
    const [realConfig, setRealConfig] = useState({});
    const params = useParams();
    const boardIndex = params.id;
    const history = useHistory();
    const goBackPage = () => {
        history.goBack();
    };
    const logOut = () => {
        let now = new Date();
        let yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        removeCookie("login", null, {
            path: "/",
            expires: yesterday,
            httpOnly: false,
        });
        window.location.replace("/");
    };

    useEffect(() => {
        if (boardIndex === undefined) {
            alert("해당되는 페이지가 없습니다.");
            goBackPage();
        } else {
            const APIURL__POST = `http://localhost:8080/api/v1/posts/${boardIndex}`;
            setDecode(jwt_decode(cookies.login.data));
            let config = checkCookie(cookies);
            setRealConfig(config);
            checkToken(APIURL__POST, config, logOut, setTableContentData);
            setLoading(true);
        }
    }, []);

    const deleteBoard = async () => {
        // 가져온 오브젝트의 넘버값을 삭제시켜야함
        console.log(boardIndex);
        try {
            axios
                .delete(
                    `http://localhost:8080/api/v1/posts/${boardIndex}`,
                    realConfig
                )
                .then((response) => {
                    alert("삭제가 완료됐습니다!");
                    history.push("/board");
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {loading === false ? (
                <div>로딩중.....</div>
            ) : (
                <div>
                    <button onClick={goBackPage}>뒤로가기</button>
                    <TableContentTable>
                        <thead>
                            <tr>
                                <td>번호: {tableContentData.postSeq}</td>
                                <td>제목: {tableContentData.title}</td>
                                <td>이메일: {tableContentData.email}</td>
                                <td>
                                    작성일/수정일:{" "}
                                    {tableContentData.modifiedDate}
                                </td>
                                <td>조회수: {tableContentData.count}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4}>{tableContentData.content}</td>
                            </tr>
                        </tbody>
                    </TableContentTable>

                    {decode.sub === tableContentData.email ? (
                        <BtnWrap>
                            <BTN to={`/board/${params.id}/update`}>
                                수정하기
                            </BTN>
                            {/* <BTN onClick={deleteBoard}>삭제하기</BTN> */}
                            <button onClick={deleteBoard}>삭제하기</button>
                        </BtnWrap>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default BoardContent;
const TableContentTable = styled.table`
    border: 1px solid red;
    width: 100%;
    thead {
        td {
            border: 1px solid red;
            text-align: center;
        }
    }
    tbody {
        td {
            border: 1px solid blue;
            text-align: center;
        }
    }
`;
const BtnWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;
const BTN = styled(Link)`
    display: block;
    width: fit-content;
    background-color: #337aee;
    padding: 0.25rem;
    border: 1px solid #337aee;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
`;
