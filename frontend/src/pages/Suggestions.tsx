const Suggestions = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💡 Smart Suggestions</h2>
      <p>
        Here you'll receive personalized task recommendations powered by Gemini AI.
        In future, this section can automatically suggest things like:
      </p>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        <li>“Review weekly summary”</li>
        <li>“Follow up on pending tasks”</li>
        <li>“Time-block your calendar for focused work”</li>
      </ul>
    </div>
  );
};

export default Suggestions;
