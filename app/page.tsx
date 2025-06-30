"use client";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);


  return (
  <>
  <div className="flex flex-col bg-gray-900 h-screen text-white p-4 ">
    <header className="text-6xl font-extrabold flex justify-center">
      <h1>Chat with <span className="underline underline-offset-2 ">AI </span>ft.
      <span className="text-yellow-400">Groq</span></h1>
    </header>

    <main className="flex-1 overflow-y-auto flex justify-center mt-6 scrollbar-hide item ">
      <div className="flex flex-col w-full space-y-4 px-4 max-w-2xl ">
        {messages.map((m) => (
          <div
          key={m.id}
          className={`rounded-lg w-fit max-w-[75%] break-words whitespace-pre-wrap ml-20 ${
            m.role === "user" 
            ? "bg-blue-600  text-white px-2 py-2"
            : "bg-gray-500 text-gray-200 px-2 py-2 "
          }`}>
            <div >
              {m.role === "user"
              ? (<span className="font-semibold mr-1">User : </span>)
              : (<span className="font-semibold mr-1">Llama</span>)
              }
              {m.content}
              </div>
          </div>
        ))}
        <div ref={bottomRef}/>
      </div>
    </main>

    <form 
    onSubmit={handleSubmit}
    className="flex justify-center mt-5">
         <div className="w-full max-w-2xl px-4">
            <input
              type="text"
              value={input}
              disabled ={isLoading}
              onChange={handleInputChange}
              className="w-full rounded-full border border-white bg-gray-800 text-white px-4 py-3 mb-5 focus:outline-none"
              placeholder="Type your message..."
            />
          </div>
    </form>

  </div>
  </>
  );
}
