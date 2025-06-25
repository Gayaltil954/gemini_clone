import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat, setCurrentView } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
    setCurrentView("chat"); // Switch to chat when loading a previous prompt
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div
          onClick={() => {
            newChat();
            setCurrentView("chat"); // Reset to chat view when new chat starts
          }}
          className="new-chat"
        >
          <img src={assets.plus_icon} alt="plus" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recently-entry"
              >
                <img src={assets.message_icon} alt="msg" />
                <p>{item.length > 18 ? `${item.slice(0, 18)}...` : item}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div
          className="bottom-item recently-entry"
          onClick={() => setCurrentView("help")}
        >
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div
          className="bottom-item recently-entry"
          onClick={() => setCurrentView("activity")}
        >
          <img src={assets.history_icon} alt="activity" />
          {extended && <p>Activity</p>}
        </div>
        <div
          className="bottom-item recently-entry"
          onClick={() => setCurrentView("settings")}
        >
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
