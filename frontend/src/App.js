import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    const saved = Object.keys(localStorage)
      .filter(key => key.startsWith("msg_"))
      .map(key => {
        try {
          return JSON.parse(localStorage[key]);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    setMessages(saved);
  }, [unlocked]);

  const handleUnlock = async () => {
    try {
      const response = await axios.post("http://localhost:3001/verify-password", { password });
      if (response.data.success) {
        setUnlocked(true);
      } else {
        alert("Wrong password!");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!unlocked) {
        handleUnlock();
      } else {
        // Mesaj gönderme işlevi
        handleSend();
      }
    }
  };

  const handleSend = async () => {
    const file = fileRef.current.files[0];
    const content = file ? URL.createObjectURL(file) : null;
    const type = file ? file.type.startsWith("image") ? "image" : "file" : "text";
    const time = new Date().toLocaleTimeString();

    const data = { type, content, text, time };
    localStorage.setItem(`msg_${Date.now()}`, JSON.stringify(data));
    setMessages([...messages, data]);
    setText("");

    const formData = new FormData();
    formData.append("text", text);
    formData.append("time", time);
    formData.append("type", type);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:3001/send", formData);
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu:", error);
    }

    fileRef.current.value = null;
  };

  const handleClear = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("msg_")) localStorage.removeItem(key);
    });
    setMessages([]);
  };

  return (
    <div className="app">
      {!unlocked ? (
        <div className="login">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // On key down for password input
          />
          <button onClick={handleUnlock}>Unlock</button>
        </div>
      ) : (
        <div className="chat">
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className="message">
                {msg.type === "text" && <p>{msg.text}</p>}
                {msg.type === "image" && <img src={msg.content} alt="preview" />}
                {msg.type === "file" && <a href={msg.content} download>Download File</a>}
                <span>{msg.time}</span>
              </div>
            ))}
          </div>
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Type a message" 
            onKeyDown={handleKeyDown} // On key down for message input
          />
          <input type="file" ref={fileRef} />
          <button onClick={handleSend}>Send</button>
          <button onClick={handleClear}>Clear Chat</button>
        </div>
      )}
    </div>
  );
}
