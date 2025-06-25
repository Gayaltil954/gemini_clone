import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

// New page components
import Help from "../Help/Help";
import Activity from "../Activity/Activity";
import Settings from "../Settings/Settings";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    currentView,
    setCurrentView,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
    onSent(promptText);
    setCurrentView("chat");
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {currentView === "chat" && (
          <>
            <div className="greet">
              <p>
                <span>Hello, Gayal.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            {!showResult && (
              <div className="cards">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Suggest beautiful places to see on an upcoming road trip"
                    )
                  }
                >
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="compass" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("Briefly summarize this concept: urban planning")
                  }
                >
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="bulb" />
                </div>
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("Brainstorm team bonding activities for our work retreat")
                  }
                >
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="message" />
                </div>
                <div
                  className="card"
                  onClick={() => handleCardClick("Improve the readability of the following code")}
                >
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="code" />
                </div>
              </div>
            )}

            {showResult && (
              <div className="result">
                <div className="user-prompt">
                  <img src={assets.user_icon} alt="User" />
                  <p>{recentPrompt}</p>
                </div>

                <div className="ai-response">
                  <img src={assets.gemini_icon || assets.user_icon} alt="Gemini" />
                  {loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                </div>
              </div>
            )}

            <div className="main-bottom">
              <div className="search-box">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Enter a prompt here"
                  onKeyDown={(e) => e.key === "Enter" && onSent(input)}
                />
                <div>
                  <img src={assets.gallery_icon} alt="Gallery" />
                  <img src={assets.mic_icon} alt="Mic" />
                  {input && (
                    <img onClick={() => onSent(input)} src={assets.send_icon} alt="Send" />
                  )}
                </div>
              </div>
              <p className="bottom-info">
                Gemini may display inaccurate info including about people. Double-check its
                responses. Your privacy and Gemini apps.
              </p>
            </div>
          </>
        )}

        {currentView === "help" && <Help />}
        {currentView === "activity" && <Activity />}
        {currentView === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Main;
