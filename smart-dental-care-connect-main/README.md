# RRDCH SmartCare — Complete Project Documentation

## 📋 Project Overview

**RRDCH SmartCare** is India's first AI-powered bilingual (English/Kannada) dental hospital + academic platform, built for **Rajarajeshwari Dental College & Hospital, Bangalore**. It is designed for real-world Tier-2 city constraints: low bandwidth, multilingual users, and patients/students with zero prior digital experience.

**Live Preview:** Deployed via Lovable Platform

---

## 🏗️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript 5 | UI framework |
| **Styling** | Tailwind CSS v3 + shadcn/ui | Design system |
| **Routing** | React Router v6 | Client-side navigation |
| **Animations** | Framer Motion | Micro-interactions & transitions |
| **State** | React Context + useState | Global state (theme, language) |
| **Backend** | Lovable Cloud (Supabase) | Edge Functions, Auth, Database |
| **AI** | Lovable AI Gateway | Chatbot & Symptom Analysis |
| **AI Model** | `google/gemini-2.5-flash-lite` | Fast, cost-efficient for chat & analysis |
| **Charts** | Custom CSS bar charts | Admin analytics |
| **Maps** | Google Maps Embed API (free) | Hospital location |
| **Voice** | Web Speech API (browser-native) | Speech-to-text & text-to-speech |
| **Markdown** | react-markdown | Rendering AI responses |
| **Build** | Vite 5 | Dev server & production builds |

---

## 🔑 APIs Used (All Free / Included)

### 1. Lovable AI Gateway (Pre-configured, Free tier included)
- **URL:** `https://ai.gateway.lovable.dev/v1/chat/completions`
- **Auth:** `LOVABLE_API_KEY` (auto-provisioned, stored as Supabase secret)
- **Model:** `google/gemini-2.5-flash-lite` — chosen for speed and low cost
- **Used for:**
  - SmartCare Chatbot (streaming SSE responses)
  - Symptom Pre-Screener (structured tool-calling output)
- **Cost:** Free tier included per month, then usage-based. Top up at Settings → Workspace → Usage
- **Rate Limits:** Per-minute per workspace. 429 = too many requests, 402 = credits exhausted
- **No external API key needed** — auto-managed by Lovable Cloud

### 2. Google Maps Embed API (Free, no key needed)
- **URL:** Standard `maps.google.com/maps/embed` URL
- **Used for:** Hospital location on homepage
- **Cost:** Completely free for embed usage
- **No API key required**

### 3. Web Speech API (Browser-native, free)
- **SpeechRecognition:** Voice-to-text input for chatbot
- **SpeechSynthesis:** Text-to-speech for bot responses
- **Languages supported:** `en-IN` (English-India), `kn-IN` (Kannada)
- **Cost:** Free — built into modern browsers (Chrome, Edge, Safari)
- **Limitation:** Not available in all browsers; Firefox has limited support

### 4. Google Fonts API (Free)
- **Font:** Inter (weights 400, 500, 600, 700, 800)
- **URL:** `fonts.googleapis.com`
- **Cost:** Completely free

---

## 📊 Data Sources & Datasets

All data in this project is **simulated/mock data** designed to represent realistic hospital operations. No real patient data is used.

### Mock Data Details:

| Data | Location | Description |
|------|----------|-------------|
| **Departments** | `BookAppointment.tsx`, `HomePage.tsx` | 7 real RRDCH departments with bilingual names |
| **Doctors** | `BookAppointment.tsx` | 9 simulated doctor profiles with specializations |
| **Time Slots** | `BookAppointment.tsx` | 11 OPD slots (9AM-4PM), 3 pre-booked for realism |
| **OPD Queue** | `OPDQueue.tsx` | 7 department queues with token numbers, wait times |
| **Appointments** | `PatientPortal.tsx` | 4 sample appointments (2 upcoming, 2 past) |
| **Timetable** | `StudentPortal.tsx` | 5-day weekly academic schedule |
| **Events** | `StudentPortal.tsx` | 3 upcoming academic events with RSVP counts |
| **Leaderboard** | `StudentPortal.tsx` | 5 anonymous students with gamification points |
| **Badges** | `StudentPortal.tsx` | 4 achievement badges (2 earned, 2 locked) |
| **Admin Stats** | `AdminDashboard.tsx` | OPD hourly load (10 data points), dept distribution |
| **Complaints** | `AdminDashboard.tsx` | 3 hostel complaint tickets (submitted→assigned→resolved) |
| **Feedback** | `AdminDashboard.tsx` | 3 patient/student feedback with star ratings |
| **Live Updates** | `HomePage.tsx` | 4 simulated real-time hospital updates |
| **Translations** | `LanguageContext.tsx` | 30+ bilingual string pairs (EN/KN) |

### Hospital Information (Real, publicly available):
- **Name:** Rajarajeshwari Dental College & Hospital
- **Location:** Rajarajeshwari Nagar, Bangalore - 560098
- **Phone:** +91 80 2860 0000
- **Programs:** BDS (4+1 years), MDS (3 years) via NEET counseling
- **Departments:** 7 departments (Orthodontics, Oral Surgery, Pedodontics, Periodontics, Prosthodontics, Conservative Dentistry, Oral Medicine & Radiology)

---

## 🏛️ Architecture

### Frontend Architecture
```
src/
├── App.tsx                      # Root with routing, providers
├── components/
│   ├── Navbar.tsx               # Sticky nav with portal switcher
│   ├── Footer.tsx               # Contact info, quick links
│   └── SmartCareChat.tsx        # AI chatbot (streaming SSE)
├── contexts/
│   ├── LanguageContext.tsx       # EN/KN toggle + translations
│   └── ThemeContext.tsx          # Light/Dark mode
├── pages/
│   ├── HomePage.tsx             # Hero, stats, departments, live updates, map
│   ├── patient/
│   │   ├── PatientPortal.tsx    # Dashboard with upcoming/past appointments
│   │   ├── BookAppointment.tsx  # 4-step booking flow
│   │   ├── OPDQueue.tsx         # Live queue with 90s auto-refresh
│   │   └── SymptomChecker.tsx   # AI-powered symptom analysis
│   ├── student/
│   │   └── StudentPortal.tsx    # Timetable, events, gamification
│   └── admin/
│       └── AdminDashboard.tsx   # Analytics, appointments, complaints, feedback
└── integrations/supabase/       # Auto-generated Supabase client
```

### Backend Architecture (Edge Functions)
```
supabase/functions/
├── smart-chat/index.ts          # Streaming AI chatbot
│   ├── System prompt with full RRDCH context
│   ├── Bilingual support (auto Kannada when lang=kn)
│   ├── SSE streaming via Lovable AI Gateway
│   └── Last 10 messages conversation history
└── symptom-analyze/index.ts     # Structured symptom analysis
    ├── Tool-calling for structured JSON output
    ├── Returns: department, deptId, advice, urgency
    └── Graceful fallback on error
```

---

## ✨ Feature List

### Portal 1: Patient Experience
- ✅ **Smart Appointment System** — 4-step flow: Department → Doctor → Date/Slot → Confirm
- ✅ **Booking Token Card** — Printable confirmation with unique token number
- ✅ **AI Symptom Pre-Screener** — Real AI analysis via Lovable AI, recommends department, shows urgency
- ✅ **Live OPD Queue** — Real-time simulation (90s intervals), doctor status (Available/Busy/Offline)
- ✅ **Patient Dashboard** — Upcoming & past appointments view
- ✅ **Emergency Banner** — 24/7 emergency contact with pulsing alert
- ✅ **Google Maps** — Embedded hospital location

### Portal 2: Student Experience
- ✅ **Weekly Timetable** — 5-day schedule with time slots
- ✅ **Event Calendar** — Conferences, camps, lectures with RSVP
- ✅ **Gamification** — Points, 4 badges, Top 5 leaderboard
- ✅ **Notification Bell** — Unread count indicator

### Portal 3: Admin Dashboard
- ✅ **Analytics Overview** — OPD hourly load chart, department distribution bars
- ✅ **Appointment Management** — Status tracking (Confirmed/Cancelled/Completed)
- ✅ **Complaint Pipeline** — Submitted → Assigned → Resolved
- ✅ **Feedback Inbox** — Star ratings with comments
- ✅ **Announcement Publisher** — Post to live updates

### AI Features
- ✅ **SmartCare Chatbot** — Real AI (Gemini 2.5 Flash Lite), streaming, bilingual, voice I/O
- ✅ **Symptom Pre-Screener** — AI department recommendation with urgency level
- ✅ **Voice Input** — Web Speech API speech-to-text
- ✅ **Voice Output** — SpeechSynthesis API text-to-speech

### Innovation Features
- ✅ **Full Bilingual Support** — EN/KN toggle, 30+ translated strings, persisted in localStorage
- ✅ **Dark Mode** — System preference detection + manual toggle, persisted
- ✅ **Responsive Design** — Mobile-first, breakpoints at 375px / 768px / 1280px
- ✅ **Glassmorphism** — Hero section glass cards with backdrop-filter blur
- ✅ **Micro-animations** — Framer Motion transitions, staggered reveals
- ✅ **Markdown Rendering** — AI responses rendered with react-markdown

---

## 🎨 Design System

### Color Palette (HSL-based, themed)
| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--primary` | `197 87% 32%` (#0B6E99) | `197 80% 45%` | Medical Blue — buttons, links |
| `--secondary` | `174 58% 40%` (#14B8A6) | `174 58% 40%` | Teal — gradients |
| `--accent` | `142 71% 45%` (#22C55E) | Same | Success Green — confirmations |
| `--warning` | `38 92% 50%` (#F59E0B) | Same | Amber — wait times, alerts |
| `--destructive` | `0 84% 60%` (#EF4444) | `0 62% 30%` | Emergency Red |
| `--background` | `210 20% 98%` (#F9FAFB) | `220 20% 7%` | Page background |
| `--card` | `0 0% 100%` (#FFFFFF) | `220 20% 10%` | Card surfaces |

### Typography
- **Font:** Inter (Google Fonts)
- **Headlines:** 700-800 weight
- **Body:** 400 weight
- **Labels:** 500 weight

---

## 🔒 Security

- All AI API calls go through Edge Functions (server-side) — no API keys exposed to client
- `LOVABLE_API_KEY` is stored as a Supabase secret, never in client code
- Edge functions have `verify_jwt = false` for public access (chatbot/symptom checker)
- Rate limit handling: 429 and 402 errors surfaced to users with clear messages
- No real patient data stored — all mock data

---

## 📱 Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Core App | ✅ | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ✅ | ⚠️ Limited | ✅ |
| Voice Output | ✅ | ✅ | ✅ | ✅ |
| Dark Mode | ✅ | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ✅ |

---

## 🚀 Future Enhancements

1. **Lovable Cloud Database** — Persist appointments, student data, complaints
2. **Authentication** — Role-based access (Admin/Doctor/Student/Patient)
3. **360° Virtual Tour** — Pannellum.js panoramic campus tour
4. **PWA** — Service worker for offline access, Add to Home Screen
5. **Real-time OPD** — WebSocket/Supabase Realtime for live queue updates
6. **SMS Notifications** — Twilio integration for appointment reminders

---

## 📝 Deployment

- **Platform:** Lovable (auto-deployed)
- **Backend:** Lovable Cloud (Supabase-powered)
- **Edge Functions:** Auto-deployed with project
- **Domain:** Custom domain configurable via Lovable settings

---

*Built with ❤️ for RRDCH SmartCare | AI-Powered Bilingual Dental Healthcare Platform*
