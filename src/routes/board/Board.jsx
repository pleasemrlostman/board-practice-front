import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Cookies, CookiesProvider, useCookies } from "react-cookie";

const Board = () => {
    const [tableData, setTableData] = useState([]);
    const [initTableData, setInitTableData] = useState([]);
    const [currnetPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(30);
    const indexOfLast = currnetPage * postPerPage; //  1 * 10 = 10
    const indexOfFirst = indexOfLast - postPerPage; // 10 - 10 = 0

    const currentPosts = (tmp) => {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tableData.length / postPerPage); i++) {
        pageNumbers.push(i);
    }
    const history = useHistory();
    const accessToken = useSelector((state) => state.loginChangeReducer);
    const [cookies, setCookie, removeCookie] = useCookies(["login"]);


    
    let now = new Date();
    let yesterday = new Date();

    const sighOut =  () => {
        yesterday.setDate(now.getDate() - 1);
        removeCookie("login", null , {
            path: "/",
            expires: yesterday,
            httpOnly: false,
        });
        window.location.replace("/");
    }


    useEffect(() => {
        let config = {};
        if(cookies === null) {
            alert("로그인해라 세훈아")
            history.push("/")
        } else {
            config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Authorization" : cookies.login.data ,
                },
            };
        }
        const getDate = async () => {            
            try {
                const response = await axios
                .get("http://localhost:8080/api/v1/posts", config)
                .then((response) => {
                    console.log("헤더확인하자");
                    console.log(response.data);

                    {response.headers.status === "tokenInvalid" ? sighOut() : console.log("인벨리드아님")}

                    setTableData(response.data);
                });
            } catch (e) {
                console.log(e);
            }
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
                        <th>작성날짜</th>
                        <th>수정한날짜</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {currentPosts(tableData).map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.pno}</td>
                                <td>
                                    <StyledLink
                                        to={{
                                            pathname: `/board/${value.pno}`,
                                            state: {
                                                value: value,
                                            },
                                        }}
                                    >
                                        {value.title}
                                    </StyledLink>
                                </td>
                                <td>{value.user.email}</td>
                                <td>{value.createdDate}</td>
                                <td>{value.modifiedDate}</td>
                                <td>{value.count}</td>
                            </tr>
                        );
                    })}
                </tbody> */}
            </FrontTable>
            <Pagination
                itemClass={"pagination__li"}
                activePage={currnetPage}
                itemsCountPerPage={postPerPage}
                totalItemsCount={tableData.length}
                pageRangeDisplayed={currentPosts(tableData).length}
                onChange={(page) => {
                    console.log(page);
                    setCurrentPage(page);
                }}
            ></Pagination>
            <TableButtonWrap>
                <LinkButton to="/board-write">글 작성하기</LinkButton>
            </TableButtonWrap>
        </div>
    );
};

export default Board;

const FrontTable = styled.table`
    border: 1px solid red;
    width: 100%;
    font-size: 14px;
    thead {
        th {
            border: 1px solid blue;
            text-align: center;
            :first-child {
                width: 5%;
            }
            :nth-child(2) {
                width: 50%;
            }
            :nth-child(3) {
                width: 10%;
            }
            :nth-child(4) {
                width: 15%;
            }
            :nth-child(5) {
                width: 15%;
            }
            :last-child {
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

const TableButtonWrap = styled.div`
    border: 1px solid red;
`;

const StyledLink = styled(Link)`
    width: 100%;
    display: block;
    color: #171717;
    text-decoration: none;
    :hover {
        background-color: #171717;
        color: #fff;
    }
`;

const LinkButton = styled(Link)`
    background-color: #5838ee;
    color: #fff;
    text-decoration: none;
    height: 1rem;
`;
