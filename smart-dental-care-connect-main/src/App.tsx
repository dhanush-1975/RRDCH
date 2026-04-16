import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartCareChat from "@/components/SmartCareChat";
import HomePage from "@/pages/HomePage";
import PatientPortal from "@/pages/patient/PatientPortal";
import BookAppointment from "@/pages/patient/BookAppointment";
import OPDQueue from "@/pages/patient/OPDQueue";
import SymptomChecker from "@/pages/patient/SymptomChecker";
import StudentPortal from "@/pages/student/StudentPortal";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import VirtualTour from "@/pages/VirtualTour";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/patient" element={<PatientPortal />} />
                  <Route path="/patient/book" element={<BookAppointment />} />
                  <Route path="/patient/opd" element={<OPDQueue />} />
                  <Route path="/patient/symptoms" element={<SymptomChecker />} />
                  <Route path="/student" element={<StudentPortal />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/virtual-tour" element={<VirtualTour />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <SmartCareChat />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
