import "./Activity.css";


const Activity = () => {
  return (
    <div className="info-page">
      <h2>Activity Log</h2>
      <p>Here are your recent prompts and activities:</p>
      {/* You can enhance this later by loading actual activity data */}
      <ol>
        <li>Asked about road trip places</li>
        <li>Summarized urban planning</li>
        <li>Improved code readability</li>
      </ol>
    </div>
  );
};

export default Activity;
