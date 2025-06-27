import React, { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import TextToSpeech from "./TextToSpeech";
import SpeechToText from "./SpeechToText";
import History from "./History";
import Footer from "./Footer";

function App() {
  const [mode, setMode] = useState("text-to-speech");

  return (
    <Authenticator signUpAttributes={['email']}>
      {({ signOut, user }) => (
        <div
          className="App"
          style={{
            minHeight: "98vh",
            backgroundColor: "#001f3f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <header
            style={{
              width: "100%",
              maxWidth: "1200px",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "2.5rem",
                margin: "0 0 20px",
                wordBreak: "break-word",
              }}
            >
              EmotionCast
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <label
                htmlFor="modeSelect"
                style={{
                  color: "#ffffff",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                }}
              >
                Choose Mode:
              </label>
              <select
                id="modeSelect"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                style={{
                  width: "250px",
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#003366",
                  color: "#ffffff",
                  outline: "none",
                  transition: "background-color 0.3s ease",
                }}
              >
                <option value="text-to-speech">Text to Speech</option>
                <option value="speech-to-text">Speech to Text</option>
                <option value="history">History</option>
              </select>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p style={{ color: "#ffffff", fontSize: "1rem" }}>
                Welcome, <strong>{user?.username}</strong>!
              </p>
              <button
                onClick={signOut}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  backgroundColor: "#ff4136",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </div>
          </header>

          <main
            style={{
              width: "100%",
              maxWidth: "800px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            {mode === "text-to-speech" && <TextToSpeech />}
            {mode === "speech-to-text" && <SpeechToText />}
            {mode === "history" && <History />}
          </main>

          <Footer />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
