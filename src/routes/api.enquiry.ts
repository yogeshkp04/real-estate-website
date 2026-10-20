import { json } from "@tanstack/react-start";

interface EnquiryData {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  requirement?: unknown;
  message?: unknown;
}

type RuntimeEnv = {
  process?: { env?: Record<string, string | undefined> };
};

const MAX_BODY_BYTES = 10 * 1024;
const MAX_FIELD_LENGTH = 2000;

function cleanText(value: unknown, maxLength = 500): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength) return null;
  return cleaned;
}

export const POST = async (request: Request) => {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return json({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > MAX_BODY_BYTES) {
      return json({ error: "Request body is too large" }, { status: 413 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Request body is too large" }, { status: 413 });
    }

    const data = JSON.parse(rawBody) as EnquiryData;
    const name = cleanText(data.name, 100);
    const phone = cleanText(data.phone, 30);
    const email = cleanText(data.email, 254)?.toLowerCase() ?? null;
    const requirement = cleanText(data.requirement, 1000);
    const message = data.message === undefined || data.message === null || data.message === ""
      ? null
      : cleanText(data.message, MAX_FIELD_LENGTH);

    if (!name || !phone || !email || !requirement || (data.message && !message)) {
      return json(
        { error: "Please provide a valid name, phone, email and requirement." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    // Reject browser cross-origin submissions unless the origin is explicitly allowed.
    const origin = request.headers.get("origin");
    if (origin) {
      const runtimeEnv = (globalThis as typeof globalThis & RuntimeEnv).process?.env ?? {};
      const allowedOrigins = (runtimeEnv.APP_ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      allowedOrigins.push(new URL(request.url).origin);
      if (!allowedOrigins.includes(origin)) {
        return json({ error: "Request origin is not allowed." }, { status: 403 });
      }
    }

    const runtimeEnv = (globalThis as typeof globalThis & RuntimeEnv).process?.env ?? {};
    const supabaseUrl = runtimeEnv.SUPABASE_URL?.replace(/\/$/, "");
    // Use the public anon key with a narrowly scoped INSERT policy; never use a service-role key here.
    const supabaseAnonKey = runtimeEnv.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Enquiry storage is not configured: missing server-side Supabase environment variables.");
      return json({ error: "Enquiry service is temporarily unavailable. Please call or WhatsApp us." }, { status: 503 });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        requirement,
        message,
        source: "website",
      }),
    });

    if (!response.ok) {
      const responseDetails = await response.text();
      console.error("Supabase rejected an enquiry insert:", response.status, responseDetails);
      return json({ error: "We couldn't save your enquiry. Please call or WhatsApp us." }, { status: 502 });
    }

    return json(
      { success: true, message: "Enquiry received successfully." },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json({ error: "Request body must be valid JSON." }, { status: 400 });
    }
    console.error("Error processing enquiry:", error);
    return json({ error: "Failed to process enquiry." }, { status: 500 });
  }
};
