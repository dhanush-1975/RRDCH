import React, { createContext, useContext, useState, useCallback } from "react";

type Language = "en" | "kn";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  "nav.home": { en: "Home", kn: "ಮುಖಪುಟ" },
  "nav.patient": { en: "Patient Portal", kn: "ರೋಗಿ ಪೋರ್ಟಲ್" },
  "nav.student": { en: "Student Portal", kn: "ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್" },
  "nav.admin": { en: "Admin", kn: "ನಿರ್ವಾಹಕ" },
  "nav.bookAppointment": { en: "Book Appointment", kn: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ" },
  "nav.emergency": { en: "Emergency", kn: "ತುರ್ತು" },
  // Hero
  "hero.title": { en: "Welcome to RRDCH SmartCare", kn: "RRDCH ಸ್ಮಾರ್ಟ್‌ಕೇರ್‌ಗೆ ಸ್ವಾಗತ" },
  "hero.subtitle": { en: "AI-Powered Dental Healthcare & Academic Excellence", kn: "AI-ಚಾಲಿತ ದಂತ ಆರೋಗ್ಯ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆ" },
  "hero.bookNow": { en: "Book Appointment", kn: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ" },
  "hero.virtualTour": { en: "Virtual Tour", kn: "ವರ್ಚುವಲ್ ಟೂರ್" },
  // Departments
  "dept.orthodontics": { en: "Orthodontics", kn: "ಆರ್ಥೊಡಾಂಟಿಕ್ಸ್" },
  "dept.oralSurgery": { en: "Oral Surgery", kn: "ಮೌಖಿಕ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ" },
  "dept.pedodontics": { en: "Pedodontics", kn: "ಪೀಡೋಡಾಂಟಿಕ್ಸ್" },
  "dept.periodontics": { en: "Periodontics", kn: "ಪೆರಿಯೊಡಾಂಟಿಕ್ಸ್" },
  "dept.prosthodontics": { en: "Prosthodontics", kn: "ಪ್ರಾಸ್ಥೊಡಾಂಟಿಕ್ಸ್" },
  "dept.conservative": { en: "Conservative Dentistry", kn: "ಕನ್ಸರ್ವೇಟಿವ್ ಡೆಂಟಿಸ್ಟ್ರಿ" },
  "dept.oralMedicine": { en: "Oral Medicine & Radiology", kn: "ಮೌಖಿಕ ಔಷಧ ಮತ್ತು ರೇಡಿಯಾಲಜಿ" },
  // Sections
  "section.departments": { en: "Our Departments", kn: "ನಮ್ಮ ವಿಭಾಗಗಳು" },
  "section.quickActions": { en: "Quick Actions", kn: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು" },
  "section.liveUpdates": { en: "Live Updates", kn: "ನೇರ ಅಪ್‌ಡೇಟ್‌ಗಳು" },
  "section.stats": { en: "Our Impact", kn: "ನಮ್ಮ ಪ್ರಭಾವ" },
  // OPD
  "opd.title": { en: "OPD Queue Status", kn: "OPD ಕ್ಯೂ ಸ್ಥಿತಿ" },
  "opd.currentToken": { en: "Current Token", kn: "ಪ್ರಸ್ತುತ ಟೋಕನ್" },
  "opd.waitTime": { en: "Est. Wait", kn: "ಅಂದಾಜು ಕಾಯುವಿಕೆ" },
  // Footer
  "footer.contact": { en: "Contact Us", kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ" },
  "footer.address": { en: "Rajarajeshwari Dental College, Bangalore", kn: "ರಾಜರಾಜೇಶ್ವರಿ ಡೆಂಟಲ್ ಕಾಲೇಜು, ಬೆಂಗಳೂರು" },
  // Appointments
  "appt.selectDept": { en: "Select Department", kn: "ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ" },
  "appt.selectDoctor": { en: "Select Doctor", kn: "ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ" },
  "appt.selectSlot": { en: "Select Time Slot", kn: "ಸಮಯ ಆಯ್ಕೆಮಾಡಿ" },
  "appt.confirm": { en: "Confirm Booking", kn: "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ" },
  "appt.booked": { en: "Appointment Booked!", kn: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಆಗಿದೆ!" },
  // Common
  "common.viewAll": { en: "View All", kn: "ಎಲ್ಲಾ ನೋಡಿ" },
  "common.back": { en: "Back", kn: "ಹಿಂದೆ" },
  "common.submit": { en: "Submit", kn: "ಸಲ್ಲಿಸಿ" },
  "common.cancel": { en: "Cancel", kn: "ರದ್ದುಮಾಡಿ" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("rrdch-lang");
    return (saved === "kn" ? "kn" : "en") as Language;
  });

  const toggleLanguage = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "kn" : "en";
      localStorage.setItem("rrdch-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
