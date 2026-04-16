import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Trophy, Bell, Star, Award, Target, Download } from "lucide-react";

const timetable = [
  { day: "Monday", slots: [{ time: "9:00-10:00", subject: "Oral Anatomy" }, { time: "10:00-11:00", subject: "Dental Materials" }, { time: "11:30-1:00", subject: "Clinical Posting" }] },
  { day: "Tuesday", slots: [{ time: "9:00-10:00", subject: "Oral Pathology" }, { time: "10:00-11:00", subject: "Periodontology" }, { time: "2:00-4:00", subject: "Lab Work" }] },
  { day: "Wednesday", slots: [{ time: "9:00-10:00", subject: "Orthodontics" }, { time: "10:00-11:00", subject: "Prosthodontics" }, { time: "11:30-1:00", subject: "Clinical Posting" }] },
  { day: "Thursday", slots: [{ time: "9:00-10:00", subject: "Oral Surgery" }, { time: "10:00-11:00", subject: "Pedodontics" }, { time: "2:00-4:00", subject: "Seminar" }] },
  { day: "Friday", slots: [{ time: "9:00-10:00", subject: "Community Dentistry" }, { time: "10:00-12:00", subject: "Clinical Posting" }, { time: "2:00-3:00", subject: "Journal Club" }] },
];

const events = [
  { id: "1", title: "National Dental Research Conference", date: "2026-04-20", type: "conference", rsvpCount: 45 },
  { id: "2", title: "Free Dental Camp - Rural Area", date: "2026-04-25", type: "camp", rsvpCount: 30 },
  { id: "3", title: "Guest Lecture: Implant Innovations", date: "2026-05-02", type: "lecture", rsvpCount: 67 },
];

const leaderboard = [
  { rank: 1, name: "Student A", points: 2450, badge: "🏆" },
  { rank: 2, name: "Student B", points: 2180, badge: "🥈" },
  { rank: 3, name: "Student C", points: 1950, badge: "🥉" },
  { rank: 4, name: "Student D", points: 1720, badge: "" },
  { rank: 5, name: "Student E", points: 1580, badge: "" },
];

const badges = [
  { icon: "🎯", name: "Perfect Week", desc: "Attend all classes in a week", earned: true },
  { icon: "⭐", name: "Top Contributor", desc: "Submit 10+ feedbacks", earned: true },
  { icon: "🔬", name: "Research Star", desc: "Publish a research paper", earned: false },
  { icon: "🏅", name: "Event Champion", desc: "Attend 5+ events", earned: false },
];

const StudentPortal = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"timetable" | "events" | "gamification">("timetable");
  const [rsvpd, setRsvpd] = useState<Set<string>>(new Set());

  const toggleRsvp = (id: string) => {
    setRsvpd((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const tabs = [
    { key: "timetable" as const, icon: BookOpen, label: "Timetable" },
    { key: "events" as const, icon: Calendar, label: "Events" },
    { key: "gamification" as const, icon: Trophy, label: "Leaderboard" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("nav.student")}</h1>
        <button className="relative p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">3</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "timetable" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Weekly Schedule • Updated: Apr 10, 2026</span>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              <Download className="w-3 h-3" /> Download PDF
            </button>
          </div>
          {timetable.map((day) => (
            <div key={day.day} className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">{day.day}</h3>
              <div className="space-y-1.5">
                {day.slots.map((slot, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="text-muted-foreground w-24 shrink-0 font-mono">{slot.time}</span>
                    <span className="text-card-foreground">{slot.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "events" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-card-foreground">{event.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    📅 {event.date} • {event.rsvpCount} attending
                  </p>
                </div>
                <button
                  onClick={() => toggleRsvp(event.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    rsvpd.has(event.id)
                      ? "bg-accent/20 text-accent"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {rsvpd.has(event.id) ? "✓ RSVP'd" : "RSVP"}
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "gamification" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Points & Badges */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-1">
                <Award className="w-4 h-4 text-primary" /> Your Badges
              </h3>
              <span className="text-xs text-muted-foreground">
                <Target className="w-3 h-3 inline mr-1" />
                1,250 points
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`p-3 rounded-lg border text-center ${
                    b.earned ? "border-primary/30 bg-primary/5" : "border-border bg-muted opacity-50"
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-xs font-medium text-foreground mt-1">{b.name}</div>
                  <div className="text-[10px] text-muted-foreground">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-1">
              <Trophy className="w-4 h-4 text-warning" /> Top Students
            </h3>
            <div className="space-y-2">
              {leaderboard.map((s) => (
                <div key={s.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  <span className="text-sm font-bold text-muted-foreground w-5">#{s.rank}</span>
                  <span className="text-lg">{s.badge || "👤"}</span>
                  <span className="flex-1 text-sm font-medium text-card-foreground">{s.name}</span>
                  <span className="text-xs font-bold text-primary">{s.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentPortal;
