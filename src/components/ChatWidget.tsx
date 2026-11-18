"use client";

import React, { useState, useEffect, useRef } from "react";

const BACKEND_URL = "https://chatbotalbergue.netlify.app/chat";

interface Message {
  role: "bot" | "user";
  text: string;
}

export default function ChatWidget({ whatsapp }: { whatsapp?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Olá! Aqui é do atendimento do Albergue São Vicente de Paula. Como posso ajudar você hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let sid = localStorage.getItem("session_id");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("session_id", sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text }]);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, texto: text }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.resposta !== "string") {
        throw new Error("Backend indisponível");
      }
      setMessages((prev) => [...prev, { role: "bot", text: data.resposta }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Erro de conexão. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderFormattedText(text: string) {
    return text.split("\n").map((line, lineIdx) => (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && <br />}
        {line.split(/(\*\*[^*]+\*\*)/g).map((part, partIdx) =>
          part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
            <strong key={partIdx}>{part.slice(2, -2)}</strong>
          ) : (
            <React.Fragment key={partIdx}>{part}</React.Fragment>
          )
        )}
      </React.Fragment>
    ));
  }

  return (
    <>
      <style>{`
        #asv-chat-toggle {
          position: fixed;
          bottom: 78px;
          right: 14px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a73e8 0%, #0f4c81 100%);
          border: 2px solid #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(15, 76, 129, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }
        #asv-chat-toggle svg {
          width: 22px;
          height: 22px;
        }
        @media (min-width: 640px) {
          #asv-chat-toggle {
            width: 58px;
            height: 58px;
            right: 20px;
            bottom: 84px;
          }
          #asv-chat-toggle svg {
            width: 25px;
            height: 25px;
          }
        }
        @media (min-width: 1024px) {
          #asv-chat-toggle {
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
          }
          #asv-chat-toggle svg {
            width: 26px;
            height: 26px;
          }
        }
        #asv-chat-toggle:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 28px rgba(15, 76, 129, 0.42);
        }
        #asv-chat-window {
          position: fixed;
          bottom: 138px;
          right: 12px;
          width: calc(100vw - 24px);
          max-width: 340px;
          height: 410px;
          max-height: calc(100dvh - 165px);
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16), 0 4px 16px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
          font-family: var(--font-jakarta), 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          animation: asvChatSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 640px) {
          #asv-chat-window {
            bottom: 152px;
            right: 20px;
            width: 370px;
            max-width: calc(100vw - 32px);
            height: 520px;
            max-height: calc(100vh - 170px);
            border-radius: 22px;
          }
        }
        @media (min-width: 1024px) {
          #asv-chat-window {
            bottom: 98px;
            right: 24px;
            width: 380px;
            max-width: calc(100vw - 32px);
            height: 560px;
            max-height: calc(100vh - 120px);
            border-radius: 22px;
          }
        }
        #asv-chat-window .asv-header {
          background: #ffffff;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #f1f5f9;
        }
        #asv-chat-window .asv-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 12px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        #asv-chat-window .asv-bubble {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.5;
        }
        #asv-chat-window .asv-input-area {
          padding: 10px 12px;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
        }
        #asv-chat-window textarea {
          font-size: 16px !important;
        }
        @media (min-width: 640px) {
          #asv-chat-window .asv-header {
            padding: 16px 18px;
            gap: 12px;
          }
          #asv-chat-window .asv-messages {
            padding: 18px 16px;
            gap: 14px;
          }
          #asv-chat-window .asv-bubble {
            max-width: 78%;
            padding: 12px 15px;
            border-radius: 18px;
            font-size: 14.5px;
            line-height: 1.55;
          }
          #asv-chat-window .asv-input-area {
            padding: 12px 14px;
          }
          #asv-chat-window textarea {
            font-size: 14.5px !important;
          }
        }
        @keyframes asvChatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .asv-typing span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          margin: 0 2px;
          animation: asvBlink 1.3s infinite ease-in-out;
        }
        .asv-typing span:nth-child(2) { animation-delay: 0.2s; }
        .asv-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes asvBlink {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <button
        id="asv-chat-toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Abrir atendimento virtual"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </button>

      {isOpen && (
        <div id="asv-chat-window">
          {/* Header */}
          <div className="asv-header">
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "linear-gradient(135deg, #1a73e8 0%, #0f4c81 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 13.5,
                boxShadow: "0 4px 10px rgba(26, 115, 232, 0.22)",
                flexShrink: 0,
              }}
            >
              SV
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14.5, color: "#0f172a" }}>
                Albergue São Vicente
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.18)",
                  }}
                />
                <span>Atendimento online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                border: "none",
                background: "transparent",
                color: "#64748b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          {/* Mensagens (Fundo Branco Puro) */}
          <div className="asv-messages">
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-end",
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 9,
                    fontSize: 10.5,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: m.role === "bot" ? "#f0f7ff" : "#0f4c81",
                    color: m.role === "bot" ? "#1a73e8" : "#ffffff",
                    border: m.role === "bot" ? "1px solid #dbeafe" : "none",
                  }}
                >
                  {m.role === "bot" ? "SV" : "Eu"}
                </div>
                <div
                  className="asv-bubble"
                  style={{
                    background:
                      m.role === "bot"
                        ? "#ffffff"
                        : "linear-gradient(135deg, #1a73e8 0%, #0f4c81 100%)",
                    color: m.role === "bot" ? "#1e293b" : "#ffffff",
                    border: m.role === "bot" ? "1px solid #e2e8f0" : "none",
                    borderBottomLeftRadius: m.role === "bot" ? 5 : 16,
                    borderBottomRightRadius: m.role === "user" ? 5 : 16,
                    boxShadow:
                      m.role === "bot"
                        ? "0 2px 8px rgba(15, 23, 42, 0.04)"
                        : "0 4px 12px rgba(26, 115, 232, 0.18)",
                  }}
                >
                  {renderFormattedText(m.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 9,
                    fontSize: 10.5,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f0f7ff",
                    color: "#1a73e8",
                    border: "1px solid #dbeafe",
                  }}
                >
                  SV
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 16,
                    borderBottomLeftRadius: 5,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <span className="asv-typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="asv-input-area">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: 999,
                padding: "4px 6px 4px 16px",
              }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Digite sua dúvida..."
                style={{
                  flex: 1,
                  padding: "6px 0",
                  border: "none",
                  background: "transparent",
                  fontSize: 14.5,
                  color: "#0f172a",
                  resize: "none",
                  height: 22,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={send}
                disabled={loading}
                aria-label="Enviar mensagem"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: loading
                    ? "#cbd5e1"
                    : "linear-gradient(135deg, #1a73e8 0%, #0f4c81 100%)",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  style={{ marginLeft: 2 }}
                >
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
