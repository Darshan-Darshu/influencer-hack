import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { to } = await req.json(); // e.g., +91XXXXXXXXXX

  try {
    const call = await client.calls.create({
      // url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/voice`,
      url: `https://7794b5c2-7c87-4b83-a537-427a1bec6b3e-00-2eht6w6nzdcyj.picard.replit.dev/incoming-call`,
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    return NextResponse.json({ success: true, sid: call.sid });
  } catch (error: any) {
    console.error("Call Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
