import React, { useEffect, useState } from "react";
import { getCurrentUser, fetchAuthSession } from '@aws-amplify/auth';


const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://i9et39gwnj.execute-api.eu-north-1.amazonaws.com/history",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  //       }

  //       const data = await response.json();
  //       console.log("History API response:", data);
  //       setHistory(data.items || []);
  //     } catch (err) {
  //       console.error("Fetch history error:", err);
  //       setError("Failed to load history. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHistory();
  // }, []);
  useEffect(() => {
    const fetchUserAndHistory = async () => {
      try {
        const user = await getCurrentUser();  // fetch current user info
        console.log("Logged-in user ID:", user.username);
    
        const session = await fetchAuthSession();  // fetch tokens
        const token = session.tokens?.idToken?.toString();
    
        console.log("Fetched JWT token:", token);
    
        const response = await fetch("https://i9et39gwnj.execute-api.eu-north-1.amazonaws.com/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // ✅ use token here
          },
        });
    
        const data = await response.json();
        setHistory(data.items || []);
      } catch (err) {
        console.error("Error fetching user or history:", err);
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    }
  
    fetchUserAndHistory();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#001f3f",
        color: "#ffffff",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "100vw",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
          padding: "30px",
          color: "#001f3f",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem" }}>
          📜 History
        </h2>

        {loading && <p style={{ textAlign: "center" }}>Loading history...</p>}
        {error && (
          <p style={{ textAlign: "center", color: "#e74c3c" }}>{error}</p>
        )}
        {!loading && history.length === 0 && (
          <p style={{ textAlign: "center" }}>No history entries yet.</p>
        )}

        {history.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#f5f9ff",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              border: "1px solid #ccd6e0",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <p style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong>Type:</strong> {item.type}
            </p>
            <p style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong>Text:</strong> {item.inputText}
            </p>
            <p style={{ marginBottom: "10px", fontSize: "16px" }}>
              <strong>Sentiment:</strong> {item.sentiment}
            </p>
            <p style={{ fontSize: "14px", color: "#555" }}>
              <strong>Timestamp:</strong>{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>

            {item.audio && (
              <audio controls style={{ marginTop: "10px", width: "100%" }}>
                <source src={`data:audio/mp3;base64,${item.audio}`} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
