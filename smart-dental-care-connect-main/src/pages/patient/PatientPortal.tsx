import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Activity, Sparkles, User, Clock, MapPin } from "lucide-react";

const upcomingAppointments = [
  { id: "1", date: "2026-04-15", time: "10:00 AM", department: "Orthodontics", doctor: "Dr. Ananya Sharma", token: "RRDCH-4821", status: "confirmed" },
  { id: "2", date: "2026-04-22", time: "02:30 PM", department: "Periodontics", doctor: "Dr. Vikram Singh", token: "RRDCH-4902", status: "confirmed" },
];

const pastAppointments = [
  { id: "3", date: "2026-04-01", department: "Conservative Dentistry", doctor: "Dr. Arun Hegde", status: "completed" },
  { id: "4", date: "2026-03-15", department: "Oral Medicine", doctor: "Dr. Kavitha Nair", status: "completed" },
];

const PatientPortal = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">{t("nav.patient")}</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Calendar, label: "Book Appointment", path: "/patient/book", gradient: true },
          { icon: Activity, label: "OPD Queue", path: "/patient/opd" },
          { icon: Sparkles, label: "Symptom Checker", path: "/patient/symptoms" },
          { icon: MapPin, label: "Directions", path: "/#map" },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.path}
            className={`p-3 rounded-xl border text-center transition-all hover:shadow-md ${
              a.gradient ? "gradient-primary text-primary-foreground border-transparent" : "bg-card text-card-foreground border-border"
            }`}
          >
            <a.icon className={`w-5 h-5 mx-auto mb-1 ${a.gradient ? "" : "text-primary"}`} />
            <span className="text-xs font-medium">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Upcoming */}
      <h2 className="text-lg font-semibold text-foreground mb-3">Upcoming Appointments</h2>
      <div className="space-y-3 mb-8">
        {upcomingAppointments.map((appt) => (
          <div key={appt.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-card-foreground">{appt.department}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <User className="w-3 h-3" />{appt.doctor}
                  <Clock className="w-3 h-3 ml-1" />{appt.date} • {appt.time}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-primary">{appt.token}</span>
              <div className="text-[10px] text-accent font-medium mt-0.5">Confirmed</div>
            </div>
          </div>
        ))}
      </div>

      {/* Past */}
      <h2 className="text-lg font-semibold text-foreground mb-3">Past Appointments</h2>
      <div className="space-y-2">
        {pastAppointments.map((appt) => (
          <div key={appt.id} className="bg-card rounded-xl border border-border p-3 flex items-center justify-between opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm text-card-foreground">{appt.department}</div>
                <div className="text-xs text-muted-foreground">{appt.date} • {appt.doctor}</div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPortal;
