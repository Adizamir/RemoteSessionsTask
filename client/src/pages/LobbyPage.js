import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import './LobbyPage.css'; 

const LobbyPage = () => {
    const [titles, setTitles] = useState([]); // State to store titles from WebSocket
    //const socket = io("http://localhost:3001");
    const socket = io("https://remotesessionstaskserver.onrender.com");

    useEffect(() => {
        socket.emit("get_titles");
        socket.on("receive_titles", (data)=>{
            setTitles(data.titles);
        });

        // Cleanup to avoid memory leaks
        return () => socket.off("receive_titles");
    }, []);

    return (
        <div className="lobby-container">
            <h1 className="lobby-title">Choose Your Code Block</h1>
            <ul className="code-block-list">
                {titles.map((title, index) => (
                    <li key={index} className="code-block-item">
                        <Link to={`code-block-page/${index}`} className="code-block-link">{title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LobbyPage;
