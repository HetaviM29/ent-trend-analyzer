import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  LayoutDashboard, 
  TrendingUp, 
  FolderOpen, 
  Lightbulb, 
  Search, 
  RefreshCw,
  Bell,
  UserCircle,
  Bot
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./index.css";

const API_URL = "http://127.0.0.1:8000";

// --- Mock Data for Charts (Time Series) ---
const mockTimeSeriesData = [
  { name: 'Jan', ENT: 4000, Cardiology: 2400, MentalHealth: 2400, Skin: 1200 },
  { name: 'Feb', ENT: 3000, Cardiology: 1398, MentalHealth: 3210, Skin: 1400 },
  { name: 'Mar', ENT: 2000, Cardiology: 9800, MentalHealth: 4500, Skin: 1800 },
  { name: 'Apr', ENT: 2780, Cardiology: 3908, MentalHealth: 6000, Skin: 2400 },
  { name: 'May', ENT: 1890, Cardiology: 4800, MentalHealth: 7100, Skin: 2800 },
  { name: 'Jun', ENT: 2390, Cardiology: 3800, MentalHealth: 8500, Skin: 3400 },
];

const mockCategoryData = [
  { name: 'ENT', value: 320 },
  { name: 'Cardiology', value: 450 },
  { name: 'Mental Health', value: 890 },
  { name: 'Skin', value: 650 },
];

// --- Pages ---

const Overview = () => {
  return (
    <div>
      <h1 className="page-title">Overview</h1>
      
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Total Trends Detected</span>
          <span className="kpi-value">2,310</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Most Active Category</span>
          <span className="kpi-value">Mental Health</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Trending Topic Today</span>
          <span className="kpi-value" style={{ color: "var(--accent-color)" }}>Gut-Brain Axis</span>
        </div>
      </div>

      <div className="chart-card" style={{ height: "400px" }}>
        <h3>Trend Growth Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockTimeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
            <Legend />
            <Line type="monotone" dataKey="MentalHealth" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Cardiology" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="ENT" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Skin" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card" style={{ height: "400px" }}>
        <h3>Category Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockCategoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios.get(`${API_URL}/trends`)
      .then(res => {
        setTrends(res.data.trends);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching trends:", err);
        setLoading(false);
      });
  }, []);

  const filteredTrends = filter === "All" ? trends : trends.filter(t => t.category === filter);

  if (loading) return <div className="loading">Loading trends...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Trending Topics</h1>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
        >
          <option value="All">All Categories</option>
          <option value="ENT">ENT</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Skin">Skin</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Category</th>
              <th>Mentions Count</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrends.map(trend => (
              <tr key={trend.id}>
                <td style={{ fontWeight: 500 }}>{trend.keyword}</td>
                <td><span className="badge">{trend.category}</span></td>
                <td>{trend.mentions.toLocaleString()}</td>
                <td className="growth-positive">{trend.growth}</td>
              </tr>
            ))}
            {filteredTrends.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No trends found for this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then(res => {
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading categories...</div>;

  return (
    <div>
      <h1 className="page-title">Health Categories</h1>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <div className="category-header">
              <h3>{cat.name}</h3>
              <span className="category-count">{cat.count} trends</span>
            </div>
            <ul className="issue-list">
              {cat.top_issues.map((issue, i) => (
                <li key={i} className="issue-item">{issue}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const formatResult = (value) => {
    if (!value) return "No result returned.";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
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
      alert("Please enter a trend or some text to analyze.");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post(`${API_URL}/analyze`, { text: text });
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
    <div>
      <h1 className="page-title">Custom Trend Analyzer</h1>
      <div className="insight-section">
        <div className="input-group">
          <label htmlFor="trendInput">What would you like to analyze?</label>
          <textarea
            id="trendInput"
            placeholder="e.g., The rise of herbal skincare routines in Gen Z..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className="action-btn" onClick={analyze} disabled={loading || !text.trim()}>
          {loading ? (
            <>
              <div className="spinner"></div>
              Analyzing Trend...
            </>
          ) : (
            <>
              <Bot size={18} />
              Generate Insights
            </>
          )}
        </button>

        {result && (
          <div className="result-section">
            <div className="result-header">Analysis Result</div>
            <pre className="result-box">
              <code>{result}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/insights`)
      .then(res => {
        setInsights(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching insights:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Generating AI insights...</div>;
  if (!insights) return <div>Failed to load insights.</div>;

  return (
    <div>
      <h1 className="page-title">AI-Generated Insights</h1>
      
      <div className="insight-section">
        <h3><Lightbulb size={24} /> Trend Summary</h3>
        <p className="insight-text">{insights.summary}</p>
      </div>

      <div className="insight-section">
        <h3><TrendingUp size={24} /> Possible Causes</h3>
        <ul className="insight-text insight-list">
          {insights.causes.map((cause, i) => <li key={i}>{cause}</li>)}
        </ul>
      </div>

      <div className="insight-section">
        <h3><FolderOpen size={24} /> Suggested Product Ideas</h3>
        <ul className="insight-text insight-list">
          {insights.product_ideas.map((idea, i) => <li key={i}>{idea}</li>)}
        </ul>
      </div>
    </div>
  );
};

// --- Main App Layout ---

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>HealthIntel</h2>
          </div>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} end>
              <LayoutDashboard size={20} />
              Overview
            </NavLink>
            <NavLink to="/trends" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <TrendingUp size={20} />
              Trends
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <FolderOpen size={20} />
              Categories
            </NavLink>
            <NavLink to="/insights" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <Lightbulb size={20} />
              Insights
            </NavLink>
            <NavLink to="/analyzer" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <Bot size={20} />
              Analyzer
            </NavLink>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          
          {/* Top Navbar */}
          <header className="topbar">
            <div className="search-bar">
              <Search size={18} color="#64748b" />
              <input type="text" placeholder="Search trends, categories..." />
            </div>
            <div className="topbar-actions">
              <button className="icon-btn" onClick={handleRefresh} title="Refresh Data">
                <RefreshCw size={20} />
              </button>
              <button className="icon-btn">
                <Bell size={20} />
              </button>
              <button className="icon-btn">
                <UserCircle size={24} color="#3b82f6" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="page-container" key={refreshKey}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/analyzer" element={<Analyzer />} />
            </Routes>
          </div>

        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;