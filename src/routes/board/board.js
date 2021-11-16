import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Board = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const getDate = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/pleasemrlostman/board-practice-front/main/src/assets/json/data.json"
                );
                setTableData(response.data);
            } catch {}
        };
        getDate();
    }, []);

    return (
        <div>
            <FrontTable>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((value, index) => {
                        return (
                            <tr>
                                <td>{value.pno}</td>
                                <td>{value.title}</td>
                                <td>{value.id}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </FrontTable>
        </div>
    );
};

export default Board;

const FrontTable = styled.table`
    border: 1px solid red;
    width: 100%;
    thead {
        th {
            border: 1px solid blue;
            text-align: center;
            :first-child {
                width: 5%;
            }
        }
    }
    tbody {
        td {
            border: 1px solid green;
            text-align: center;
        }
    }
`;
