import io from "socket.io-client";
const socket = io("ws://localhost:8000");
// socket.on("message", data => console.log(data))
// socket.emit("message","aaaa");
export default socket;