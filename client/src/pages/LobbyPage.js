import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {codeblocksdata} from '../data/data';
import './LobbyPage.css'; // Import the CSS file here


const LobbyPage = () => {

// --------------------------------------   if we .......  -------------------------------------- 
/* 
    const [codeBlocks, setCodeBlocks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/codeblocks');
                if (Array.isArray(response.data.allCodeBlocks)) {
                    setCodeBlocks(response.data.allCodeBlocks);
                } else {
                    console.error('Code blocks not found in API response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
*/
// --------------------------------------   if we .......  -------------------------------------- 

return (
    <div className="lobby-container">
        <h1 className="lobby-title">Choose Your Code Block</h1>
        <ul className="code-block-list">
            {codeblocksdata.map((block) => (
                <li key={block._id} className="code-block-item">
                    <Link to={`code-block-page/${block._id}`} className="code-block-link">{block.title}</Link>
                </li>
            ))}
        </ul>
    </div>
);
};

export default LobbyPage;
