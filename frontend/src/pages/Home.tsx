import { useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    try {
      const res = await fetch("/api/assistant/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setResponse(`Error ${res.status}: ${errorText}`);
        return;
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Something went wrong while contacting Gemini.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold">💬 Ask Gemini</h2>

      {/* Input and Button */}
      <div className="flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your task prompt..."
          className="flex-1 px-4 py-2 rounded border border-gray-300"
        />
        <button
          onClick={handleAsk}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          Ask
        </button>
      </div>

      {/* ✅ Gemini Suggestion */}
      <div className="bg-cyan-700/10 text-cyan-800 dark:text-cyan-300 px-4 py-3 rounded-lg shadow-inner border border-cyan-200 dark:border-cyan-600">
        💡 <strong>Gemini Suggests:</strong>
        <div className="mt-1 text-gray-700 dark:text-white">
          “Start your day with one key priority task.”
        </div>
      </div>

      {/* Response Box */}
      {response && (
        <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded shadow">
          <strong>Gemini's Response:</strong>
          <p className="mt-2 whitespace-pre-line text-gray-900 dark:text-gray-100">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
