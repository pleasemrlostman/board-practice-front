import axios from "axios";
import React, { useEffect } from "react";

const Board = () => {
    useEffect(() => {
        const getDate = async () => {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                console.log(response);
            } catch {}
        };
        getDate();
    }, []);

    return <div>sdsdsdsd</div>;
};

export default Board;
