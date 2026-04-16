import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Heart } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">RC</span>
              </div>
              <div>
                <span className="font-bold text-foreground">RRDCH SmartCare</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">{t("footer.contact")}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t("footer.address")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 80 2860 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@rrdch.edu.in</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <a href="/patient" className="block hover:text-primary transition-colors">Patient Portal</a>
              <a href="/student" className="block hover:text-primary transition-colors">Student Portal</a>
              <a href="/patient/book" className="block hover:text-primary transition-colors">Book Appointment</a>
              <a href="/patient/opd" className="block hover:text-primary transition-colors">OPD Queue</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          Made with <Heart className="w-3 h-3 inline text-destructive" /> for RRDCH © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
