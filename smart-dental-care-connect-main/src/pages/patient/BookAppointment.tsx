import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Check, ArrowLeft, ArrowRight, Printer } from "lucide-react";
import { toast } from "sonner";

const departments = [
  { id: "orthodontics", name: { en: "Orthodontics", kn: "ಆರ್ಥೊಡಾಂಟಿಕ್ಸ್" } },
  { id: "oralSurgery", name: { en: "Oral Surgery", kn: "ಮೌಖಿಕ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ" } },
  { id: "pedodontics", name: { en: "Pedodontics", kn: "ಪೀಡೋಡಾಂಟಿಕ್ಸ್" } },
  { id: "periodontics", name: { en: "Periodontics", kn: "ಪೆರಿಯೊಡಾಂಟಿಕ್ಸ್" } },
  { id: "prosthodontics", name: { en: "Prosthodontics", kn: "ಪ್ರಾಸ್ಥೊಡಾಂಟಿಕ್ಸ್" } },
  { id: "conservative", name: { en: "Conservative Dentistry", kn: "ಕನ್ಸರ್ವೇಟಿವ್ ಡೆಂಟಿಸ್ಟ್ರಿ" } },
  { id: "oralMedicine", name: { en: "Oral Medicine & Radiology", kn: "ಮೌಖಿಕ ಔಷಧ ಮತ್ತು ರೇಡಿಯಾಲಜಿ" } },
];

const doctors: Record<string, Array<{ id: string; name: string; specialization: string }>> = {
  orthodontics: [
    { id: "d1", name: "Dr. Ananya Sharma", specialization: "Braces & Aligners" },
    { id: "d2", name: "Dr. Rajesh Kumar", specialization: "Interceptive Orthodontics" },
  ],
  oralSurgery: [
    { id: "d3", name: "Dr. Priya Reddy", specialization: "Impaction Surgery" },
    { id: "d4", name: "Dr. Suresh Patil", specialization: "Implantology" },
  ],
  pedodontics: [
    { id: "d5", name: "Dr. Meena Gowda", specialization: "Pediatric Dentistry" },
  ],
  periodontics: [
    { id: "d6", name: "Dr. Vikram Singh", specialization: "Gum Surgery" },
  ],
  prosthodontics: [
    { id: "d7", name: "Dr. Lakshmi Rao", specialization: "Crown & Bridge" },
  ],
  conservative: [
    { id: "d8", name: "Dr. Arun Hegde", specialization: "Root Canal Treatment" },
  ],
  oralMedicine: [
    { id: "d9", name: "Dr. Kavitha Nair", specialization: "Oral Diagnosis" },
  ],
};

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
];

const BookAppointment = () => {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(0);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [booked, setBooked] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");

  const bookedSlots = new Set(["09:30 AM", "11:00 AM", "02:30 PM"]);

  const handleConfirm = () => {
    if (!patientName || !patientPhone) {
      toast.error("Please fill in all details");
      return;
    }
    const token = `RRDCH-${Math.floor(1000 + Math.random() * 9000)}`;
    setTokenNumber(token);
    setBooked(true);
    toast.success(t("appt.booked"));
  };

  const steps = [
    t("appt.selectDept"),
    t("appt.selectDoctor"),
    t("appt.selectSlot"),
    t("appt.confirm"),
  ];

  // Generate dates for next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  if (booked) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl border border-border p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t("appt.booked")}</h2>
          <div className="bg-muted rounded-xl p-4 my-4 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token</span>
              <span className="font-bold text-primary text-lg">{tokenNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Patient</span>
              <span className="text-foreground">{patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department</span>
              <span className="text-foreground">
                {departments.find(d => d.id === selectedDept)?.name[lang]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Doctor</span>
              <span className="text-foreground">
                {doctors[selectedDept]?.find(d => d.id === selectedDoctor)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="text-foreground">{selectedSlot}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">📱 Notification sent to {patientPhone}</p>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm"
          >
            <Printer className="w-4 h-4" />
            Print Token
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">{t("nav.bookAppointment")}</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              i <= step ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={`text-xs font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="dept" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => { setSelectedDept(dept.id); setStep(1); }}
                className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                  selectedDept === dept.id ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <span className="font-medium text-card-foreground">{dept.name[lang]}</span>
              </button>
            ))}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="doctor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-3">
            {doctors[selectedDept]?.map((doc) => (
              <button
                key={doc.id}
                onClick={() => { setSelectedDoctor(doc.id); setStep(2); }}
                className={`w-full p-4 rounded-xl border text-left transition-all hover:shadow-md flex items-center gap-3 ${
                  selectedDoctor === doc.id ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium text-card-foreground">{doc.name}</div>
                  <div className="text-xs text-muted-foreground">{doc.specialization}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="slot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((d) => {
                  const dateObj = new Date(d);
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`shrink-0 px-3 py-2 rounded-lg text-center text-xs border transition-all ${
                        selectedDate === d
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-card-foreground"
                      }`}
                    >
                      <div className="font-bold">{dateObj.getDate()}</div>
                      <div>{dateObj.toLocaleDateString("en", { weekday: "short" })}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedDate && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Available Slots</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.has(slot);
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => { setSelectedSlot(slot); setStep(3); }}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                          isBooked
                            ? "border-border bg-muted text-muted-foreground cursor-not-allowed line-through"
                            : selectedSlot === slot
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-card-foreground hover:border-primary"
                        }`}
                      >
                        <Clock className="w-3 h-3 inline mr-1" />
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4 space-y-3 text-sm">
              <h3 className="font-semibold text-foreground">Booking Summary</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department</span>
                <span className="text-foreground">{departments.find(d => d.id === selectedDept)?.name[lang]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor</span>
                <span className="text-foreground">{doctors[selectedDept]?.find(d => d.id === selectedDoctor)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-foreground">{selectedDate} • {selectedSlot}</span>
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
            <button
              onClick={handleConfirm}
              className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {t("appt.confirm")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      {step > 0 && !booked && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("common.back")}
        </button>
      )}
    </div>
  );
};

export default BookAppointment;
