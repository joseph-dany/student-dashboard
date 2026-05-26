// ============================================================
// STUDENT DASHBOARD - Premium SaaS EdTech Platform
// All screens: Login, Dashboard, Attendance, Assignments,
// Teachers, Timetable, Notifications, Fees, Profile
// ============================================================

import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── DESIGN TOKENS ──────────────────────────────────────────
const T = {
  indigo: "#4F46E5",
  violet: "#7C3AED",
  cyan: "#06B6D4",
  bg: "#0F172A",
  card: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.1)",
  glass: "rgba(255,255,255,0.08)",
};

// ─── DUMMY DATA ─────────────────────────────────────────────
const student = {
  name: "Joseph Daniel",
  roll: "CS2023-047",
  class: "B.Tech CSE",
  section: "Section A",
  semester: 5,
  gpa: 8.74,
  rank: 12,
  streak: 23,
  attendance: 87.5,
  avatar: null,
};

const performanceData = [
  { month: "Jan", score: 72, avg: 65 },
  { month: "Feb", score: 78, avg: 67 },
  { month: "Mar", score: 75, avg: 66 },
  { month: "Apr", score: 82, avg: 68 },
  { month: "May", score: 88, avg: 70 },
  { month: "Jun", score: 85, avg: 69 },
  { month: "Jul", score: 91, avg: 72 },
];

const subjectData = [
  { subject: "Math", marks: 88, color: "#4F46E5" },
  { subject: "Physics", marks: 76, color: "#7C3AED" },
  { subject: "Chem", marks: 82, color: "#06B6D4" },
  { subject: "English", marks: 91, color: "#10B981" },
  { subject: "CS", marks: 95, color: "#F59E0B" },
];

const attendancePie = [
  { name: "Present", value: 87.5, color: "#10B981" },
  { name: "Absent", value: 12.5, color: "#EF4444" },
];

const weeklyStudy = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 5.1 },
  { day: "Thu", hours: 2.8 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 6.2 },
  { day: "Sun", hours: 3.5 },
];

const subjects = [
  {
    id: 1, name: "Mathematics", icon: "∑", color: "#4F46E5",
    teacher: "Dr. Ramesh Kumar", marks: 88, total: 100,
    attendance: 92, assignments: 85, improvement: +6,
    progress: 88,
  },
  {
    id: 2, name: "Physics", icon: "⚛", color: "#7C3AED",
    teacher: "Prof. Anita Sharma", marks: 76, total: 100,
    attendance: 84, assignments: 78, improvement: -2,
    progress: 76,
  },
  {
    id: 3, name: "Chemistry", icon: "🧪", color: "#06B6D4",
    teacher: "Dr. Vikram Singh", marks: 82, total: 100,
    attendance: 89, assignments: 90, improvement: +4,
    progress: 82,
  },
  {
    id: 4, name: "English", icon: "📚", color: "#10B981",
    teacher: "Ms. Priya Nair", marks: 91, total: 100,
    attendance: 96, assignments: 95, improvement: +8,
    progress: 91,
  },
  {
    id: 5, name: "Computer Science", icon: "💻", color: "#F59E0B",
    teacher: "Prof. Karthik Iyer", marks: 95, total: 100,
    attendance: 98, assignments: 100, improvement: +12,
    progress: 95,
  },
];

const assignments = [
  {
    id: 1, title: "Data Structures Assignment", subject: "Computer Science",
    due: "2026-05-28", status: "pending", priority: "high",
    teacher: "Prof. Karthik Iyer", description: "Implement AVL Tree with rotations",
    submitted: false, marks: null,
  },
  {
    id: 2, title: "Calculus Problem Set", subject: "Mathematics",
    due: "2026-05-30", status: "pending", priority: "medium",
    teacher: "Dr. Ramesh Kumar", description: "Integration by parts – 20 problems",
    submitted: false, marks: null,
  },
  {
    id: 3, title: "Wave Optics Lab Report", subject: "Physics",
    due: "2026-05-25", status: "overdue", priority: "high",
    teacher: "Prof. Anita Sharma", description: "Document diffraction experiment results",
    submitted: false, marks: null,
  },
  {
    id: 4, title: "Essay: Shakespeare's Tragedies", subject: "English",
    due: "2026-05-20", status: "completed", priority: "low",
    teacher: "Ms. Priya Nair", description: "800-word critical analysis",
    submitted: true, marks: 46,
  },
  {
    id: 5, title: "Organic Chemistry Worksheet", subject: "Chemistry",
    due: "2026-05-18", status: "completed", priority: "medium",
    teacher: "Dr. Vikram Singh", description: "Reaction mechanisms – IUPAC naming",
    submitted: true, marks: 38,
  },
];

const teachers = [
  {
    id: 1, name: "Dr. Ramesh Kumar", subject: "Mathematics",
    exp: "12 years", rating: 4.8, status: "online",
    dept: "Science & Mathematics", tags: ["Top Rated", "Mentor"],
    initials: "RK", color: "#4F46E5",
  },
  {
    id: 2, name: "Prof. Anita Sharma", subject: "Physics",
    exp: "9 years", rating: 4.6, status: "busy",
    dept: "Science & Mathematics", tags: ["Research Lead"],
    initials: "AS", color: "#7C3AED",
  },
  {
    id: 3, name: "Dr. Vikram Singh", subject: "Chemistry",
    exp: "15 years", rating: 4.9, status: "online",
    dept: "Science & Mathematics", tags: ["HOD", "Top Rated"],
    initials: "VS", color: "#06B6D4",
  },
  {
    id: 4, name: "Ms. Priya Nair", subject: "English",
    exp: "7 years", rating: 4.7, status: "offline",
    dept: "Languages & Humanities", tags: ["Student Favourite"],
    initials: "PN", color: "#10B981",
  },
  {
    id: 5, name: "Prof. Karthik Iyer", subject: "Computer Science",
    exp: "11 years", rating: 4.9, status: "online",
    dept: "Engineering & Technology", tags: ["Top Rated", "Industry Expert"],
    initials: "KI", color: "#F59E0B",
  },
];

const timetable = {
  Mon: [
    { time: "08:00", end: "09:00", subject: "Mathematics", teacher: "Dr. Ramesh Kumar", room: "A-201", color: "#4F46E5" },
    { time: "09:15", end: "10:15", subject: "Physics", teacher: "Prof. Anita Sharma", room: "Lab-3", color: "#7C3AED" },
    { time: "11:00", end: "12:00", subject: "Computer Science", teacher: "Prof. Karthik Iyer", room: "CS-Lab", color: "#F59E0B" },
    { time: "13:00", end: "14:00", subject: "English", teacher: "Ms. Priya Nair", room: "B-105", color: "#10B981" },
  ],
  Tue: [
    { time: "08:00", end: "09:00", subject: "Chemistry", teacher: "Dr. Vikram Singh", room: "Chem-Lab", color: "#06B6D4" },
    { time: "09:15", end: "10:15", subject: "Mathematics", teacher: "Dr. Ramesh Kumar", room: "A-201", color: "#4F46E5" },
    { time: "11:00", end: "12:00", subject: "English", teacher: "Ms. Priya Nair", room: "B-105", color: "#10B981" },
  ],
  Wed: [
    { time: "08:00", end: "09:00", subject: "Computer Science", teacher: "Prof. Karthik Iyer", room: "CS-Lab", color: "#F59E0B" },
    { time: "09:15", end: "10:15", subject: "Chemistry", teacher: "Dr. Vikram Singh", room: "Chem-Lab", color: "#06B6D4" },
    { time: "11:00", end: "12:00", subject: "Physics", teacher: "Prof. Anita Sharma", room: "Lab-3", color: "#7C3AED" },
    { time: "13:00", end: "14:00", subject: "Mathematics", teacher: "Dr. Ramesh Kumar", room: "A-201", color: "#4F46E5" },
  ],
  Thu: [
    { time: "08:00", end: "09:00", subject: "Physics", teacher: "Prof. Anita Sharma", room: "Lab-3", color: "#7C3AED" },
    { time: "09:15", end: "10:15", subject: "English", teacher: "Ms. Priya Nair", room: "B-105", color: "#10B981" },
    { time: "11:00", end: "12:00", subject: "Chemistry", teacher: "Dr. Vikram Singh", room: "Chem-Lab", color: "#06B6D4" },
  ],
  Fri: [
    { time: "08:00", end: "09:00", subject: "Mathematics", teacher: "Dr. Ramesh Kumar", room: "A-201", color: "#4F46E5" },
    { time: "09:15", end: "10:15", subject: "Computer Science", teacher: "Prof. Karthik Iyer", room: "CS-Lab", color: "#F59E0B" },
    { time: "13:00", end: "14:00", subject: "Physics", teacher: "Prof. Anita Sharma", room: "Lab-3", color: "#7C3AED" },
  ],
};

const notifications = [
  { id: 1, type: "exam", title: "Mid-term Examinations", body: "Starting June 2nd. Download your hall ticket from the portal.", time: "2 hours ago", priority: "high", read: false },
  { id: 2, type: "assignment", title: "DS Assignment Due Tomorrow", body: "Your Data Structures assignment is due in 24 hours.", time: "5 hours ago", priority: "high", read: false },
  { id: 3, type: "fee", title: "Semester Fee Reminder", body: "₹45,000 due by June 15th. Pay online to avoid late fee.", time: "1 day ago", priority: "medium", read: false },
  { id: 4, type: "event", title: "Tech Fest 2026 – Registrations Open", body: "Register before May 31st for early bird discount.", time: "2 days ago", priority: "low", read: true },
  { id: 5, type: "announcement", title: "Library Hours Extended", body: "Library will be open till 10 PM during exam season.", time: "3 days ago", priority: "low", read: true },
  { id: 6, type: "exam", title: "Physics Practical Schedule Released", body: "Check your slot on the academics portal.", time: "4 days ago", priority: "medium", read: true },
];

const fees = {
  total: 120000,
  paid: 75000,
  due: 45000,
  history: [
    { id: 1, desc: "Tuition Fee – Sem 4", date: "Jan 10, 2026", amount: 45000, status: "paid" },
    { id: 2, desc: "Hostel Fee – Sem 4", date: "Jan 10, 2026", amount: 18000, status: "paid" },
    { id: 3, desc: "Library & Lab Fee", date: "Jan 15, 2026", amount: 12000, status: "paid" },
    { id: 4, desc: "Tuition Fee – Sem 5", date: "Jun 15, 2026", amount: 45000, status: "due" },
  ],
};

const monthlyAttendance = [
  { month: "Jan", present: 22, absent: 2 },
  { month: "Feb", present: 18, absent: 2 },
  { month: "Mar", present: 24, absent: 2 },
  { month: "Apr", present: 20, absent: 4 },
  { month: "May", present: 19, absent: 3 },
];

// ─── UTILITY COMPONENTS ─────────────────────────────────────

const GlassCard = ({ children, className = "", style = {}, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-2xl border transition-all duration-300 ${className}`}
    style={{
      background: T.glass,
      borderColor: T.border,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Badge = ({ children, color = "#4F46E5" }) => (
  <span
    className="text-xs font-semibold px-2.5 py-1 rounded-full"
    style={{ background: color + "33", color }}
  >
    {children}
  </span>
);

const ProgressBar = ({ value, color = "#4F46E5", height = 6 }) => (
  <div className="w-full rounded-full overflow-hidden" style={{ height, background: "rgba(255,255,255,0.1)" }}>
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
    />
  </div>
);

const ProgressRing = ({ value, size = 80, stroke = 6, color = "#4F46E5", label }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-bold text-white" style={{ fontSize: size * 0.2 }}>{value}%</div>
        {label && <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontSize: size * 0.12 }}>{label}</div>}
      </div>
    </div>
  );
};

const Sparkline = ({ data, color = "#4F46E5", width = 60, height = 30 }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts.join(" ")} />
    </svg>
  );
};

const Avatar = ({ initials, color, size = 40 }) => (
  <div
    className="flex items-center justify-center font-bold text-white rounded-full flex-shrink-0"
    style={{ width: size, height: size, background: `linear-gradient(135deg, ${color}, ${color}99)`, fontSize: size * 0.35 }}
  >
    {initials}
  </div>
);

const Stat = ({ icon, label, value, trend, color, spark }) => (
  <GlassCard className="p-4 hover:scale-105 cursor-pointer" style={{ transition: "transform 0.2s" }}>
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: color + "22" }}>
        {icon}
      </div>
      {trend !== undefined && (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend >= 0 ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="font-bold text-2xl text-white mb-0.5">{value}</div>
    <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
    {spark && <Sparkline data={spark} color={color} />}
  </GlassCard>
);

// ─── BOTTOM NAV ──────────────────────────────────────────────
const tabs = [
  { id: "dashboard", icon: "⊞", label: "Home" },
  { id: "attendance", icon: "📊", label: "Attend" },
  { id: "assignments", icon: "📝", label: "Tasks" },
  { id: "notifications", icon: "🔔", label: "Alerts" },
  { id: "profile", icon: "👤", label: "Profile" },
];

const BottomNav = ({ active, setPage }) => (
  <div
    className="fixed bottom-4 left-1/2 z-50 flex gap-1 px-3 py-2 rounded-2xl"
    style={{
      transform: "translateX(-50%)",
      background: "rgba(15,23,42,0.9)",
      border: `1px solid ${T.border}`,
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      maxWidth: 340, width: "calc(100vw - 32px)"
    }}
  >
    {tabs.map((t) => (
      <button
        key={t.id}
        onClick={() => setPage(t.id)}
        className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 flex-1"
        style={{
          background: active === t.id ? T.indigo + "33" : "transparent",
          color: active === t.id ? T.indigo : "rgba(255,255,255,0.4)",
        }}
      >
        <span className="text-lg leading-none">{t.icon}</span>
        <span className="text-xs font-medium">{t.label}</span>
      </button>
    ))}
  </div>
);

// ─── TOP NAV ─────────────────────────────────────────────────
const TopNav = ({ setPage, unread }) => (
  <div
    className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
    style={{
      background: "rgba(15,23,42,0.9)",
      borderBottom: `1px solid ${T.border}`,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }}
  >
    <div>
      <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Good Morning 🌤</div>
      <div className="text-base font-bold text-white leading-tight">Joseph Daniel</div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => setPage("notifications")}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center text-base transition"
        style={{ background: T.glass, border: `1px solid ${T.border}` }}
      >
        🔔
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full text-white font-bold"
            style={{ background: "#EF4444", fontSize: 9 }}>{unread}</span>
        )}
      </button>
      <div
        onClick={() => setPage("profile")}
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${T.indigo}, ${T.violet})` }}
      >
        JD
      </div>
    </div>
  </div>
);

// ─── LOGIN SCREEN ────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8" style={{ background: T.bg }}>
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: `radial-gradient(circle, ${T.indigo}, transparent)`, animationDuration: "4s" }} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: `radial-gradient(circle, ${T.violet}, transparent)`, animationDuration: "6s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: `radial-gradient(circle, ${T.cyan}, transparent)`, animationDuration: "5s" }} />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full opacity-30 animate-bounce"
          style={{
            left: `${10 + i * 8}%`, top: `${15 + (i % 5) * 15}%`,
            background: i % 3 === 0 ? T.indigo : i % 3 === 1 ? T.violet : T.cyan,
            animationDuration: `${2 + i * 0.3}s`, animationDelay: `${i * 0.2}s`
          }} />
      ))}

      <div className="relative w-full max-w-sm" style={{ animation: "fadeSlideUp 0.6s ease both" }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center text-3xl mb-4"
            style={{ background: `linear-gradient(135deg, ${T.indigo}, ${T.violet})`, boxShadow: `0 0 40px ${T.indigo}55` }}>
            🎓
          </div>
          <h1 className="text-3xl font-black text-white mb-1">EduSphere</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Student Intelligence Platform</p>
        </div>

        {/* Card */}
        <GlassCard className="p-6" style={{ boxShadow: `0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px ${T.border}` }}>
          <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>Sign in to your dashboard</p>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.6)" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="joseph@university.edu"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`, caretColor: T.indigo }}
                onFocus={e => e.target.style.borderColor = T.indigo}
                onBlur={e => e.target.style.borderColor = T.border}
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.6)" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`, caretColor: T.indigo }}
                onFocus={e => e.target.style.borderColor = T.indigo}
                onBlur={e => e.target.style.borderColor = T.border}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-4 rounded-full relative" style={{ background: T.indigo }}>
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Remember me</span>
            </label>
            <button className="text-xs font-medium" style={{ color: T.cyan }}>Forgot password?</button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 active:scale-95"
            style={{
              background: loading ? "rgba(79,70,229,0.5)" : `linear-gradient(135deg, ${T.indigo}, ${T.violet})`,
              boxShadow: loading ? "none" : `0 8px 30px ${T.indigo}55`,
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: T.border }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: T.border }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["🔵 Google", "🔷 Microsoft"].map(s => (
              <button key={s} className="py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 active:scale-95"
                style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}` }}>
                {s}
              </button>
            ))}
          </div>
        </GlassCard>

        <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
          Need help? <span style={{ color: T.cyan }}>Contact IT Support</span>
        </p>
      </div>

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

// ─── DASHBOARD PAGE ──────────────────────────────────────────
const Dashboard = ({ setPage }) => {
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 100); }, []);

  const semProgress = 68;

  return (
    <div className="px-4 pb-28 space-y-5" style={{ opacity: animIn ? 1 : 0, transition: "opacity 0.4s" }}>
      {/* Profile card */}
      <GlassCard className="p-4 mt-4" style={{ background: `linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.15))` }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${T.indigo}, ${T.violet})`, boxShadow: `0 8px 20px ${T.indigo}55` }}>
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold text-white truncate">{student.name}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{student.roll} · {student.class}</div>
            <div className="flex gap-1.5 mt-1.5 flex-wrap">
              {["🔥 23-day streak", "⭐ Top 15%"].map(b => (
                <span key={b} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Semester Progress</span>
            <span className="font-semibold text-white">{semProgress}%</span>
          </div>
          <ProgressBar value={semProgress} color={T.cyan} height={6} />
        </div>
      </GlassCard>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <Stat icon="📅" label="Attendance" value="87.5%" trend={2.3} color="#10B981" spark={[80, 82, 85, 83, 87, 87.5]} />
        <Stat icon="🎯" label="CGPA" value="8.74" trend={0.3} color={T.indigo} spark={[8.2, 8.4, 8.5, 8.6, 8.7, 8.74]} />
        <Stat icon="🏆" label="Rank" value="#12" trend={5} color="#F59E0B" spark={[18, 17, 16, 14, 13, 12]} />
        <Stat icon="⏰" label="Pending Tasks" value="3" trend={-2} color="#EF4444" spark={[6, 5, 5, 4, 4, 3]} />
      </div>

      {/* Performance chart */}
      <GlassCard className="p-4">
        <div className="text-sm font-bold text-white mb-1">Performance Trend</div>
        <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Your score vs class average</div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.indigo} stopOpacity={0.3} />
                <stop offset="95%" stopColor={T.indigo} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={T.cyan} stopOpacity={0.2} />
                <stop offset="95%" stopColor={T.cyan} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[55, 100]} />
            <Tooltip contentStyle={{ background: "#1E293B", border: `1px solid ${T.border}`, borderRadius: 12, color: "#fff", fontSize: 12 }} />
            <Area type="monotone" dataKey="score" stroke={T.indigo} strokeWidth={2.5} fill="url(#grad1)" name="Your Score" />
            <Area type="monotone" dataKey="avg" stroke={T.cyan} strokeWidth={1.5} fill="url(#grad2)" strokeDasharray="4 3" name="Class Avg" />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Subject performance */}
      <GlassCard className="p-4">
        <div className="text-sm font-bold text-white mb-3">Subject Scores</div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={subjectData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "#1E293B", border: `1px solid ${T.border}`, borderRadius: 12, color: "#fff", fontSize: 12 }} />
            <Bar dataKey="marks" radius={[6, 6, 0, 0]}>
              {subjectData.map((s, i) => <Cell key={i} fill={s.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* AI Insights */}
      <div>
        <div className="text-sm font-bold text-white mb-3 px-0.5">✨ AI Insights</div>
        <div className="space-y-3">
          {[
            { icon: "🚀", title: "Performance Prediction", body: "You're on track for 9.0+ CGPA this semester. Maintain consistency in CS and Maths.", color: T.indigo, badge: "Positive" },
            { icon: "⚠️", title: "Focus on Physics", body: "Your Physics score dropped 2%. Spend 1 extra hour daily before the mid-terms.", color: "#F59E0B", badge: "Action Needed" },
            { icon: "💡", title: "Study Recommendation", body: "Optimal study window: 6–8 PM based on your productivity patterns.", color: T.cyan, badge: "Smart Tip" },
          ].map((ins) => (
            <GlassCard key={ins.title} className="p-4" style={{ border: `1px solid ${ins.color}33` }}>
              <div className="flex items-start gap-3">
                <div className="text-2xl leading-none mt-0.5">{ins.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold text-white">{ins.title}</span>
                    <Badge color={ins.color}>{ins.badge}</Badge>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{ins.body}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div>
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="text-sm font-bold text-white">Subjects</div>
          <button className="text-xs font-medium" style={{ color: T.cyan }} onClick={() => setPage("teachers")}>View all →</button>
        </div>
        <div className="space-y-3">
          {subjects.map(s => (
            <GlassCard key={s.id} className="p-4 cursor-pointer hover:scale-[1.01] transition-transform duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: s.color + "22" }}>{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{s.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.teacher}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-black" style={{ color: s.color }}>{s.marks}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>/{s.total}</div>
                </div>
              </div>
              <ProgressBar value={s.progress} color={s.color} height={5} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Attendance {s.attendance}%</span>
                <span className={`text-xs font-semibold ${s.improvement >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {s.improvement >= 0 ? "▲" : "▼"} {Math.abs(s.improvement)}%
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Weekly study */}
      <GlassCard className="p-4">
        <div className="text-sm font-bold text-white mb-1">Weekly Study Hours</div>
        <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>This week · Total 29.3 hrs</div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weeklyStudy} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1E293B", border: `1px solid ${T.border}`, borderRadius: 12, color: "#fff", fontSize: 12 }} />
            <Bar dataKey="hours" fill={T.cyan} radius={[4, 4, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Motivational quote */}
      <GlassCard className="p-4 text-center" style={{ background: `linear-gradient(135deg, rgba(79,70,229,0.15), rgba(6,182,212,0.15))` }}>
        <div className="text-2xl mb-2">💫</div>
        <p className="text-sm font-medium italic text-white/80 leading-relaxed">
          "Success is the sum of small efforts, repeated day in and day out."
        </p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>— Robert Collier</p>
      </GlassCard>
    </div>
  );
};

// ─── ATTENDANCE PAGE ─────────────────────────────────────────
const Attendance = () => {
  const heatData = [...Array(35)].map((_, i) => ({
    i, val: Math.random() > 0.13 ? (Math.random() > 0.5 ? 2 : 1) : 0
  }));
  return (
    <div className="px-4 pb-28 space-y-5">
      <div className="pt-4">
        <div className="text-xl font-black text-white">Attendance</div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Semester 5 · June 2026</div>
      </div>

      {/* Main ring card */}
      <GlassCard className="p-6" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))" }}>
        <div className="flex items-center gap-6">
          <ProgressRing value={87} size={110} stroke={10} color="#10B981" label="Overall" />
          <div className="space-y-3 flex-1">
            {[
              { label: "Total Classes", value: "148", color: "rgba(255,255,255,0.7)" },
              { label: "Present", value: "129", color: "#10B981" },
              { label: "Absent", value: "19", color: "#EF4444" },
              { label: "Medical Leave", value: "3", color: "#F59E0B" },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Subject attendance */}
      <div>
        <div className="text-sm font-bold text-white mb-3">Subject-wise</div>
        <div className="space-y-3">
          {subjects.map(s => (
            <GlassCard key={s.id} className="p-3.5">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-base w-7 text-center">{s.icon}</div>
                <span className="text-sm font-medium text-white flex-1">{s.name}</span>
                <span className="text-sm font-bold" style={{ color: s.attendance >= 85 ? "#10B981" : "#F59E0B" }}>{s.attendance}%</span>
              </div>
              <ProgressBar value={s.attendance} color={s.attendance >= 85 ? "#10B981" : "#F59E0B"} height={5} />
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Monthly chart */}
      <GlassCard className="p-4">
        <div className="text-sm font-bold text-white mb-1">Monthly Attendance</div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={monthlyAttendance} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1E293B", border: `1px solid ${T.border}`, borderRadius: 12, color: "#fff", fontSize: 12 }} />
            <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} name="Present" stackId="a" />
            <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Heatmap */}
      <GlassCard className="p-4">
        <div className="text-sm font-bold text-white mb-3">Attendance Heatmap · May</div>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {["S","M","T","W","T","F","S"].map(d => (
            <div key={d} className="text-center text-xs font-medium pb-1" style={{ color: "rgba(255,255,255,0.3)" }}>{d}</div>
          ))}
          {heatData.map(({ i, val }) => (
            <div key={i} className="aspect-square rounded-md"
              style={{ background: val === 2 ? "#10B981" : val === 1 ? "#10B98155" : "rgba(239,68,68,0.25)" }} />
          ))}
        </div>
        <div className="flex gap-3 mt-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Present</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded inline-block" style={{ background: "#10B98155" }} /> Late</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded inline-block" style={{ background: "rgba(239,68,68,0.25)" }} /> Absent</span>
        </div>
      </GlassCard>

      {/* AI prediction */}
      <GlassCard className="p-4" style={{ border: `1px solid ${T.cyan}33` }}>
        <div className="flex gap-3 items-start">
          <div className="text-2xl">🤖</div>
          <div>
            <div className="text-sm font-bold text-white mb-1">AI Attendance Prediction</div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              If you miss any more classes this month, your overall attendance may drop to 85.2%. Maintain 100% for the next 2 weeks to stay safe.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ─── ASSIGNMENTS PAGE ─────────────────────────────────────────
const Assignments = () => {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? assignments : assignments.filter(a => a.status === tab);

  const statusColor = { pending: "#F59E0B", completed: "#10B981", overdue: "#EF4444" };
  const priorityColor = { high: "#EF4444", medium: "#F59E0B", low: "#10B981" };

  const getDaysLeft = (due) => {
    const diff = new Date(due) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="px-4 pb-28 space-y-4">
      <div className="pt-4">
        <div className="text-xl font-black text-white">Assignments</div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Track your tasks & deadlines</div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Pending", value: 2, color: "#F59E0B" },
          { label: "Overdue", value: 1, color: "#EF4444" },
          { label: "Done", value: 2, color: "#10B981" },
        ].map(s => (
          <GlassCard key={s.label} className="p-3 text-center">
            <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["all", "pending", "overdue", "completed"].map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
            style={{
              background: tab === t ? T.indigo : "rgba(255,255,255,0.07)",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.5)",
              border: `1px solid ${tab === t ? T.indigo : T.border}`
            }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Assignment cards */}
      <div className="space-y-3">
        {filtered.map(a => {
          const days = getDaysLeft(a.due);
          return (
            <GlassCard key={a.id} className="p-4 cursor-pointer hover:scale-[1.01] transition-transform duration-200"
              style={{ border: `1px solid ${statusColor[a.status]}22` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{a.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{a.subject} · {a.teacher}</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <Badge color={statusColor[a.status]}>{a.status}</Badge>
                  <Badge color={priorityColor[a.priority]}>{a.priority}</Badge>
                </div>
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{a.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Due: {new Date(a.due).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </div>
                {a.status === "completed" ? (
                  <div className="text-xs font-bold text-emerald-400">✓ Submitted · {a.marks}/50</div>
                ) : (
                  <div className={`text-xs font-semibold ${days < 0 ? "text-red-400" : days <= 2 ? "text-amber-400" : "text-white/50"}`}>
                    {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                  </div>
                )}
              </div>
              {a.status !== "completed" && (
                <button className="mt-3 w-full py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${T.indigo}, ${T.violet})` }}>
                  📎 Upload Submission
                </button>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

// ─── TEACHERS PAGE ────────────────────────────────────────────
const Teachers = () => {
  const statusColor = { online: "#10B981", busy: "#F59E0B", offline: "#6B7280" };
  return (
    <div className="px-4 pb-28 space-y-4">
      <div className="pt-4">
        <div className="text-xl font-black text-white">Teachers</div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Your faculty this semester</div>
      </div>
      <div className="space-y-3">
        {teachers.map(t => (
          <GlassCard key={t.id} className="p-4 cursor-pointer hover:scale-[1.01] transition-transform duration-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <Avatar initials={t.initials} color={t.color} size={48} />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                  style={{ background: statusColor[t.status], borderColor: "#1E293B" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">{t.name}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t.subject}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{t.exp} experience</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-base font-bold" style={{ color: "#F59E0B" }}>⭐ {t.rating}</div>
                <div className="text-xs capitalize px-2 py-0.5 rounded-full mt-1"
                  style={{ background: statusColor[t.status] + "22", color: statusColor[t.status] }}>
                  {t.status}
                </div>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {t.tags.map(tag => <Badge key={tag} color={t.color}>{tag}</Badge>)}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{ background: t.color + "22", color: t.color }}>
                📧 Message
              </button>
              <button className="py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{ background: `linear-gradient(135deg, ${T.indigo}, ${T.violet})`, color: "#fff" }}>
                📅 Book Session
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// ─── TIMETABLE PAGE ───────────────────────────────────────────
const Timetable = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const today = days[new Date().getDay() - 1] || "Mon";
  const [selDay, setSelDay] = useState(today);
  const classes = timetable[selDay] || [];

  return (
    <div className="px-4 pb-28 space-y-4">
      <div className="pt-4">
        <div className="text-xl font-black text-white">Timetable</div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Your weekly schedule</div>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {days.map(d => (
          <button key={d} onClick={() => setSelDay(d)}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: selDay === d ? `linear-gradient(135deg, ${T.indigo}, ${T.violet})` : "rgba(255,255,255,0.06)",
              color: selDay === d ? "#fff" : "rgba(255,255,255,0.4)",
              boxShadow: selDay === d ? `0 4px 20px ${T.indigo}55` : "none"
            }}>
            {d}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-14 top-0 bottom-0 w-px" style={{ background: T.border }} />
        <div className="space-y-4">
          {classes.map((cls, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-11 text-right flex-shrink-0 pt-3.5">
                <div className="text-xs font-bold text-white/60">{cls.time}</div>
              </div>
              <div className="flex-shrink-0 relative z-10 mt-3.5">
                <div className="w-3 h-3 rounded-full" style={{ background: cls.color, boxShadow: `0 0 10px ${cls.color}88` }} />
              </div>
              <GlassCard className="flex-1 p-3.5" style={{ border: `1px solid ${cls.color}33` }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-white">{cls.subject}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{cls.teacher}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>🏫 Room {cls.room}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: cls.color + "22", color: cls.color }}>
                      {cls.time}–{cls.end}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
          {classes.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <div className="text-4xl mb-3">🎉</div>
              <div className="text-sm font-medium">No classes today!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── NOTIFICATIONS PAGE ───────────────────────────────────────
const Notifications = () => {
  const [notifs, setNotifs] = useState(notifications);
  const typeIcon = { exam: "📋", assignment: "📝", fee: "💳", event: "🎪", announcement: "📢" };
  const typeColor = { exam: "#4F46E5", assignment: "#F59E0B", fee: "#EF4444", event: "#10B981", announcement: "#06B6D4" };
  const priorityBg = { high: "#EF444422", medium: "#F59E0B22", low: "rgba(255,255,255,0.05)" };

  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  return (
    <div className="px-4 pb-28 space-y-4">
      <div className="pt-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-black text-white">Notifications</div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            {notifs.filter(n => !n.read).length} unread
          </div>
        </div>
        <button onClick={markAll} className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: T.indigo + "22", color: T.indigo }}>
          Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {notifs.map(n => (
          <GlassCard key={n.id} className="p-4 cursor-pointer transition-all duration-200"
            style={{ background: n.read ? T.glass : priorityBg[n.priority], opacity: n.read ? 0.65 : 1 }}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: typeColor[n.type] + "22" }}>
                {typeIcon[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-bold text-white leading-tight">{n.title}</div>
                  {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: typeColor[n.type] }} />}
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{n.body}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge color={typeColor[n.type]}>{n.type}</Badge>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{n.time}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

// ─── FEES PAGE ────────────────────────────────────────────────
const Fees = () => {
  const paidPct = Math.round((fees.paid / fees.total) * 100);
  return (
    <div className="px-4 pb-28 space-y-4">
      <div className="pt-4">
        <div className="text-xl font-black text-white">Fee Portal</div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Academic Year 2025–26</div>
      </div>

      {/* Overview */}
      <GlassCard className="p-5" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.15))" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Total Fee</div>
            <div className="text-2xl font-black text-white">₹1,20,000</div>
          </div>
          <ProgressRing value={paidPct} size={80} stroke={8} color="#10B981" label="Paid" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl" style={{ background: "rgba(16,185,129,0.15)" }}>
            <div className="text-xs mb-1 text-emerald-400/70">Paid</div>
            <div className="text-lg font-bold text-emerald-400">₹75,000</div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.15)" }}>
            <div className="text-xs mb-1 text-red-400/70">Due</div>
            <div className="text-lg font-bold text-red-400">₹45,000</div>
          </div>
        </div>
      </GlassCard>

      {/* Payment history */}
      <div>
        <div className="text-sm font-bold text-white mb-3">Payment History</div>
        <div className="space-y-2.5">
          {fees.history.map(f => (
            <GlassCard key={f.id} className="p-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{f.desc}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{f.date}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-white">₹{f.amount.toLocaleString()}</div>
                  <div className={`text-xs mt-0.5 font-semibold ${f.status === "paid" ? "text-emerald-400" : "text-red-400"}`}>
                    {f.status === "paid" ? "✓ Paid" : "⚠ Due"}
                  </div>
                </div>
              </div>
              {f.status === "paid" && (
                <button className="mt-2.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all active:scale-95"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                  📄 Download Receipt
                </button>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Pay now */}
      <GlassCard className="p-4" style={{ border: "1px solid rgba(239,68,68,0.3)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <div className="text-sm font-bold text-white">Payment Due</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Tuition Fee – Sem 5 due Jun 15, 2026</div>
          </div>
        </div>
        <button className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 8px 20px rgba(16,185,129,0.3)" }}>
          💳 Pay ₹45,000 Now
        </button>
      </GlassCard>
    </div>
  );
};

// ─── PROFILE PAGE ─────────────────────────────────────────────
const Profile = ({ setPage }) => {
  const [dark, setDark] = useState(true);
  const [notifOn, setNotifOn] = useState(true);
  const completion = 82;

  return (
    <div className="px-4 pb-28 space-y-4">
      <div className="pt-4">
        <div className="text-xl font-black text-white">Profile</div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Manage your account</div>
      </div>

      {/* Profile hero */}
      <GlassCard className="p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.15))" }}>
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white mx-auto mb-3"
          style={{ background: `linear-gradient(135deg, ${T.indigo}, ${T.violet})`, boxShadow: `0 0 40px ${T.indigo}44` }}>
          JD
        </div>
        <div className="text-xl font-black text-white">{student.name}</div>
        <div className="text-xs mb-1 mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{student.roll} · {student.class}</div>
        <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{student.section} · Semester {student.semester}</div>
        <div className="mb-1.5">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: "rgba(255,255,255,0.45)" }}>Profile Completion</span>
            <span className="font-bold text-white">{completion}%</span>
          </div>
          <ProgressBar value={completion} color={T.cyan} height={6} />
        </div>
      </GlassCard>

      {/* Academic details */}
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { label: "CGPA", value: "8.74", icon: "🎯", color: T.indigo },
          { label: "Rank", value: "#12", icon: "🏆", color: "#F59E0B" },
          { label: "Attendance", value: "87.5%", icon: "📅", color: "#10B981" },
          { label: "Streak", value: "23 days", icon: "🔥", color: "#EF4444" },
        ].map(s => (
          <GlassCard key={s.label} className="p-3 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Settings */}
      <div>
        <div className="text-sm font-bold text-white mb-3">Settings</div>
        <GlassCard>
          {[
            {
              icon: "🌙", label: "Dark Mode",
              right: (
                <div onClick={() => setDark(d => !d)} className="w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300"
                  style={{ background: dark ? T.indigo : "rgba(255,255,255,0.2)" }}>
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300"
                    style={{ left: dark ? "calc(100% - 22px)" : "2px" }} />
                </div>
              )
            },
            {
              icon: "🔔", label: "Notifications",
              right: (
                <div onClick={() => setNotifOn(n => !n)} className="w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300"
                  style={{ background: notifOn ? T.indigo : "rgba(255,255,255,0.2)" }}>
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300"
                    style={{ left: notifOn ? "calc(100% - 22px)" : "2px" }} />
                </div>
              )
            },
            { icon: "✏️", label: "Edit Profile", right: <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span> },
            { icon: "🔒", label: "Change Password", right: <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span> },
            { icon: "📞", label: "Support", right: <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span> },
          ].map((item, i, arr) => (
            <div key={item.label}
              className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
              style={{ borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium text-white">{item.label}</span>
              </div>
              {item.right}
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Achievements */}
      <div>
        <div className="text-sm font-bold text-white mb-3">Achievements</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "🔥", label: "23-Day Streak" },
            { icon: "⭐", label: "Top 15%" },
            { icon: "📚", label: "100% CS Tasks" },
            { icon: "🏅", label: "English Star" },
            { icon: "🚀", label: "Fast Learner" },
            { icon: "💡", label: "AI Champion" },
          ].map(a => (
            <GlassCard key={a.label} className="p-3 text-center">
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{a.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="w-full py-3.5 rounded-xl text-sm font-bold text-red-400 transition-all active:scale-95"
        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
        🚪 Sign Out
      </button>
    </div>
  );
};

// ─── MORE PAGES NAV ───────────────────────────────────────────
const Academics = ({ setPage }) => (
  <div className="px-4 pb-28 space-y-4">
    <div className="pt-4">
      <div className="text-xl font-black text-white">Academics</div>
      <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Explore your academic modules</div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[
        { icon: "📅", label: "Timetable", page: "timetable", color: T.indigo },
        { icon: "👩‍🏫", label: "Teachers", page: "teachers", color: T.violet },
        { icon: "💳", label: "Fee Portal", page: "fees", color: "#10B981" },
        { icon: "📊", label: "Attendance", page: "attendance", color: "#F59E0B" },
      ].map(item => (
        <GlassCard key={item.label}
          className="p-5 flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform duration-200"
          style={{ border: `1px solid ${item.color}33` }}
          onClick={() => setPage(item.page)}>
          <div className="text-4xl mb-3">{item.icon}</div>
          <div className="text-sm font-bold text-white">{item.label}</div>
        </GlassCard>
      ))}
    </div>
  </div>
);

// ─── APP SHELL ────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const unread = notifications.filter(n => !n.read).length;

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard setPage={setPage} />;
      case "attendance": return <Attendance />;
      case "assignments": return <Assignments />;
      case "teachers": return <Teachers />;
      case "timetable": return <Timetable />;
      case "notifications": return <Notifications />;
      case "fees": return <Fees />;
      case "profile": return <Profile setPage={setPage} />;
      case "academics": return <Academics setPage={setPage} />;
      default: return <Dashboard setPage={setPage} />;
    }
  };

  const bottomTabs = [
    { id: "dashboard", icon: "⊞", label: "Home" },
    { id: "academics", icon: "🎓", label: "Academics" },
    { id: "assignments", icon: "📝", label: "Tasks" },
    { id: "notifications", icon: "🔔", label: "Alerts" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div className="min-h-screen" style={{ background: T.bg, fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <TopNav setPage={setPage} unread={unread} />
      <div key={page} style={{ animation: "fadeIn 0.3s ease both" }}>
        {renderPage()}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 z-50 flex gap-1 px-3 py-2 rounded-2xl"
        style={{
          transform: "translateX(-50%)",
          background: "rgba(15,23,42,0.92)",
          border: `1px solid ${T.border}`,
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          maxWidth: 360, width: "calc(100vw - 32px)"
        }}>
        {bottomTabs.map(t => {
          const isActive = page === t.id || (t.id === "academics" && ["timetable","teachers","fees","attendance"].includes(page));
          return (
            <button key={t.id} onClick={() => setPage(t.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 flex-1 relative"
              style={{ background: isActive ? T.indigo + "33" : "transparent", color: isActive ? T.indigo : "rgba(255,255,255,0.4)" }}>
              <span className="text-lg leading-none">{t.icon}</span>
              <span className="text-xs font-medium" style={{ fontSize: 10 }}>{t.label}</span>
              {t.id === "notifications" && unread > 0 && (
                <span className="absolute top-0.5 right-1.5 w-4 h-4 text-xs flex items-center justify-center rounded-full text-white font-bold"
                  style={{ background: "#EF4444", fontSize: 9 }}>{unread}</span>
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        input { color: white; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.35; } }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}