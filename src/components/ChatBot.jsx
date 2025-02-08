import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { TextField, IconButton, AppBar, Toolbar, Menu, MenuItem } from "@mui/material";
import { Send, Menu as MenuIcon, Refresh } from "@mui/icons-material";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything about cars or compare models." }
  ]);
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState(""); 
  const [menuAnchor, setMenuAnchor] = useState(null);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isUserAtBottomRef = useRef(true);

  const checkIfUserIsAtBottom = () => {
    if (!chatContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    return scrollHeight - scrollTop - clientHeight < 50;
  };

  useEffect(() => {
    const handleScroll = () => {
      isUserAtBottomRef.current = checkIfUserIsAtBottom();
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isUserAtBottomRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    // Validate input
    const isValidInput = (text) => {
      const trimmedText = text.trim();
      if (trimmedText.length === 0) return false; // Prevent empty input
      if (trimmedText.length > 500) return false; // Prevent overly long input
      if (/^[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]+$/.test(trimmedText)) return false; // Prevent only special characters
      return true;
    };
  
    if (!isValidInput(input)) return;
  
    const userMessage = { sender: "user", text: input };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);
    setTypingMessage("");
  
    try {
      const response = await axios.post("http://167.99.228.40:4000/chat", {
        query: input,
        history: messages.slice(-10), // Keeping the last 10 messages
      });
  
      const botResponse = response?.data?.response || "I couldn't process that. Try again!";
  
      simulateTyping(botResponse, [...messages, userMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Oops! Something went wrong. Try again!" }
      ]);
    }
  
    setLoading(false);
  };
  
  const simulateTyping = (text, newMessages) => {
    let index = 0;
    setTypingMessage("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setMessages([...newMessages, { sender: "bot", text }]);
        setTypingMessage("");
      }
    }, 1);
  };

  const resetChat = () => {
    setMessages([{ sender: "bot", text: "Hi! Ask me anything about cars or compare models." }]);
  };

  const navigate = useNavigate();


  return (
    <div className="flex flex-col h-screen w-screen bg-[#1E1E2E] text-white">
      <AppBar position="static" sx={{ backgroundColor: "#1E1E2E" }}>
  <Toolbar className="flex justify-between">
    <IconButton color="inherit" onClick={(e) => setMenuAnchor(e.currentTarget)}>
      <MenuIcon />
    </IconButton>
    <h1 className="text-3xl font-bold">AI Car Assistant</h1>
    <IconButton color="inherit" onClick={resetChat}>
      <Refresh />
    </IconButton>
  </Toolbar>
</AppBar>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
      <MenuItem
    onClick={() => {
      setMenuAnchor(null);
      navigate("/"); // Navigate to Home page
    }}
  >
    Home
  </MenuItem>
        
      </Menu>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-3 bg-[#12121F] overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 120px)", scrollbarWidth: "thin" }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl max-w-2xl text-lg shadow-md ${
              msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-700 text-white self-start"
            }`}
            style={{ wordWrap: "break-word" }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {msg.text}
            </ReactMarkdown>
          </motion.div>
        ))}

        {typingMessage && (
          <div className="p-3 rounded-xl max-w-2xl text-lg shadow-md bg-gray-700 text-white self-start">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {typingMessage}
            </ReactMarkdown>
          </div>
        )}

        {loading && <div className="text-gray-400 text-sm text-center">AI is typing...</div>}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 flex items-center bg-[#1E1E2E] border-t border-gray-700">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          InputProps={{
            style: { backgroundColor: "#252542", color: "white", borderRadius: "8px" },
          }}
        />
        <IconButton color="primary" onClick={sendMessage} className="ml-2">
          <Send style={{ color: "#FFA500" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chatbot;
