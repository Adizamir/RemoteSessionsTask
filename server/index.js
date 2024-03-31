//building the server
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
require('dotenv').config();

const rooms = {}
//CORS is a middleware between cliend and server
const cors= require("cors");
app.use(cors())
app.use(express.json());

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        //connection to front
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("user_subscribe", (data) => {
        console.log(`User ID from user (${socket.id}): insert into room number: ${data.number}`);
        const roomSize = io.sockets.adapter.rooms.get(data.number)?.size || 0;
        if (roomSize === 0) {
         rooms[data.number] = { mentor : socket.id}
         socket.emit("role",{message:"Mentor"})
        }
        else if(rooms[data.number].mentor == undefined) {
            rooms[data.number] = { mentor : socket.id}
            socket.emit("role",{message:"Mentor"})
        }
        else {
            socket.emit("role",{message:"Student"})
        }
        socket.join(data.number)

      });
                    
    //receive a message 
    socket.on("client_send_new_message", (data) => {
        console.log(`${socket.id} Send a message to everyone`);
        io.to(data.number).emit("all_clients_in_room_receive_message", data);
    });

    //user disconnected
    socket.on("user_disconnected" ,(data)  =>{
        console.log(`User Connected: ${socket.id}`);
        if(rooms[data.number].mentor == socket.id){
            delete rooms[data.number].mentor
         
        }
    });
    
});

server.listen(3001, () =>{
      console.log("SERVER IS RUNNING");
});

app.use('/', require('./routes/codeBlocks.route'));

mongoose.connect("mongodb+srv://adi444zamir:RVfwArfuAQ4IjhzT@backenddb.jqbg5hm.mongodb.net/CodeSharingProject?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connected to database!");
});
