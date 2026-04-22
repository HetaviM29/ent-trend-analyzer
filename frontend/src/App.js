import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
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
  Bot,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Activity,
  HeartPulse,
  BrainCircuit,
  MessageSquare,
  Share2,
  ThumbsUp,
  PackageSearch
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./index.css";

const API_URL = "http://127.0.0.1:8000";

// --- Components ---

const Badge = ({ children, type = "default" }) => {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    primary: "bg-blue-100 text-blue-700"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.default}`}>
      {children}
    </span>
  );
};

const AuthenticityBadge = ({ status }) => {
  if (status === "Real") {
    return <Badge type="success"><ShieldCheck size={14} className="mr-1" /> Real</Badge>;
  } else if (status === "Misleading") {
    return <Badge type="danger"><ShieldAlert size={14} className="mr-1" /> Misleading</Badge>;
  }
  return <Badge type="warning">Needs Verification</Badge>;
};

// --- Pages ---

const LandingPage = () => {
  const navigate = useNavigate();
  const [previewTrends, setPreviewTrends] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/trends`).then(res => {
      setPreviewTrends(res.data.trends.slice(0, 5));
    }).catch(console.error);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Health Intelligence Platform</div>
          <h1 className="hero-title">Turn Health Trends into <span className="text-gradient">Product Opportunities</span></h1>
          <p className="hero-subtitle">
            Leverage AI to analyze millions of conversations, detect emerging health trends, and validate authenticity before your competitors.
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary btn-lg" onClick={() => navigate('/trends')}>
              Explore Live Trends <ArrowRight size={18} />
            </button>
            <button className="btn-secondary btn-lg" onClick={() => navigate('/analyzer')}>
              Try Custom Analyzer
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>Why Top FMCG & Pharma Companies Choose Us</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon bg-blue"><Activity size={24} color="#3b82f6" /></div>
            <h3>Real-time Trend Detection</h3>
            <p>Spot emerging health demands on social media months before they hit mainstream markets.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bg-emerald"><ShieldCheck size={24} color="#10b981" /></div>
            <h3>Authenticity Verification</h3>
            <p>Automatically filter out medical misinformation and focus on scientifically backed consumer needs.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bg-purple"><BrainCircuit size={24} color="#8b5cf6" /></div>
            <h3>AI Product Ideation</h3>
            <p>Generate personalized product concepts and marketing strategies tailored to your target audience instantly.</p>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="analytics-section py-8">
        <div className="section-header">
          <h2>Platform Analytics Overview</h2>
        </div>
        <div className="charts-grid mt-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', padding: '0 2rem' }}>
          
          <div className="chart-card p-6 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 className="mb-4 text-xl">Trend Growth Over Time</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Jan', ENT: 4000, Cardiology: 2400, MentalHealth: 2400, Skin: 1200 },
                  { name: 'Feb', ENT: 3000, Cardiology: 1398, MentalHealth: 3210, Skin: 1400 },
                  { name: 'Mar', ENT: 2000, Cardiology: 9800, MentalHealth: 4500, Skin: 1800 },
                  { name: 'Apr', ENT: 2780, Cardiology: 3908, MentalHealth: 6000, Skin: 2400 }
                ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                  <Legend />
                  <Line type="monotone" dataKey="MentalHealth" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Cardiology" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="ENT" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Skin" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card p-6 rounded-xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h3 className="mb-4 text-xl">Category Distribution</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'ENT', value: 320 },
                  { name: 'Cardiology', value: 450 },
                  { name: 'Mental Health', value: 890 },
                  { name: 'Skin', value: 650 }
                ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

      {/* Live Trends Preview */}
      <section className="preview-section">
        <div className="section-header flex-between">
          <h2>Live Trending Topics</h2>
          <button className="btn-text" onClick={() => navigate('/trends')}>View All Trends</button>
        </div>
        <div className="trends-grid">
          {previewTrends.map(trend => (
            <div key={trend.id} className="trend-preview-card" onClick={() => navigate(`/trend/${trend.id}`)}>
              <div className="trend-card-header">
                <Badge type="primary">{trend.category}</Badge>
                <AuthenticityBadge status={trend.authenticity} />
              </div>
              <h3 className="trend-keyword">{trend.keyword}</h3>
              <div className="trend-metrics">
                <span className="mentions"><MessageSquare size={14} /> {trend.mentions.toLocaleString()}</span>
                <span className="growth positive"><TrendingUp size={14} /> {trend.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const TrendsList = () => {
  const navigate = useNavigate();
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "All", platform: "All", authenticity: "All" });

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

  const filteredTrends = trends.filter(t => {
    const matchesSearch = t.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === "All" || t.category === filters.category;
    const matchesPlatform = filters.platform === "All" || t.platform === filters.platform;
    const matchesAuth = filters.authenticity === "All" || t.authenticity === filters.authenticity;
    return matchesSearch && matchesCategory && matchesPlatform && matchesAuth;
  });

  if (loading) return <div className="loading-state"><div className="spinner-large"></div></div>;

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header flex-between">
        <h1 className="page-title">Discover Trends</h1>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search hashtags or keywords..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label>Category</label>
          <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
            <option value="All">All Categories</option>
            <option value="ENT">ENT</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Skin">Skin</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Platform</label>
          <select value={filters.platform} onChange={e => setFilters({...filters, platform: e.target.value})}>
            <option value="All">All Platforms</option>
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="Twitter">Twitter</option>
            <option value="Reddit">Reddit</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Authenticity</label>
          <select value={filters.authenticity} onChange={e => setFilters({...filters, authenticity: e.target.value})}>
            <option value="All">All</option>
            <option value="Real">Real</option>
            <option value="Misleading">Misleading</option>
          </select>
        </div>
      </div>

      <div className="trends-grid mt-6">
        {filteredTrends.map(trend => (
          <div key={trend.id} className="trend-card interactive" onClick={() => navigate(`/trend/${trend.id}`)}>
            <div className="trend-card-header">
              <Badge type="primary">{trend.category}</Badge>
              <Badge>{trend.platform}</Badge>
            </div>
            <h3 className="trend-keyword">{trend.keyword}</h3>
            
            <div className="trend-stats-grid">
              <div className="stat-box">
                <span className="stat-label">Mentions</span>
                <span className="stat-value">{trend.mentions.toLocaleString()}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Growth</span>
                <span className="stat-value text-emerald-600">{trend.growth}</span>
              </div>
            </div>
            
            <div className="trend-card-footer">
              <AuthenticityBadge status={trend.authenticity} />
              <button className="btn-icon-round"><ArrowRight size={16} /></button>
            </div>
          </div>
        ))}
        {filteredTrends.length === 0 && (
          <div className="empty-state">No trends found matching your filters.</div>
        )}
      </div>
    </div>
  );
};

const TrendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Product Engine State
  const [form, setForm] = useState({ company_name: "", industry: "FMCG", target_audience: "", product_type: "" });
  const [ideas, setIdeas] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/trend/${id}`)
      .then(res => {
        setTrend(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await axios.post(`${API_URL}/generate-product`, {
        trend: trend.keyword,
        ...form
      });
      setIdeas(res.data.product_ideas);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="loading-state"><div className="spinner-large"></div></div>;
  if (!trend) return <div className="empty-state">Trend not found.</div>;

  return (
    <div className="page-content animate-fade-in">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back to Trends</button>
      
      <div className="details-header">
        <div className="flex items-center gap-4 mb-2">
          <Badge type="primary">{trend.category}</Badge>
          <AuthenticityBadge status={trend.authenticity} />
          {trend.sentiment === 'Positive' && <Badge type="success">Positive Sentiment</Badge>}
          {trend.sentiment === 'Negative' && <Badge type="danger">Negative Sentiment</Badge>}
        </div>
        <h1 className="details-title">{trend.keyword}</h1>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon"><MessageSquare size={20} /></div>
          <div>
            <div className="metric-label">Total Mentions</div>
            <div className="metric-value">{trend.mentions?.toLocaleString()}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-emerald-light text-emerald"><TrendingUp size={20} /></div>
          <div>
            <div className="metric-label">Growth Rate</div>
            <div className="metric-value text-emerald">{trend.growth}</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple-light text-purple"><Share2 size={20} /></div>
          <div>
            <div className="metric-label">Engagement</div>
            <div className="metric-value">{trend.engagement}</div>
          </div>
        </div>
      </div>

      <div className="content-grid two-cols">
        <div className="info-panel">
          <h3><ShieldCheck size={20} className="mr-2" /> Authenticity Analysis</h3>
          <p className="panel-text">{trend.reason}</p>
        </div>
        <div className="info-panel">
          <h3><BrainCircuit size={20} className="mr-2" /> Market Insights</h3>
          <p className="panel-text">{trend.insights}</p>
        </div>
      </div>

      <div className="product-engine-section mt-8">
        <div className="engine-header">
          <h2><PackageSearch size={24} className="mr-2" /> Product Suggestion Engine</h2>
          <p>Generate personalized product ideas based on this trend.</p>
        </div>
        
        <div className="engine-content">
          <form className="engine-form" onSubmit={handleGenerate}>
            <div className="form-group">
              <label>Company Name</label>
              <input required value={form.company_name} onChange={e => setForm({...form, company_name: e.target.value})} placeholder="e.g., HealthCorp" />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}>
                <option value="FMCG">FMCG</option>
                <option value="Pharma">Pharmaceuticals</option>
                <option value="Wellness">Wellness & Beauty</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target Audience</label>
              <input required value={form.target_audience} onChange={e => setForm({...form, target_audience: e.target.value})} placeholder="e.g., Gen Z, Athletes, Seniors" />
            </div>
            <div className="form-group">
              <label>Product Type (Optional)</label>
              <input value={form.product_type} onChange={e => setForm({...form, product_type: e.target.value})} placeholder="e.g., Supplement, Device, Topical" />
            </div>
            <button type="submit" className="btn-primary w-full mt-4" disabled={generating}>
              {generating ? "Generating Ideas..." : "Generate Product Ideas"}
            </button>
          </form>

          <div className="engine-results">
            {ideas ? (
              <div className="ideas-list">
                {ideas.map((idea, idx) => (
                  <div key={idx} className="idea-card animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <h4 className="idea-name">{idea.name}</h4>
                    <p className="idea-desc">{idea.description}</p>
                    <div className="idea-meta">
                      <strong>Why it works:</strong> {idea.reason}
                    </div>
                    <div className="idea-meta">
                      <strong>Strategy:</strong> {idea.marketing_strategy}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="engine-placeholder">
                <Lightbulb size={48} className="text-gray-300 mb-4" />
                <p>Fill out the form to generate AI-powered product concepts tailored to your brand.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Keep Categories and Analyzer mostly the same, just update styles
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
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-state"><div className="spinner-large"></div></div>;

  return (
    <div className="page-content animate-fade-in">
      <h1 className="page-title">Health Categories</h1>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card interactive">
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
      } catch { return value; }
    }
    return String(value);
  };

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post(`${API_URL}/analyze`, { text: text });
      setResult(formatResult(res.data.result || res.data.error || res.data));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content animate-fade-in">
      <h1 className="page-title">Custom Trend Analyzer</h1>
      <div className="info-panel mt-6">
        <div className="input-group">
          <label htmlFor="trendInput">What would you like to analyze?</label>
          <textarea
            id="trendInput"
            placeholder="e.g., The rise of herbal skincare routines in Gen Z..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className="btn-primary mt-4" onClick={analyze} disabled={loading || !text.trim()}>
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>

        {result && (
          <div className="result-section mt-6">
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

// --- Main App Layout ---

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-icon"><Activity size={24} color="#fff" /></div>
            <h2>HealthIntel</h2>
          </div>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} end>
              <LayoutDashboard size={20} />
              Home
            </NavLink>
            <NavLink to="/trends" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <TrendingUp size={20} />
              Trends Explorer
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <FolderOpen size={20} />
              Categories
            </NavLink>
            <NavLink to="/analyzer" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
              <Bot size={20} />
              AI Analyzer
            </NavLink>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Top Navbar */}
          <header className="topbar">
            <div className="search-bar-top">
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder="Quick search..." />
            </div>
            <div className="topbar-actions">
              <button className="icon-btn">
                <Bell size={20} />
              </button>
              <div className="user-profile">
                <img src="https://i.pravatar.cc/150?img=68" alt="User" />
                <span>Jane Doe</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="page-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/trends" element={<TrendsList />} />
              <Route path="/trend/:id" element={<TrendDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/analyzer" element={<Analyzer />} />
            </Routes>
          </div>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;