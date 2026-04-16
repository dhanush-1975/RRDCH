import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Activity, Clock, User, AlertTriangle } from "lucide-react";

interface QueueItem {
  department: string;
  currentToken: number;
  totalInQueue: number;
  estimatedWait: number;
  doctor: string;
  status: "available" | "busy" | "offline";
}

const initialQueue: QueueItem[] = [
  { department: "Orthodontics", currentToken: 47, totalInQueue: 12, estimatedWait: 25, doctor: "Dr. Ananya Sharma", status: "available" },
  { department: "Oral Surgery", currentToken: 23, totalInQueue: 8, estimatedWait: 40, doctor: "Dr. Priya Reddy", status: "busy" },
  { department: "Pedodontics", currentToken: 15, totalInQueue: 5, estimatedWait: 15, doctor: "Dr. Meena Gowda", status: "available" },
  { department: "Periodontics", currentToken: 31, totalInQueue: 10, estimatedWait: 35, doctor: "Dr. Vikram Singh", status: "available" },
  { department: "Prosthodontics", currentToken: 19, totalInQueue: 6, estimatedWait: 20, doctor: "Dr. Lakshmi Rao", status: "offline" },
  { department: "Conservative Dentistry", currentToken: 42, totalInQueue: 14, estimatedWait: 50, doctor: "Dr. Arun Hegde", status: "busy" },
  { department: "Oral Medicine", currentToken: 11, totalInQueue: 3, estimatedWait: 10, doctor: "Dr. Kavitha Nair", status: "available" },
];

const statusColors = {
  available: "bg-accent",
  busy: "bg-warning",
  offline: "bg-muted-foreground",
};

const statusLabels = {
  available: "Available",
  busy: "Busy",
  offline: "Offline",
};

const OPDQueue = () => {
  const { t } = useLanguage();
  const [queue, setQueue] = useState(initialQueue);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates every 90 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue((prev) =>
        prev.map((item) => ({
          ...item,
          currentToken: item.status !== "offline" ? item.currentToken + 1 : item.currentToken,
          totalInQueue: Math.max(0, item.totalInQueue + (Math.random() > 0.5 ? 1 : -1)),
          estimatedWait: Math.max(5, item.estimatedWait + (Math.random() > 0.5 ? 5 : -5)),
        }))
      );
      setLastUpdated(new Date());
    }, 90000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("opd.title")}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-accent">
          <Activity className="w-3 h-3 animate-pulse" />
          Live
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-6 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
        <p className="text-xs text-destructive font-medium">
          Emergency cases are prioritized. Dial +91 80 2860 0000 for immediate assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {queue.map((item, i) => (
          <motion.div
            key={item.department}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-card-foreground">{item.department}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.doctor}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${statusColors[item.status]}`} />
                <span className="text-xs text-muted-foreground">{statusLabels[item.status]}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-muted rounded-lg p-2">
                <div className="text-lg font-bold text-primary">#{item.currentToken}</div>
                <div className="text-[10px] text-muted-foreground">{t("opd.currentToken")}</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">{item.totalInQueue}</div>
                <div className="text-[10px] text-muted-foreground">In Queue</div>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <div className="text-lg font-bold text-warning">{item.estimatedWait}m</div>
                <div className="text-[10px] text-muted-foreground">{t("opd.waitTime")}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OPDQueue;
