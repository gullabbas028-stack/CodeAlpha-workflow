import { useState } from "react";
import { Send, Paperclip, Smile, ChevronDown } from "lucide-react";
import { Avatar } from "../common/Avatar";
import { findUser, currentUser } from "../../data/mockData";

export default function TeamChatPanel({ messages: initial }) {
  const [messages, setMessages] = useState(initial);
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: `m${Date.now()}`, userId: currentUser.id, text: text.trim(), time: "Just now" }]);
    setText("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 flex items-center gap-1.5">
          Team Chat <ChevronDown size={15} className="text-gray-400" />
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 max-h-64">
        {messages.map((m) => {
          const user = findUser(m.userId);
          return (
            <div key={m.id} className="flex items-start gap-2.5">
              <Avatar user={user} size={30} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-gray-800">{user?.name}</span>
                  <span className="text-xs text-gray-400">{m.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-snug">{m.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400"
        />
        <button type="button" className="text-gray-400 hover:text-gray-600 p-1"><Paperclip size={18} /></button>
        <button type="button" className="text-gray-400 hover:text-gray-600 p-1"><Smile size={18} /></button>
        <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors">
          <Send size={14} /> Send
        </button>
      </form>
    </div>
  );
}
