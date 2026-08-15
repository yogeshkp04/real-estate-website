import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

interface ChatbotData {
  name?: string;
  phone?: string;
  email?: string;
  requirement?: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [chatData, setChatData] = useState<ChatbotData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationSteps = [
    {
      botMessage:
        "Hello! 👋 Welcome to Guru Shree Sai Realators. I'm here to help! What's your name?",
      dataKey: "name" as const,
    },
    {
      botMessage: "Nice to meet you! What's your contact number?",
      dataKey: "phone" as const,
      validation: (value: string) => /^[0-9]{10}$/.test(value),
      validationError: "Please enter a valid 10-digit phone number",
    },
    {
      botMessage: "What's your email address?",
      dataKey: "email" as const,
      validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      validationError: "Please enter a valid email address",
    },
    {
      botMessage:
        "What property are you interested in? (e.g., Residential, Commercial, Plots, etc.)",
      dataKey: "requirement" as const,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = () => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      text: conversationSteps[0].botMessage,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Validate current step
    const currentStepData = conversationSteps[currentStep];
    if (
      currentStepData.validation &&
      !currentStepData.validation(userInput)
    ) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: currentStepData.validationError || "Invalid input. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setUserInput("");
      return;
    }

    // Store data
    setChatData((prev) => ({
      ...prev,
      [currentStepData.dataKey]: userInput,
    }));

    setUserInput("");

    // Check if conversation is complete
    if (currentStep === conversationSteps.length - 1) {
      // Send data to backend
      await submitChatData({
        ...chatData,
        [currentStepData.dataKey]: userInput,
      });
    } else {
      // Move to next step
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      const nextBotMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "bot",
        text: conversationSteps[nextStep].botMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, nextBotMessage]);
    }
  };

  const submitChatData = async (finalData: ChatbotData) => {
    setIsSubmitting(true);
    try {
      // Send to backend API
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        const thankYouMessage: Message = {
          id: (Date.now() + 3).toString(),
          type: "bot",
          text: `Thank you, ${finalData.name}! 🎉 We've received your enquiry. Our team will contact you shortly on ${finalData.phone}. Have a great day!`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, thankYouMessage]);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 4).toString(),
        type: "bot",
        text: "Sorry, there was an issue submitting your enquiry. Please call us directly at 9880508077.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setChatData({});
    setCurrentStep(0);
    setUserInput("");
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          if (!isOpen) {
            resetChat();
          }
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-accent p-4 text-accent-foreground shadow-lg transition-all hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-80 overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
            <div>
              <h3 className="font-display text-lg font-semibold">GSSR Assistant</h3>
              <p className="text-xs opacity-90">We typically reply instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-primary/80"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto bg-background p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-border bg-card p-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your response..."
                disabled={isSubmitting}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting || !userInput.trim()}
                className="rounded-lg bg-accent p-2 text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
