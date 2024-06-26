import { io } from "socket.io-client";
const socket = io("http://localhost:5001"); //연결하고 싶은 백엔드 주소 입력
export default socket;
