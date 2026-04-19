import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const formatResult = (value) => {
    if (!value) return "No result returned.";

    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return value;
      }
    }

    return String(value);
  };

  const analyze = async () => {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze", {
        text: text,
      });
      console.log("Response:", res.data);
      const output = res.data.result || res.data.error || res.data;
      setResult(formatResult(output));
    } catch (error) {
      console.error("Error:", error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trend Intelligence Agent</h1>

      <textarea
        rows="5"
        cols="50"
        placeholder="Enter trend or social media text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <h3>Result:</h3>
      <pre style={{ 
        backgroundColor: "#f5f5f5", 
        padding: "10px", 
        borderRadius: "5px",
        minHeight: "100px"
      }}>
        {result || "Results will appear here..."}
      </pre>
    </div>
  );
}

export default App;