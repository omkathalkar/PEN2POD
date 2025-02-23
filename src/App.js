import React from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = React.useState('');
  const [sentences, setSentences] = React.useState([
    {
      id: 1,
      text: "The old house stood abandoned at the end of the street.",
      sentiment: "neutral"
    },
    {
      id: 2,
      text: "Sarah's heart raced as she approached the creaking door.",
      sentiment: "tense"
    }
  ]);

  const emotions = {
    joyful: { color: "#fef3c7", icon: "😊" },
    sad: { color: "#dbeafe", icon: "😢" },
    tense: { color: "#f3e8ff", icon: "😰" },
    neutral: { color: "#f3f4f6", icon: "😐" },
    positive: { color: "#dcfce7", icon: "😃" }
  };

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    
    const newSentences = inputText
      .split(/[.!?]+/)
      .filter(text => text.trim().length > 0)
      .map((text, index) => ({
        id: Date.now() + index,
        text: text.trim(),
        sentiment: "neutral"
      }));

    setSentences([...sentences, ...newSentences]);
    setInputText('');
  };

  const handleSentimentChange = (id, newSentiment) => {
    setSentences(sentences.map(sentence => 
      sentence.id === id ? { ...sentence, sentiment: newSentiment } : sentence
    ));
  };

  return (
    <div className="app-container">
      <div className="content">
        {/* Header */}
        <div className="header">
          <h1 className="title">PEN2POD</h1>
          <button className="generate-button">Generate Audio</button>
        </div>

        {/* Text Input */}
        <div className="input-section">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your paragraph here..."
            className="text-input"
          />
          <button onClick={handleTextSubmit} className="submit-button">
            Add Sentences
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Sentences */}
          <div className="sentences-container">
            {sentences.map((sentence) => (
              <div
                key={sentence.id}
                className="sentence-card"
                style={{ backgroundColor: emotions[sentence.sentiment].color }}
              >
                <span className="emotion-icon">{emotions[sentence.sentiment].icon}</span>
                <div className="sentence-content">
                  <p>{sentence.text}</p>
                  <div className="sentence-controls">
                    <select
                      value={sentence.sentiment}
                      onChange={(e) => handleSentimentChange(sentence.id, e.target.value)}
                      className="sentiment-select"
                    >
                      {Object.keys(emotions).map(emotion => (
                        <option key={emotion} value={emotion}>
                          {emotion.charAt(0).toUpperCase() + emotion.slice(1)} {emotions[emotion].icon}
                        </option>
                      ))}
                    </select>
                    <button className="preview-button">Preview</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Settings Panel */}
          <div className="settings-panel">
            <h2>Voice Settings</h2>
            <div className="settings-content">
              <div className="setting-item">
                <label>Voice Type</label>
                <select className="voice-select">
                  <option>Natural Voice 1 👨</option>
                  <option>Natural Voice 2 👩</option>
                  <option>Natural Voice 3 🤖</option>
                </select>
              </div>
              <div className="setting-item">
                <label>Speed</label>
                <input type="range" min="0.5" max="2" step="0.1" />
              </div>
              <div className="setting-item">
                <label>Pitch</label>
                <input type="range" min="0.5" max="2" step="0.1" />
              </div>
              <button className="reset-button">Reset Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;