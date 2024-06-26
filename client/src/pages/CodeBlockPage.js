import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import styles from './CodeBlockPage.css'; 
import { dracula } from '@uiw/codemirror-theme-dracula';

const CodeBlockPage = () => {
    const { id } = useParams(); //Getting the routing id
    //State management 
    const [messageReceived, setMessageReceived] = useState("");
    const [value, setValue] = useState("");
    const [codeblock, setCodeBlock] = useState({})
    const [isMentor, setIsMentor] = useState(false);
    const socket = io("http://localhost:3001");
    //const socket = io("https://remotesessionstaskserver.onrender.com")

    // Function to send the message to the server
    const sendMessage = (message) => {
        socket.emit("client_send_new_message", { message, number: id });
    };
   
    useEffect(() => {
                
        const handleUnload = () => {
          socket.emit("user_disconnected", { number: id });
      };

    // Add event listener for page unload
        window.addEventListener("beforeunload", handleUnload);

      // Connect to socket server
        socket.emit("user_subscribe", { number: id });
        socket.on("all_clients_in_room_receive_message", (data) => {
            setMessageReceived(data.message); // This only updates messageReceived state
            setValue(data.message); // Add this line to update the CodeMirror content
        });
        socket.on("role", (data) => {
          setCodeBlock(data.codeBlockInformation)
          setIsMentor(data.message === "Mentor");
      });
      
      return () => {
        socket.off("all_clients_in_room_receive_message");
        socket.off("role");
        socket.off("user_disconnected");
    }; 
    }, []);
    
    return (
      <div className={styles.container}>
          <h1>Welcome To Code Block {id}</h1>
          <h2>Role: {isMentor ? "Mentor" : "Student"}</h2>
          <h3>Title: {codeblock.title}</h3>
          <h3>Task: { codeblock.codeContent}</h3>
          <CodeMirror
              value={value}
              height="200px"
              theme={dracula}
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => {
                  setValue(value); // Update the editor value
                  sendMessage(value); // Send current text to the server using sockets
              }}
              readOnly={isMentor}
          />
        <div>{codeblock.codeSolution === value ? "😀congratulations!! for solving the problem": ""}</div> 
      </div>
  );
};

export default CodeBlockPage;
