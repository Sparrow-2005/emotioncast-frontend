import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://i9et39gwnj.execute-api.eu-north-1.amazonaws.com/sentiment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error(`API call failed: ${response.status} ${response.statusText}`);

      const responseData = await response.json();
      setSentiment(responseData.sentiment);

      if (responseData.audio) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(responseData.audio), c => c.charCodeAt(0))],
          { type: 'audio/wav' }
        );
        const newAudioUrl = URL.createObjectURL(audioBlob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(newAudioUrl);
      }
    } catch (error) {
      console.error("API call error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => { if (audioUrl) URL.revokeObjectURL(audioUrl); };
  }, [audioUrl]);

  return (
    <div style={{
        width: '100%',
        backgroundColor: '#001f3f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px', // smaller padding around everything
        boxSizing: 'border-box',
        fontFamily: '"Inter", sans-serif',
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
          padding: '25px',
          animation: 'fadeIn 0.6s ease-in-out',
          margin: '20px auto', // only small margin outside the box
        }}>
        <h2 style={{
          textAlign: 'center',
          color: '#001f3f',
          marginBottom: '30px',
          fontSize: '2rem'
        }}>🎤 EmotionCast</h2>

        <textarea
          rows="4"
          value={text}
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid #ccd6e0',
            fontSize: '16px',
            marginBottom: '25px',
            resize: 'vertical',
            boxSizing: 'border-box',
            outlineColor: '#001f3f',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            background: loading ? '#7a7a7a' : '#001f3f',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          {loading ? 'Processing...' : 'Send'}
        </button>

        {sentiment && (
          <div style={{ marginTop: '30px' }}>
            <p style={{ fontSize: '18px', color: '#001f3f' }}>
              Detected Sentiment: <strong>{sentiment}</strong>
            </p>
          </div>
        )}

        {audioUrl && (
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '18px', color: '#001f3f' }}>Generated Audio:</p>
            <audio controls src={audioUrl} style={{ width: '100%' }}></audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;
