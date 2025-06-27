// import React, { useState, useEffect, useRef } from 'react';

// const SpeechToText = () => {
//   const [listening, setListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [sentiment, setSentiment] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Sorry, your browser doesn't support Speech Recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;  // Only final results
//     recognition.continuous = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onerror = (e) => {
//       console.error("Speech recognition error:", e);
//       setListening(false);
//     };

//     recognition.onresult = (event) => {
//       const finalTranscript = event.results[0][0].transcript.trim();
//       setTranscript(finalTranscript);
//       handleSendForAnalysis(finalTranscript); // Send for sentiment analysis
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const handleSendForAnalysis = async (text) => {
//     try {
//       const response = await fetch(
//         'https://i9et39gwnj.execute-api.eu-north-1.amazonaws.com/sentiment',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ text,mode: 'speech-to-text' }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API call failed: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setSentiment(data.sentiment);
//     } catch (error) {
//       console.error("Sentiment analysis error:", error);
//     }
//   };

//   const handleToggleListening = () => {
//     if (!recognitionRef.current) return;
//     if (listening) {
//       recognitionRef.current.stop();
//     } else {
//       setTranscript("");
//       setSentiment(""); // Clear previous
//       recognitionRef.current.start();
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#001f3f',
//       padding: '20px',
//       color: '#ffffff',
//       fontFamily: '"Inter", sans-serif',
//     }}>
//       <div style={{
//         maxWidth: '600px',
//         width: '100%',
//         backgroundColor: '#ffffff',
//         borderRadius: '20px',
//         boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
//         padding: '40px',
//       }}>
//         <h2 style={{
//           textAlign: 'center',
//           color: '#001f3f',
//           marginBottom: '30px',
//           fontSize: '2rem'
//         }}>
//           🎙️ Speech-to-Text with Emotion
//         </h2>

//         <button
//           onClick={handleToggleListening}
//           style={{
//             width: '100%',
//             padding: '16px',
//             fontSize: '16px',
//             background: listening ? '#ff4136' : '#001f3f',
//             color: '#ffffff',
//             border: 'none',
//             borderRadius: '12px',
//             cursor: 'pointer',
//             marginBottom: '30px',
//             transition: 'background-color 0.3s ease',
//           }}
//         >
//           {listening ? 'Stop Listening' : 'Start Listening'}
//         </button>

//         <textarea
//           rows="6"
//           value={transcript}
//           placeholder="Your speech will appear here..."
//           readOnly
//           style={{
//             width: '100%',
//             padding: '15px',
//             borderRadius: '12px',
//             border: '1px solid #ccd6e0',
//             fontSize: '16px',
//             resize: 'vertical',
//             color: '#001f3f',
//             backgroundColor: '#f5f9ff',
//             boxSizing: 'border-box',
//             outline: 'none',
//             marginBottom: '20px',
//           }}
//         />

//         {sentiment && (
//           <div style={{
//             backgroundColor: '#001f3f',
//             color: '#f1f6fb',
//             padding: '15px',
//             borderRadius: '12px',
//             textAlign: 'center',
//           }}>
//             Detected Emotion: <strong>{sentiment}</strong>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpeechToText;
import React, { useState, useEffect, useRef } from 'react';

const SpeechToText = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sentiment, setSentiment] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;  // Only final results
    recognition.continuous = true;       // 👈 CONTINUOUS so it doesn't auto-stop on silence
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setListening(false);
    };

    recognition.onresult = (event) => {
      const resultIndex = event.resultIndex;
      const finalTranscript = event.results[resultIndex][0].transcript.trim();
      setTranscript(prev => prev ? prev + " " + finalTranscript : finalTranscript);
      handleSendForAnalysis(finalTranscript);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleSendForAnalysis = async (text) => {
    try {
      const response = await fetch(
        'https://i9et39gwnj.execute-api.eu-north-1.amazonaws.com/sentiment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, mode: 'speech-to-text', }),  // include mode
        }
      );

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (error) {
      console.error("Sentiment analysis error:", error);
    }
  };

  const handleToggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      setSentiment("");
      recognitionRef.current.start();
    }
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#001f3f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '5px', // reduce outside padding
      boxSizing: 'border-box',
      fontFamily: '"Inter", sans-serif',
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
        padding: '25px',         // reduce internal box padding
        animation: 'fadeIn 0.6s ease-in-out',
        margin: '10px auto',     // tighter margin around box
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#001f3f',
          marginBottom: '20px',  // reduce title spacing
          fontSize: '2rem'
        }}>
          🎙️ Speech-to-Text with Emotion
        </h2>
  
        <button
          onClick={handleToggleListening}
          style={{
            width: '100%',
            padding: '14px',     // slightly smaller button padding
            fontSize: '16px',
            background: listening ? '#ff4136' : '#001f3f',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            marginBottom: '20px', // reduce space below button
            transition: 'background-color 0.3s ease',
          }}
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
  
        <textarea
          rows="6"
          value={transcript}
          placeholder="Your speech will appear here..."
          readOnly
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid #ccd6e0',
            fontSize: '16px',
            resize: 'vertical',
            color: '#001f3f',
            backgroundColor: '#f5f9ff',
            boxSizing: 'border-box',
            outline: 'none',
            marginBottom: '15px', // tighter spacing
          }}
        />
  
        {sentiment && (
          <div style={{
            backgroundColor: '#001f3f',
            color: '#f1f6fb',
            padding: '12px',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            Detected Emotion: <strong>{sentiment}</strong>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default SpeechToText;
