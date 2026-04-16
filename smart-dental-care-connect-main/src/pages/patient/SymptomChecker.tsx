import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const commonSymptoms = [
  { en: "Toothache", kn: "ಹಲ್ಲು ನೋವು" },
  { en: "Bleeding gums", kn: "ಒಸಡಿನ ರಕ್ತಸ್ರಾವ" },
  { en: "Jaw pain", kn: "ದವಡೆ ನೋವು" },
  { en: "Broken tooth", kn: "ಮುರಿದ ಹಲ್ಲು" },
  { en: "Bad breath", kn: "ಬಾಯಿ ದುರ್ವಾಸನೆ" },
  { en: "Swollen face", kn: "ಊದಿದ ಮುಖ" },
];

interface AnalysisResult {
  department: string;
  deptId: string;
  advice: string;
  urgency: "low" | "medium" | "high";
}

const urgencyColors = {
  low: "bg-accent/10 text-accent",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
};

const SymptomChecker = () => {
  const { lang } = useLanguage();
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (text?: string) => {
    const input = text || symptom;
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("symptom-analyze", {
        body: { symptom: input, language: lang },
      });

      if (error) throw error;
      setResult(data as AnalysisResult);
    } catch (e: any) {
      console.error("Symptom analysis error:", e);
      toast.error("Analysis failed. Please try again.");
      // Fallback
      setResult({
        department: "Oral Medicine & Radiology",
        deptId: "oralMedicine",
        advice: "We recommend visiting our Oral Medicine department for a thorough examination.",
        urgency: "medium",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-7 h-7 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {lang === "en" ? "AI Symptom Pre-Screener" : "AI ಲಕ್ಷಣ ಪ್ರಿ-ಸ್ಕ್ರೀನರ್"}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {lang === "en"
            ? "Describe your symptoms and our AI will recommend the right department"
            : "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ, ನಮ್ಮ AI ಸರಿಯಾದ ವಿಭಾಗವನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ"}
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder={lang === "en" ? "Describe your symptoms..." : "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ..."}
          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm min-h-[100px] focus:ring-2 focus:ring-ring outline-none resize-none"
        />

        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((s) => (
            <button
              key={s.en}
              onClick={() => { setSymptom(s[lang]); handleAnalyze(s[lang]); }}
              disabled={loading}
              className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
            >
              {s[lang]}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleAnalyze()}
          disabled={!symptom.trim() || loading}
          className="w-full py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {lang === "en" ? "AI Analyzing..." : "AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ..."}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {lang === "en" ? "Analyze Symptoms" : "ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ"}
            </>
          )}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-card rounded-xl border border-border p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">
              {lang === "en" ? "Recommended Department" : "ಶಿಫಾರಸು ಮಾಡಿದ ವಿಭಾಗ"}
            </h3>
            {result.urgency && (
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${urgencyColors[result.urgency]}`}>
                {result.urgency === "high" && <AlertTriangle className="w-3 h-3 inline mr-0.5" />}
                {result.urgency}
              </span>
            )}
          </div>
          <div className="bg-primary/10 rounded-lg p-3 mb-3">
            <span className="font-bold text-primary text-lg">{result.department}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{result.advice}</p>
          <Link
            to={`/patient/book?dept=${result.deptId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90"
          >
            {lang === "en" ? "Book Appointment" : "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      <p className="text-[10px] text-muted-foreground text-center mt-6">
        ⚠️ {lang === "en"
          ? "This is an AI-assisted pre-screening tool, not a medical diagnosis. Please consult a dentist for proper evaluation."
          : "ಇದು AI-ಸಹಾಯಿತ ಪ್ರಿ-ಸ್ಕ್ರೀನಿಂಗ್ ಸಾಧನ, ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ."}
      </p>
    </div>
  );
};

export default SymptomChecker;
