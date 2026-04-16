import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, Users, Calendar, MessageSquare, AlertCircle,
  CheckCircle, Clock, TrendingUp, Megaphone, Star
} from "lucide-react";

// Simple chart component using divs
const BarChartSimple = ({ data, max }: { data: { label: string; value: number }[]; max: number }) => (
  <div className="flex items-end gap-1 h-32">
    {data.map((d) => (
      <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
        <div className="w-full rounded-t gradient-primary" style={{ height: `${(d.value / max) * 100}%` }} />
        <span className="text-[9px] text-muted-foreground">{d.label}</span>
      </div>
    ))}
  </div>
);

const opdByHour = [
  { label: "8AM", value: 12 }, { label: "9AM", value: 35 }, { label: "10AM", value: 48 },
  { label: "11AM", value: 42 }, { label: "12PM", value: 28 }, { label: "1PM", value: 8 },
  { label: "2PM", value: 38 }, { label: "3PM", value: 45 }, { label: "4PM", value: 30 },
  { label: "5PM", value: 15 },
];

const appointments = [
  { id: "1", patient: "Ramesh K.", dept: "Orthodontics", date: "2026-04-13", time: "10:00", status: "confirmed" as const },
  { id: "2", patient: "Sunita M.", dept: "Oral Surgery", date: "2026-04-13", time: "10:30", status: "confirmed" as const },
  { id: "3", patient: "Anil P.", dept: "Pedodontics", date: "2026-04-13", time: "11:00", status: "cancelled" as const },
  { id: "4", patient: "Priya D.", dept: "Periodontics", date: "2026-04-14", time: "09:00", status: "confirmed" as const },
  { id: "5", patient: "Vijay S.", dept: "Conservative", date: "2026-04-14", time: "02:00", status: "completed" as const },
];

const complaints = [
  { id: "1", title: "Water issue in Hostel Block B", status: "resolved", date: "2026-04-10" },
  { id: "2", title: "AC not working in Room 204", status: "assigned", date: "2026-04-12" },
  { id: "3", title: "WiFi connectivity issues", status: "submitted", date: "2026-04-13" },
];

const feedbackItems = [
  { id: "1", from: "Patient: Meera R.", rating: 5, comment: "Excellent care by Dr. Sharma!", dept: "Orthodontics" },
  { id: "2", from: "Patient: Ravi K.", rating: 4, comment: "Good experience, slight delay.", dept: "Oral Surgery" },
  { id: "3", from: "Student: Ankit M.", rating: 3, comment: "Need more clinical exposure hours.", dept: "Pedodontics" },
];

const statusColors = {
  confirmed: "text-primary bg-primary/10",
  cancelled: "text-destructive bg-destructive/10",
  completed: "text-accent bg-accent/10",
  submitted: "text-warning bg-warning/10",
  assigned: "text-primary bg-primary/10",
  resolved: "text-accent bg-accent/10",
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "complaints" | "feedback">("overview");
  const [announcement, setAnnouncement] = useState("");

  const tabs = [
    { key: "overview" as const, icon: BarChart3, label: "Overview" },
    { key: "appointments" as const, icon: Calendar, label: "Appointments" },
    { key: "complaints" as const, icon: AlertCircle, label: "Complaints" },
    { key: "feedback" as const, icon: MessageSquare, label: "Feedback" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Today's OPD", value: "127", icon: Users, trend: "+12%" },
              { label: "Appointments", value: "48", icon: Calendar, trend: "+5%" },
              { label: "Complaints", value: "3", icon: AlertCircle, trend: "-2" },
              { label: "Avg Rating", value: "4.6", icon: Star, trend: "+0.2" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-accent font-medium flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />{s.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* OPD Chart */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-foreground mb-4">OPD Load by Hour</h3>
            <BarChartSimple data={opdByHour} max={50} />
          </div>

          {/* Dept Distribution */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-foreground mb-3">Department Distribution</h3>
            <div className="space-y-2">
              {[
                { dept: "Orthodontics", pct: 22 },
                { dept: "Oral Surgery", pct: 18 },
                { dept: "Conservative", pct: 25 },
                { dept: "Periodontics", pct: 15 },
                { dept: "Others", pct: 20 },
              ].map((d) => (
                <div key={d.dept} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24 shrink-0">{d.dept}</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="gradient-primary h-2 rounded-full" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-xs font-medium text-foreground">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1">
              <Megaphone className="w-4 h-4 text-primary" /> Post Announcement
            </h3>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Type your announcement..."
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm min-h-[80px] focus:ring-2 focus:ring-ring outline-none resize-none mb-2"
            />
            <button
              onClick={() => { setAnnouncement(""); }}
              className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-medium"
            >
              Publish
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === "appointments" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-card rounded-xl border border-border p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-card-foreground">{appt.patient}</div>
                  <div className="text-xs text-muted-foreground">{appt.dept} • {appt.date} {appt.time}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${statusColors[appt.status]}`}>
                {appt.status}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "complaints" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {complaints.map((c) => (
            <div key={c.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">{c.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{c.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${statusColors[c.status as keyof typeof statusColors]}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "feedback" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {feedbackItems.map((f) => (
            <div key={f.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-muted-foreground">{f.from} • {f.dept}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < f.rating ? "text-warning fill-warning" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-card-foreground">{f.comment}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
