import React, { useState } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {/* messageList 배열을 순회하면서 각 메시지 렌더링 */}
      {messageList.map((message, index) => {
        return (
          // 각 메시지에 고유한 key 부여
          <Container key={message._id || index} className="message-container">
            {/* 시스템이 주는 메세지 - ㅇㅇ님이 들어왔습니다 */}
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? ( //메시지를 보내는게 나라면
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  //동일한 사용자가 연속으로 메시지를 보낸 경우, 첫 메시지에만 프로필 이미지를 표시하고 나머지 메시지에서는 숨김
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
