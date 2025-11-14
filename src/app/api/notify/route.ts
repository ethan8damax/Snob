import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  const { name, email, phone, favoriteCoffeeShop } = await request.json();

  // Validate required fields:
  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("early_access").insert({
    name,
    email,
    phone,
    favorite_coffee_shop: favoriteCoffeeShop,
  });

  if (error) {
    if (error.code === '23505' && error.message.includes('early_access_email_key')) {
      return NextResponse.json(
        { error: "Looks like you're already on the list — overachiever." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}