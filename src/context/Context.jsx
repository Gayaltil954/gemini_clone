import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
 

  
  
  // New state to track current view ('chat', 'help', 'activity', 'settings')
  const [currentView, setCurrentView] = useState("chat");

  // Animate word-by-word response
  const delayPara = (index, nextWord, totalWords) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
      if (index === totalWords - 1) {
        setLoading(false); // End loading when last word appears
      }
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Function called on prompt submission
  const onSent = async (prompt) => {
    const finalPrompt = prompt?.trim() || input.trim();
    if (!finalPrompt) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setInput("");
    setPrevPrompts((prev) =>
      prev.includes(finalPrompt) ? prev : [...prev, finalPrompt]
    );

    setRecentPrompt(finalPrompt);

    try {
      const response = await runChat(finalPrompt);

      // Format **bold** to <b> and * to <br>
      let formattedResponse = response
        .split("**")
        .map((part, index) => (index % 2 === 1 ? `<b>${part}</b>` : part))
        .join("")
        .split("*")
        .join("</br>");

      const words = formattedResponse.split(" ");
      words.forEach((word, index) => {
        delayPara(index, word + " ", words.length);
      });
    } catch (error) {
      console.error("Error during chat:", error);
      setLoading(false);
      setResultData("❌ Error: Could not get a response. Please try again.");
    }
  };

  const ContextValue = {
    input,
    setInput,
    onSent,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    newChat,
    currentView,    // <-- new state exposed here
    setCurrentView, // <-- new setter exposed here
    
  };

  return (
    <Context.Provider value={ContextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
