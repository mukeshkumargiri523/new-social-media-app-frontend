import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Search from "../../components/search/Search";
import { useSelector } from "react-redux";
import { userChats } from "../../Api/ChatRequest";
import Conversation from "../../components/conversation/Conversation";
import { Link } from "react-router-dom";
import Home from "../../img/svg/home-svgrepo-com.svg";
import Notify from "../../img/svg/bell-svgrepo-com.svg";
import Comment from "../../img/svg/comment-balloon-part-2-svgrepo-com.svg";
import Setting from "../../img/svg/setting-setting-svgrepo-com.svg";
import ChatBox from "../../components/chatbox/ChatBox";
import { io } from "socket.io-client";

function Chat() {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);

  const socket = useRef();

  //sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //recieving message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* left side */}
      <div className="Left-side-chat">
        <Search />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => {
              return (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    data={chat}
                    currentUserId={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="Right-side-chat">
        <div style={{ width: "23rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home">
              <img style={{ width: "30px" }} src={Home} alt="" />
            </Link>
            <Link to="../chat">
              <img style={{ width: "30px" }} src={Comment} alt="" />
            </Link>

            <img src={Notify} alt="" />
            <img src={Setting} alt="" />
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
