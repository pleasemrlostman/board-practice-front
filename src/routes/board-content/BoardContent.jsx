import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const BoardContent = ({ location }) => {
    const history = useHistory();
    const goBackPage = () => {
        history.goBack();
    };

    const params = useParams();
    console.log(params);

    const [tableContentData, setTableContentData] = useState({});
    useEffect(() => {
        if (location.state === undefined) {
            alert("해당되는 페이지가 없습니다.");
            goBackPage();
        } else {
            const data = location.state.value;
            setTableContentData(data);
        }
    }, []);

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
            <Link to={`/board/${params.id}/update`}>수장하기</Link>
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
