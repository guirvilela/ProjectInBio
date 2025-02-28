import { auth } from "@/src/app/lib/auth";
import { db } from "@/src/app/lib/firebase";
import stripe from "@/src/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });

  const user = await db.collection("users").doc(userId).get();
  const customerId = user.data()?.customerId;

  if (!customerId)
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get("origin")}/`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
