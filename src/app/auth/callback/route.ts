import { createClient } from "@/utils/supabase/client"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient()

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Redirect to the home page
    return NextResponse.redirect(new URL("/", requestUrl.origin))
  }

  // If there's no code, redirect to the login page
  return NextResponse.redirect(new URL("/login", requestUrl.origin))
}

