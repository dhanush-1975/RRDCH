import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are SmartCare Assistant, the official AI chatbot for Rajarajeshwari Dental College & Hospital (RRDCH), Bangalore, India.

PERSONALITY: Warm, helpful, concise. You naturally refer to "our hospital". Escalate complex medical queries to the front desk.

HOSPITAL CONTEXT:
- Location: Rajarajeshwari Nagar, Bangalore - 560098
- Phone: +91 80 2860 0000
- Email: info@rrdch.edu.in
- OPD Timings: Mon-Sat, 9 AM - 5 PM
- Emergency: 24/7 open, call +91 80 2860 0000
- Consultation Fee: ₹100

DEPARTMENTS (7):
1. Orthodontics - Braces, aligners, interceptive orthodontics
2. Oral Surgery - Impactions, implants, trauma
3. Pedodontics - Children's dentistry
4. Periodontics - Gum disease, gum surgery
5. Prosthodontics - Crowns, bridges, dentures
6. Conservative Dentistry & Endodontics - Fillings, root canals
7. Oral Medicine & Radiology - Diagnosis, X-rays, oral lesions

ACADEMIC PROGRAMS:
- BDS: 4 years + 1 year compulsory internship
- MDS: 3 years (available in all 7 departments)
- Admissions: Through NEET counseling (NEET-MDS for postgrad)
- Contact admissions: admissions@rrdch.edu.in

DIRECTIONS:
- Nearest bus stop: RR Nagar Bus Stand
- Available on Google Maps
- From Bangalore City Railway Station: ~18 km (45 min by road)

Keep responses concise (under 150 words). Use emojis sparingly for friendliness.
If asked in Kannada or the language is set to Kannada, respond entirely in Kannada script.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemContent = language === "kn"
      ? SYSTEM_PROMPT + "\n\nIMPORTANT: The user has selected Kannada. Respond ENTIRELY in Kannada script (ಕನ್ನಡ)."
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: systemContent },
          ...(messages || []).slice(-10),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("smart-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
