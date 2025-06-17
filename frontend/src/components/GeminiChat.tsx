import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: prompt }]);
    setPrompt("");

    try {
      const res = await fetch("/api/assistant/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Something went wrong. Please try again." },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          className="fixed bottom-4 right-4 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaComments size={20} />
        </button>
      )}

      {/* Chatbot Box */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-[450px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-cyan-600 text-white">
            <span>Gemini Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.type === "user"
                    ? "ml-auto bg-cyan-100 dark:bg-cyan-800 text-right"
                    : "bg-white dark:bg-gray-700 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t dark:border-gray-600 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask something..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-3 py-1 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            />
            <button
              onClick={handleAsk}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded"
              title="Send"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChat;
