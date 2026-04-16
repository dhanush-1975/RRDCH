import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar, Stethoscope, Users, BookOpen, Activity,
  ArrowRight, MapPin, Clock, Award, GraduationCap, Sparkles
} from "lucide-react";

const departments = [
  { key: "dept.orthodontics", icon: "🦷", color: "from-primary/10 to-secondary/10" },
  { key: "dept.oralSurgery", icon: "⚕️", color: "from-destructive/10 to-warning/10" },
  { key: "dept.pedodontics", icon: "👶", color: "from-accent/10 to-primary/10" },
  { key: "dept.periodontics", icon: "🔬", color: "from-secondary/10 to-accent/10" },
  { key: "dept.prosthodontics", icon: "🦿", color: "from-warning/10 to-primary/10" },
  { key: "dept.conservative", icon: "💎", color: "from-primary/10 to-accent/10" },
  { key: "dept.oralMedicine", icon: "📡", color: "from-secondary/10 to-destructive/10" },
];

const stats = [
  { value: "10,000+", label: "Patients Treated", icon: Users },
  { value: "7", label: "Departments", icon: Stethoscope },
  { value: "50+", label: "Expert Faculty", icon: GraduationCap },
  { value: "25+", label: "Years Legacy", icon: Award },
];

const quickActions = [
  { icon: Calendar, label: "Book Appointment", desc: "Schedule your visit", path: "/patient/book", gradient: true },
  { icon: Activity, label: "OPD Queue", desc: "Live wait times", path: "/patient/opd", gradient: false },
  { icon: Sparkles, label: "Symptom Checker", desc: "AI-powered analysis", path: "/patient/symptoms", gradient: false },
  { icon: BookOpen, label: "Academic Hub", desc: "Student resources", path: "/student", gradient: false },
];

const liveUpdates = [
  { time: "2 min ago", text: "OPD Queue updated — Token #47 now serving", type: "info" as const },
  { time: "15 min ago", text: "Dr. Sharma is now available in Orthodontics", type: "success" as const },
  { time: "1 hr ago", text: "New research paper published by Dr. Patel", type: "info" as const },
  { time: "3 hr ago", text: "Pedodontics camp scheduled for next Saturday", type: "event" as const },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNnKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/patient/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-card text-primary font-semibold hover:bg-card/90 transition-all shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                {t("hero.bookNow")}
              </Link>
              <Link
                to="/virtual-tour"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass-card text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all"
              >
                <MapPin className="w-4 h-4" />
                {t("hero.virtualTour")}
              </Link>
            </div>
          </motion.div>

          {/* Glass Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-card rounded-2xl p-6 max-w-3xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-6 h-6 mx-auto mb-2 text-primary-foreground/80" />
                  <div className="text-2xl font-bold text-primary-foreground">{s.value}</div>
                  <div className="text-xs text-primary-foreground/70">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {quickActions.map((action) => (
            <motion.div key={action.label} variants={item}>
              <Link
                to={action.path}
                className={`block p-4 rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${
                  action.gradient
                    ? "gradient-primary text-primary-foreground border-transparent"
                    : "bg-card text-card-foreground border-border"
                }`}
              >
                <action.icon className={`w-6 h-6 mb-2 ${action.gradient ? "" : "text-primary"}`} />
                <h3 className="font-semibold text-sm">{action.label}</h3>
                <p className={`text-xs mt-0.5 ${action.gradient ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {action.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Departments */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">{t("section.departments")}</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {departments.map((dept) => (
            <motion.div key={dept.key} variants={item}>
              <Link
                to={`/student/department/${dept.key.split(".")[1]}`}
                className="block p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center text-lg mb-3`}>
                  {dept.icon}
                </div>
                <h3 className="font-medium text-sm text-card-foreground">{t(dept.key)}</h3>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Live Updates */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">{t("section.liveUpdates")}</h2>
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {liveUpdates.map((update, i) => (
            <div key={i} className="flex items-start gap-3 p-4">
              <div className={`w-2 h-2 rounded-full mt-1.5 ${
                update.type === "success" ? "bg-accent" : update.type === "event" ? "bg-warning" : "bg-primary"
              }`} />
              <div className="flex-1">
                <p className="text-sm text-card-foreground">{update.text}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {update.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-xl overflow-hidden border border-border">
          <iframe
            title="RRDCH Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8086729810824!2d77.5063!3d12.9107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzM4LjUiTiA3N8KwMzAnMjIuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
