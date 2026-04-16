import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a dental symptom pre-screening AI for RRDCH (Rajarajeshwari Dental College & Hospital).

Given a patient's symptoms, analyze them and recommend the most appropriate department.

DEPARTMENTS:
- orthodontics: Orthodontics (alignment, braces, jaw positioning)
- oralSurgery: Oral Surgery (extractions, impactions, trauma, implants)
- pedodontics: Pedodontics (children's dental issues)
- periodontics: Periodontics (gum disease, bleeding gums, loose teeth)
- prosthodontics: Prosthodontics (missing teeth, dentures, crowns, bridges)
- conservative: Conservative Dentistry (cavities, fillings, root canals, tooth pain)
- oralMedicine: Oral Medicine & Radiology (ulcers, lesions, diagnosis, X-rays)

You MUST respond using the suggest_department tool.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { symptom, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langInstruction = language === "kn"
      ? "Respond with advice in Kannada script."
      : "Respond with advice in English.";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + "\n" + langInstruction },
          { role: "user", content: `Patient symptoms: ${symptom}` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "suggest_department",
            description: "Recommend a department based on symptoms",
            parameters: {
              type: "object",
              properties: {
                department: { type: "string", description: "Department display name" },
                deptId: {
                  type: "string",
                  enum: ["orthodontics", "oralSurgery", "pedodontics", "periodontics", "prosthodontics", "conservative", "oralMedicine"]
                },
                advice: { type: "string", description: "Brief advice for the patient (2-3 sentences)" },
                urgency: { type: "string", enum: ["low", "medium", "high"], description: "How urgent" }
              },
              required: ["department", "deptId", "advice", "urgency"],
              additionalProperties: false,
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "suggest_department" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", status, t);
      throw new Error("AI service error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("symptom-analyze error:", e);
    return new Response(JSON.stringify({
      department: "Oral Medicine & Radiology",
      deptId: "oralMedicine",
      advice: "We recommend starting with our Oral Medicine department for a thorough examination.",
      urgency: "medium",
    }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
