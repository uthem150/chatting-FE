import { useEffect } from "react";
import "./App.css";
import socket from "./server";
import { useState } from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("message List", messageList);

  //컴포넌트가 처음 마운트될 때 askUserName호출
  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message)); //새로 받은 message를 기존의 state 뒤에 덧붙이기
    });
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("이름을 입력하세요"); //사용자에게 이름을 입력받기 위해 prompt 창 띄움
    console.log(userName, "님이 입장했습니다");

    // 서버에 "login" 이벤트와 함께 userName 보냄 - .emit(대화의 제목, 보낼 내용, 콜백 함수)
    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };
  const sendMessage = (event) => {
    event.preventDefault(); //새로고침 방지
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
      if (res?.ok) {
        setMessage(""); // 메시지 전송 후 입력 필드 비우기
      }
    });
  };
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
