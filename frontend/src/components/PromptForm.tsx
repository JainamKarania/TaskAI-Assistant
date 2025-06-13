import { useState } from "react";

const PromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/assistant/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something to Gemini..."
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Ask
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold mb-2">Gemini Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
