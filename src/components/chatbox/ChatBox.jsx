import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../Api/UserRequest";
import "./ChatBox.css";
import { addMessage, getMessages } from "../../Api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

function ChatBox({ chat, currentUserId, setSendMessage, recieveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  //fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);

        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);

        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };

    //sending message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    //sending message to socket server in realtime
    const recieverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, recieverId });
  };

  //scrolling to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="friend_list">
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER +
                        "default_profile_pic.jpg"
                  }
                  className="followerImage"
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    marginRight: "2.5rem",
                  }}
                  alt=""
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.3px solid lightblue",
                  marginLeft: "-0.5rem",
                }}
              />
            </div>

            {/* Chatbox message */}
            <div className="chat-body">
              {messages.map((message) => {
                return (
                  <>
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUserId
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.text}</span>
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </>
                );
              })}
            </div>
            {/* chat sender */}

            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on chat to start conversation
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
