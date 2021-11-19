import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import axios from "axios";

const BoardContent = ({ location }) => {
    const history = useHistory();
    const goBackPage = () => {
        history.goBack();
    };
    const params = useParams();
    const [tableContentData, setTableContentData] = useState({});
    let boardIndex = params.id;
    useEffect(() => {
        if (boardIndex === undefined) {
            alert("해당되는 페이지가 없습니다.");
            goBackPage();
        } else {
            const data = boardIndex;
            const getDate = async () => {
                try {
                    const response = await axios.get(
                        `http://192.168.0.21:3000/api/v1/posts/${data}`
                    );
                    setTableContentData(response.data);
                } catch (e) {
                    console.log(e);
                }
            };
            getDate();
            setTableContentData(data);
        }
    }, []);

    const deleteBoard = async () => {
        console.log(boardIndex);
        try {
            axios
                .delete(
                    `http://192.168.0.21:3000/api/v1/posts/${boardIndex}`,
                    tableContentData.pno
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
        <div>
            <button onClick={goBackPage}>뒤로가기</button>
            <TableContentTable>
                <thead>
                    <tr>
                        <td>번호: {tableContentData.pno}</td>
                        <td>제목: {tableContentData.title}</td>
                        <td>작성일/수정일: {tableContentData.modifiedDate}</td>
                        <td>조회수: {tableContentData.count}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>{tableContentData.content}</td>
                    </tr>
                </tbody>
            </TableContentTable>
            <BtnWrap>
                <BTN to={`/board/${params.id}/update`}>수정하기</BTN>
                <BTN onClick={deleteBoard}>삭제하기</BTN>
            </BtnWrap>
        </div>
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
