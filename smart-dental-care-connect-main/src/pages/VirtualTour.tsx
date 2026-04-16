import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const hotspots = [
  { id: "opd", name: { en: "Main OPD", kn: "ಮುಖ್ಯ OPD" }, desc: { en: "Outpatient department with 7 specialty clinics", kn: "7 ವಿಶೇಷ ಕ್ಲಿನಿಕ್‌ಗಳನ್ನು ಹೊಂದಿರುವ ಹೊರರೋಗಿ ವಿಭಾಗ" }, icon: "🏥", color: "from-primary to-secondary" },
  { id: "labs", name: { en: "Dental Labs", kn: "ಡೆಂಟಲ್ ಲ್ಯಾಬ್‌ಗಳು" }, desc: { en: "State-of-the-art dental laboratories for prosthetics and orthodontics", kn: "ಪ್ರಾಸ್ಥೆಟಿಕ್ಸ್ ಮತ್ತು ಆರ್ಥೊಡಾಂಟಿಕ್ಸ್‌ಗಾಗಿ ಅತ್ಯಾಧುನಿಕ ಡೆಂಟಲ್ ಲ್ಯಾಬ್‌ಗಳು" }, icon: "🔬", color: "from-secondary to-accent" },
  { id: "library", name: { en: "Library", kn: "ಗ್ರಂಥಾಲಯ" }, desc: { en: "Extensive dental research library with digital resources", kn: "ಡಿಜಿಟಲ್ ಸಂಪನ್ಮೂಲಗಳೊಂದಿಗೆ ವ್ಯಾಪಕ ಡೆಂಟಲ್ ಸಂಶೋಧನಾ ಗ್ರಂಥಾಲಯ" }, icon: "📚", color: "from-warning to-primary" },
  { id: "hostel", name: { en: "Hostel Block", kn: "ಹಾಸ್ಟೆಲ್ ಬ್ಲಾಕ್" }, desc: { en: "Comfortable residential facilities for students", kn: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಆರಾಮದಾಯಕ ವಸತಿ ಸೌಲಭ್ಯಗಳು" }, icon: "🏠", color: "from-accent to-secondary" },
  { id: "auditorium", name: { en: "Auditorium", kn: "ಸಭಾಂಗಣ" }, desc: { en: "500-seat auditorium for conferences and events", kn: "ಸಮ್ಮೇಳನಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳಿಗಾಗಿ 500 ಆಸನಗಳ ಸಭಾಂಗಣ" }, icon: "🎓", color: "from-primary to-warning" },
  { id: "radiology", name: { en: "Radiology Center", kn: "ರೇಡಿಯಾಲಜಿ ಕೇಂದ್ರ" }, desc: { en: "Advanced digital X-ray and imaging facility", kn: "ಮುಂದುವರಿದ ಡಿಜಿಟಲ್ ಎಕ್ಸ್-ರೇ ಮತ್ತು ಇಮೇಜಿಂಗ್ ಸೌಲಭ್ಯ" }, icon: "📡", color: "from-destructive/80 to-warning" },
];

const VirtualTour = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-hero py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to Home" : "ಮುಖಪುಟಕ್ಕೆ ಹಿಂದಿರುಗಿ"}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              {lang === "en" ? "360° Virtual Campus Tour" : "360° ವರ್ಚುವಲ್ ಕ್ಯಾಂಪಸ್ ಟೂರ್"}
            </h1>
          </div>
          <p className="text-primary-foreground/70 text-sm max-w-lg">
            {lang === "en"
              ? "Explore RRDCH campus from anywhere. Click on hotspots to learn about our facilities."
              : "ಎಲ್ಲಿಂದಲಾದರೂ RRDCH ಕ್ಯಾಂಪಸ್ ಅನ್ನು ಅನ್ವೇಷಿಸಿ. ನಮ್ಮ ಸೌಲಭ್ಯಗಳ ಬಗ್ಗೆ ತಿಳಿಯಲು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ."}
          </p>
        </div>
      </section>

      {/* Panorama Viewer */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
          {/* Interactive campus map visualization */}
          <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }} />

            {/* Campus illustration - positioned hotspots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl">
                {/* Main building outline */}
                <div className="absolute top-[15%] left-[10%] w-[35%] h-[40%] rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground font-medium">Main Building</span>
                </div>
                <div className="absolute top-[20%] right-[10%] w-[25%] h-[30%] rounded-xl border-2 border-dashed border-secondary/30 bg-secondary/5 flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground font-medium">Academic Block</span>
                </div>
                <div className="absolute bottom-[15%] left-[25%] w-[50%] h-[25%] rounded-xl border-2 border-dashed border-accent/30 bg-accent/5 flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground font-medium">Campus Grounds</span>
                </div>

                {/* Hotspot markers */}
                {[
                  { id: "opd", top: "25%", left: "20%" },
                  { id: "labs", top: "30%", left: "35%" },
                  { id: "library", top: "25%", left: "72%" },
                  { id: "hostel", top: "65%", left: "70%" },
                  { id: "auditorium", top: "65%", left: "35%" },
                  { id: "radiology", top: "40%", left: "55%" },
                ].map((pos) => {
                  const spot = hotspots.find((h) => h.id === pos.id)!;
                  return (
                    <motion.div
                      key={pos.id}
                      className="absolute z-10 group cursor-pointer"
                      style={{ top: pos.top, left: pos.left }}
                      whileHover={{ scale: 1.2 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: hotspots.indexOf(spot) * 0.1, type: "spring" }}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${spot.color} flex items-center justify-center text-lg shadow-lg ring-2 ring-card`}>
                        {spot.icon}
                      </div>
                      <div className="absolute w-3 h-3 rounded-full bg-primary/50 animate-ping -top-0.5 -right-0.5" />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-card border border-border rounded-lg shadow-xl p-3 min-w-[180px]">
                          <div className="font-semibold text-xs text-card-foreground">{spot.name[lang]}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">{spot.desc[lang]}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Compass */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center text-xs font-bold text-foreground shadow">
              N↑
            </div>
          </div>
        </div>
      </section>

      {/* Facility Cards */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          {lang === "en" ? "Campus Facilities" : "ಕ್ಯಾಂಪಸ್ ಸೌಲಭ್ಯಗಳು"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hotspots.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${spot.color} flex items-center justify-center text-lg`}>
                  {spot.icon}
                </div>
                <h3 className="font-semibold text-sm text-card-foreground">{spot.name[lang]}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{spot.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4 pb-10">
        <div className="rounded-xl overflow-hidden border border-border">
          <iframe
            title="RRDCH Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8086729810824!2d77.5063!3d12.9107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzM4LjUiTiA3N8KwMzAnMjIuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="220"
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

export default VirtualTour;
