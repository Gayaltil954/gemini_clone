import { useState } from "react";
import "./Settings.css";



const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div className="info-page">
      <h2>Settings</h2>
      <p>Adjust your preferences below:</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable dark mode
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Receive notifications
        </label>
      </div>
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;
