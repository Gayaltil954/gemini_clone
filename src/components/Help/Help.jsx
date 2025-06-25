import "./Help.css";


const Help = () => {
  return (
    <div className="info-page">
      <h2>Help Center</h2>
      <p>Welcome to the help section. Here are some frequently asked questions and guides:</p>
      <ul>
        <li><b>How to start a new chat?</b> Click the "New Chat" button on the sidebar.</li>
        <li><b>How to use Gemini AI?</b> Enter your prompt and press Enter or click Send.</li>
        <li><b>Privacy concerns?</b> We do not store your conversations permanently.</li>
      </ul>
    </div>
  );
};

export default Help;
