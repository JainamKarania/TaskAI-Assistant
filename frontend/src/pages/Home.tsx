import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const boxRef = useRef(null);

  const handleAsk = async () => {
  try {
    const res = await fetch("/api/assistant/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const errText = await res.text(); // read raw body
      console.error("Error from API:", res.status, errText);
      setResponse(`Error ${res.status}: ${errText}`);
      return;
    }

    const data = await res.json();
    setResponse(data.response);
  } catch (error) {
    console.error("Network or parsing error:", error);
    setResponse("Something went wrong while connecting to Gemini.");
  }
};

  useEffect(() => {
    gsap.fromTo(boxRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
  }, [response]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ask Gemini</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your prompt..."
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ask
      </button>
      {response && (
        <div
          ref={boxRef}
          className="mt-6 p-4 bg-white border rounded shadow"
        >
          <h3 className="font-bold mb-2">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
