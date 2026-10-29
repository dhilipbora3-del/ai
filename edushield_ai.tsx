import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Calculator, Calendar, MessageSquare, 
  AlertTriangle, CheckCircle, Clock, Send, Plus, 
  Trash2, BarChart2, ShieldAlert, GraduationCap,
  Target, Info
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_SUBJECTS = [
  { id: 1, name: "Data Structures & Algorithms", code: "CS201", status: "at-risk", grade: 42, target: 60 },
  { id: 2, name: "Microprocessors & Interfacing", code: "CS202", status: "warning", grade: 55, target: 65 },
  { id: 3, name: "Automata Theory", code: "CS203", status: "safe", grade: 78, target: 70 },
];

const URGENT_TASKS = [
  { id: 1, title: "DSA Assignment 3", due: "Today, 11:59 PM", type: "assignment", subject: "CS201" },
  { id: 2, title: "Microprocessors Lab Report", due: "Tomorrow, 9:00 AM", type: "lab", subject: "CS202" },
  { id: 3, title: "Automata Midterm Make-up", due: "In 3 Days", type: "exam", subject: "CS203" }
];

// --- COMPONENTS ---

// 1. Dashboard Tab (Academic Detective)
const DashboardTab = ({ setTab }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Academic Overview</h2>
          <p className="text-slate-500">Welcome back. Here is your current standing.</p>
        </div>
        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          <span className="font-semibold">1 Subject At-Risk</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subjects List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-700">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Subject Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INITIAL_SUBJECTS.map(sub => (
              <div key={sub.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800">{sub.name}</h4>
                  {sub.status === 'at-risk' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {sub.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                  {sub.status === 'safe' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                </div>
                <div className="text-sm text-slate-500 mb-4">{sub.code}</div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Current Grade</span>
                    <span className="font-medium">{sub.grade}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${sub.status === 'at-risk' ? 'bg-red-500' : sub.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${sub.grade}%` }}
                    ></div>
                  </div>
                </div>
                {sub.status !== 'safe' && (
                  <button 
                    onClick={() => setTab('calculator')}
                    className="mt-4 w-full py-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
                  >
                    Calculate Recovery Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-slate-700">
            <Clock className="w-5 h-5 text-rose-500" />
            Urgent Deadlines
          </h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            {URGENT_TASKS.map(task => (
              <div key={task.id} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="mt-0.5">
                  <div className={`w-3 h-3 rounded-full ${task.type === 'exam' ? 'bg-red-500' : task.type === 'assignment' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{task.title}</h4>
                  <div className="text-xs text-slate-500 mt-1">{task.subject} • Due: {task.due}</div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setTab('planner')}
              className="w-full py-2 mt-2 text-sm text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-lg transition-colors"
            >
              Open Recovery Planner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Grade Calculator Tab (Deterministic Agent)
const CalculatorTab = () => {
  const [target, setTarget] = useState(60);
  const [items, setItems] = useState([
    { id: 1, name: "Midterm 1", weight: 20, score: 40 },
    { id: 2, name: "Assignment 1", weight: 10, score: 75 },
    { id: 3, name: "Final Exam", weight: 50, score: '' },
    { id: 4, name: "Project", weight: 20, score: '' }
  ]);

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value === '' ? '' : Number(value) } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: `Assessment ${items.length + 1}`, weight: 10, score: '' }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Deterministic Calculations
  const completedItems = items.filter(item => item.score !== '');
  const totalWeight = items.reduce((acc, curr) => acc + (curr.weight || 0), 0);
  const completedWeight = completedItems.reduce((acc, curr) => acc + (curr.weight || 0), 0);
  
  const currentEarned = completedItems.reduce((acc, curr) => acc + ((curr.weight || 0) * (curr.score || 0) / 100), 0);
  const currentAverage = completedWeight > 0 ? (currentEarned / (completedWeight / 100)) : 0;
  
  const remainingWeight = Math.max(0, 100 - completedWeight);
  const neededEarned = Math.max(0, target - currentEarned);
  const neededAverage = remainingWeight > 0 ? (neededEarned / (remainingWeight / 100)) : 0;

  const isPossible = remainingWeight >= neededEarned;
  const errorWeight = totalWeight !== 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Grade & Recovery Calculator</h2>
        <p className="text-slate-500">Deterministically calculate your current standing and what you need to pass.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-slate-700">Assessments</h3>
            {errorWeight && (
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Total weight must be 100%
              </span>
            )}
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-500 px-2">
              <div className="col-span-5">Name</div>
              <div className="col-span-3">Weight (%)</div>
              <div className="col-span-3">Score (%)</div>
              <div className="col-span-1"></div>
            </div>
            {items.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full text-sm p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-3">
                  <input 
                    type="number" 
                    value={item.weight} 
                    onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                    className="w-full text-sm p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-3">
                  <input 
                    type="number" 
                    placeholder="TBD"
                    value={item.score} 
                    onChange={(e) => updateItem(item.id, 'score', e.target.value)}
                    className="w-full text-sm p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button onClick={addItem} className="mt-4 flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors">
              <Plus className="w-4 h-4" /> Add Assessment
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-500" />
              Current Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500">Current Average</div>
                <div className="text-3xl font-bold text-slate-800">{currentAverage.toFixed(1)}%</div>
                <div className="text-xs text-slate-400 mt-1">Based on {completedWeight}% of total course</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-5 text-white">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-200">
              <Target className="w-5 h-5 text-indigo-400" />
              Recovery Goal
            </h3>
            
            <div className="mb-4">
              <label className="text-sm text-slate-400 block mb-1">Target Final Grade (%)</label>
              <input 
                type="number" 
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full bg-slate-700 border-slate-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="text-sm text-slate-400">Required avg. on remaining {remainingWeight}%</div>
              
              {remainingWeight === 0 ? (
                <div className="text-xl font-bold text-emerald-400 mt-1">Course Completed</div>
              ) : isPossible && neededAverage <= 100 ? (
                <div className="text-3xl font-bold text-indigo-400 mt-1">{neededAverage.toFixed(1)}%</div>
              ) : (
                <div className="text-xl font-bold text-red-400 mt-1">Mathematically Impossible</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Recovery Planner Tab (Planning Agent)
const PlannerTab = () => {
  const [subject, setSubject] = useState('Data Structures');
  const [days, setDays] = useState(5);
  const [hours, setHours] = useState(3);
  const [schedule, setSchedule] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSchedule = () => {
    setIsGenerating(true);
    // Simulate Agent processing delay
    setTimeout(() => {
      const mockPlan = Array.from({ length: days }).map((_, i) => ({
        day: `Day ${i + 1}`,
        focus: subject === 'Data Structures' 
          ? (i === 0 ? 'Arrays & Linked Lists' : i === 1 ? 'Stacks & Queues' : i === 2 ? 'Trees & Graphs' : i === 3 ? 'Sorting Algorithms' : 'Practice Exams')
          : (i === 0 ? 'Module 1 Review' : i === 1 ? 'Module 2 Review' : 'Practice Problems'),
        hours: hours,
        tasks: [
          `Read lecture notes for 45 mins`,
          `Complete 2 practice problems`,
          `Review mistakes`
        ]
      }));
      setSchedule(mockPlan);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          Recovery Schedule Generator
        </h2>
        <p className="text-slate-500 mb-6">Let the AI break down your study material into a manageable daily plan.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject to Recover</label>
            <select 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Data Structures</option>
              <option>Microprocessors</option>
              <option>Automata Theory</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Days Until Exam</label>
            <input 
              type="number" min="1" max="14" value={days} onChange={(e) => setDays(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hours / Day</label>
            <input 
              type="number" min="1" max="8" value={hours} onChange={(e) => setHours(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        
        <button 
          onClick={generateSchedule}
          disabled={isGenerating}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</>
          ) : (
            'Generate Personalized Timetable'
          )}
        </button>
      </div>

      {schedule && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-900">Your Action Plan for {subject}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {schedule.map((day, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-4">
                <div className="md:w-32 flex-shrink-0">
                  <div className="font-bold text-slate-800">{day.day}</div>
                  <div className="text-sm text-indigo-600 font-medium">{day.hours} Hours</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-700 mb-2">Topic: {day.focus}</h4>
                  <ul className="space-y-1">
                    {day.tasks.map((task, tid) => (
                      <li key={tid} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Learning Coach Tab (Tutoring Agent)
const CoachTab = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I am your AI Learning Coach. Struggling with a specific concept in Data Structures or Automata? Ask me for a quick explanation or revision notes!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI Responses based on keywords
    setTimeout(() => {
      let reply = "I can help with that! Make sure to review your syllabus to see how heavily this concept is weighted in your upcoming exam.";
      const lower = userMsg.text.toLowerCase();
      
      if (lower.includes('data structures') || lower.includes('dsa') || lower.includes('tree')) {
        reply = "Here's a quick revision for Trees in DSA: A tree is a hierarchical data structure consisting of nodes. The topmost node is the root. Common operations are traversal (In-order, Pre-order, Post-order). *Practice tip*: Try coding a binary search tree insertion from scratch today!";
      } else if (lower.includes('automata') || lower.includes('dfa') || lower.includes('nfa')) {
        reply = "Automata Theory tip: Every NFA can be converted to a DFA. Remember that a DFA has exactly one transition for every symbol from every state, while an NFA can have zero or multiple. Want a practice question on converting NFA to DFA?";
      } else if (lower.includes('fail') || lower.includes('pass') || lower.includes('help')) {
        reply = "Take a deep breath. Use the Calculator tab to see exactly what you need to pass. Then go to the Planner tab to map out your study time. You've got this!";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
      <div className="bg-indigo-600 p-4 text-white flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">AI Learning Coach</h2>
          <p className="text-indigo-200 text-xs">Always online • Ask for explanations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        <div className="text-center mb-6">
          <span className="text-xs bg-slate-200 text-slate-500 px-3 py-1 rounded-full font-medium">
            This is a safe space for learning.
          </span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 text-slate-500 shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a topic or concept..."
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-full px-4 py-2 text-sm outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};


// --- MAIN APP (Layout & State) ---
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'calculator', label: 'Grade Calculator', icon: Calculator },
    { id: 'planner', label: 'Recovery Planner', icon: Calendar },
    { id: 'coach', label: 'Learning Coach', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* Sidebar (Desktop) / Top Nav (Mobile) */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 z-10 sticky top-0 md:h-screen">
        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl tracking-tight">
            <ShieldAlert className="w-7 h-7" />
            EduShield AI
          </div>
          <button 
            className="md:hidden p-2 text-slate-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        
        <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block p-4 space-y-1`}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Tools & Agents</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}

          <div className="mt-8 px-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              <div className="flex items-center gap-1 font-bold mb-1">
                <Info className="w-4 h-4" /> Local Mode Active
              </div>
              Running fully in-browser. No backend required. Your data is private.
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <DashboardTab setTab={setActiveTab} />}
          {activeTab === 'calculator' && <CalculatorTab />}
          {activeTab === 'planner' && <PlannerTab />}
          {activeTab === 'coach' && <CoachTab />}
        </div>
      </main>
    </div>
  );
}