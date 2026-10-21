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
      text: "Olá! Sou o atendente virtual do Albergue São Vicente de Paula. 😊 Como posso ajudar?",
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
          bottom: 82px;
          right: 20px;
          width: 60px;
          height: 60px;
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
        @media (min-width: 1024px) {
          #asv-chat-toggle {
            bottom: 24px;
            right: 24px;
          }
        }
        #asv-chat-toggle:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 28px rgba(15, 76, 129, 0.42);
        }
        #asv-chat-window {
          position: fixed;
          bottom: 152px;
          right: 16px;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 540px;
          max-height: calc(100vh - 180px);
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16), 0 4px 16px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
          font-family: var(--font-jakarta), 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          animation: asvChatSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 1024px) {
          #asv-chat-window {
            bottom: 98px;
            right: 24px;
            height: 560px;
            max-height: calc(100vh - 120px);
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
          <div
            style={{
              background: "#ffffff",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background: "linear-gradient(135deg, #1a73e8 0%, #0f4c81 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 10px rgba(26, 115, 232, 0.22)",
                flexShrink: 0,
              }}
            >
              SV
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>
                Albergue São Vicente
              </div>
              <div
                style={{
                  fontSize: 12,
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
                <span>Atendente virtual online</span>
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
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 16px",
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-end",
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 10,
                    fontSize: 11,
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
                  style={{
                    maxWidth: "78%",
                    padding: "12px 15px",
                    borderRadius: 18,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    background:
                      m.role === "bot"
                        ? "#ffffff"
                        : "linear-gradient(135deg, #1a73e8 0%, #0f4c81 100%)",
                    color: m.role === "bot" ? "#1e293b" : "#ffffff",
                    border: m.role === "bot" ? "1px solid #e2e8f0" : "none",
                    borderBottomLeftRadius: m.role === "bot" ? 5 : 18,
                    borderBottomRightRadius: m.role === "user" ? 5 : 18,
                    boxShadow:
                      m.role === "bot"
                        ? "0 2px 8px rgba(15, 23, 42, 0.04)"
                        : "0 4px 12px rgba(26, 115, 232, 0.18)",
                  }}
                >
                  {renderFormattedText(m.text)}
                  {m.role === "bot" && (
                    <>
                      <br />
                      <button
                        onClick={() => {
                          if (whatsapp) {
                            window.open(whatsapp, "_blank", "noopener,noreferrer");
                          } else {
                            setMessages((prev) => [
                              ...prev,
                              {
                                role: "bot",
                                text: "Entendido! Para falar diretamente com nossa equipe, entre em contato pelo telefone/WhatsApp (64) 3631-1437 ou presencialmente na Rua Miranda de Carvalho, 1929 – Jataí/GO. 🙏",
                              },
                            ]);
                          }
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 10,
                          fontSize: 12,
                          fontWeight: 500,
                          color: "#0f4c81",
                          border: "1px solid #cbd5e1",
                          borderRadius: 999,
                          padding: "5px 12px",
                          cursor: "pointer",
                          background: "#ffffff",
                        }}
                      >
                        👤 Falar com pessoa real
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 10,
                    fontSize: 11,
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
                    padding: "12px 15px",
                    borderRadius: 18,
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
          <div
            style={{
              padding: "12px 14px",
              background: "#ffffff",
              borderTop: "1px solid #f1f5f9",
            }}
          >
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
