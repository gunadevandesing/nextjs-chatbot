"use client";
import React, { useState, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatWrapper = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  return (
    <>
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </>
  );
};

export default ChatWrapper;
