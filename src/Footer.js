import React, { useRef, useState, useEffect } from "react";

const Footer = () => {
  const messages = [
    "☕ Fueled by caffeine and clever hacks.",
    "💻 Running on JavaScript and sheer will.",
    "🐛 Debugging one bug at a time.",
    "🎯 Targeting perfection, drinking coffee meanwhile.",
    "🚀 Deploying dreams with every cup.",
    "🔥 Code, compile, coffee, repeat.",
    "🎧 Coding with lo-fi beats and espresso shots.",
    "🛠️ Pranav is probably fixing something right now.",
    "📟 Systems stable... until more coffee is needed.",
    "😴 Sleep is temporary. Code is forever.",
  ];

  const [currentMsg, setCurrentMsg] = useState("");
  const messageRef = useRef(null);

  // useEffect(() => {
  //   const updateMessage = () => {
  //     const msg = messages[Math.floor(Math.random() * messages.length)];
  //     setCurrentMsg(msg);
  
  //     const el = messageRef.current;
  //     if (!el) return;
  
  //     el.classList.remove("animate-typing");
  //     void el.offsetWidth; // Trigger reflow
  //     el.classList.add("animate-typing");
  //   };
  
  //   const interval = setInterval(updateMessage, 4000);
  //   updateMessage(); // Initial message
  
  //   return () => clearInterval(interval);
  // }, [messages]); // ✅ Include messages as dependency
  useEffect(() => {
    const updateMessage = () => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMsg(msg);
  
      const el = messageRef.current;
      if (!el) return;
  
      el.classList.remove("animate-typing");
      void el.offsetWidth; // Trigger reflow
      el.classList.add("animate-typing");
    };
  
    const interval = setInterval(updateMessage, 4000);
    updateMessage(); // Initial message
  
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      style={{
        width: "100%",
        maxWidth: "1200px",
        marginTop: "40px",
        textAlign: "center",
        color: "#ffffff99",
        fontSize: "0.9rem",
      }}
    >
      <hr style={{ marginBottom: "20px", borderColor: "#ffffff33" }} />

      <p style={{ margin: "0 0 10px" }}>
        © {new Date().getFullYear()} EmotionCast - All rights reserved.
      </p>
      <p
        ref={messageRef}
        style={{
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          display: "inline-block",
          animation: "typing 3.5s steps(40, end) infinite",
        }}
      >
        Made with ❤️ by Pranav Mundhada | {currentMsg}
      </p>

      {/* Animation keyframes */}
      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
