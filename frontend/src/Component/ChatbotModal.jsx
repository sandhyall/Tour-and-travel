import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "../api/axios";

import {
  Send,
  X,
  Bot,
} from "lucide-react";

export default function ChatbotModal({
  open,
  onClose,
}) {
 const [messages, setMessages] =
  useState([
    {
      role: "assistant",
      content:
        "Welcome to Wales Travel ✈️🏔️\nHow can I help you today?",
    },
  ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    if (open) {
      fetchHistory();
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchHistory =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const { data } =
          await axios.get(
            "/chatbot/history",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };

const sendMessage = async () => {
  if (!input.trim()) return;

  const currentInput = input;
  setInput("");
  setLoading(true);

  setMessages((prev) => [
    ...prev,
    { role: "user", content: currentInput },
  ]);

  try {
    const { data } = await axios.post("/chatbot/send", {
      message: currentInput,
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

  } catch (err) {
    console.log(err);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "AI is temporarily unavailable. Try again later.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 flex justify-end">

      <div className="w-full max-w-md h-full bg-white flex flex-col">

        {/* Header */}

        <div className="bg-black text-white p-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">

              <Bot />

            </div>

            <div>
              <h2 className="font-bold text-lg">
                Travel AI Assistant
              </h2>

              <p className="text-xs text-gray-300">
                Online now
              </p>
            </div>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

         {messages.map((msg, index) => (
    <div
      key={index}
      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
        msg.role === "user"
          ? "ml-auto bg-emerald-500 text-black"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {msg.content}
              </div>
            )
          )}

          {loading && (
            <div className="bg-white border px-4 py-3 rounded-2xl w-fit">
              AI is typing...
            </div>
          )}

          <div ref={bottomRef} />

        </div>

        {/* Input */}

        <div className="p-4 border-t flex gap-3">

          <input
            type="text"
            placeholder="Ask about trips, trekking, tours..."
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
            className="flex-1 border rounded-2xl px-4 py-3 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center"
          >
            <Send />
          </button>

        </div>

      </div>

    </div>
  );
}